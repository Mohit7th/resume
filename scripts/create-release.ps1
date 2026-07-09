<#
.SYNOPSIS
    Prepare a release for the Mohit7th/resume GitHub Pages site.

.DESCRIPTION
    This script is tailored for this React/Vite resume repo.

    It performs release checks for the static site:
      1. Verifies this folder is a git repository.
      2. Verifies the working tree is clean unless -AllowDirty is passed.
      3. Fetches the remote branch for comparison.
      4. Runs dependency install unless -SkipInstall is passed.
      5. Runs typecheck, tests, production build, and production audit.
      6. Verifies the Vite build output expected by GitHub Pages.
      7. Creates an annotated local release tag unless -NoTag is passed.
      8. Prints the exact push commands, or pushes them when -Push is passed.

    The GitHub Pages deployment is handled by .github/workflows/deploy.yml.
    Pushing the configured branch triggers the workflow.

.PARAMETER Root
    Repository root. Defaults to the parent folder of this script.

.PARAMETER Branch
    Branch that deploys through GitHub Actions. Defaults to main.

.PARAMETER Remote
    Git remote name. Defaults to origin.

.PARAMETER TagName
    Release tag name. Defaults to resume-yyyyMMdd-HHmm.

.PARAMETER AllowDirty
    Continue even when the working tree has uncommitted changes.
    Use this only for local testing; release tags should normally be created
    from a clean commit.

.PARAMETER SkipInstall
    Skip npm ci.

.PARAMETER SkipFetch
    Skip git fetch and remote ahead/behind checks. Useful for offline/local
    validation only.

.PARAMETER SkipAudit
    Skip npm audit --omit=dev.

.PARAMETER SkipTests
    Skip npm test.

.PARAMETER SkipBuild
    Skip npm run build and build output validation.

.PARAMETER NoTag
    Do not create a local release tag.

.PARAMETER Push
    Push the branch and tag to the configured remote. Without this switch,
    the script only prints the push commands.

.EXAMPLE
    .\scripts\create-release.ps1
    Validate the project and create a local release tag. Nothing is pushed.

.EXAMPLE
    .\scripts\create-release.ps1 -Push
    Validate, tag, and push the branch/tag to origin.

.EXAMPLE
    .\scripts\create-release.ps1 -SkipInstall -SkipAudit
    Faster local validation when dependencies are already installed and audit
    is not needed.
#>

[CmdletBinding()]
param(
    [string]$Root = '',
    [string]$Branch = 'main',
    [string]$Remote = 'origin',
    [string]$TagName = '',
    [switch]$AllowDirty,
    [switch]$SkipFetch,
    [switch]$SkipInstall,
    [switch]$SkipAudit,
    [switch]$SkipTests,
    [switch]$SkipBuild,
    [switch]$NoTag,
    [switch]$Push
)

$ErrorActionPreference = 'Stop'

if (-not $Root) {
    $scriptPath = $PSCommandPath
    if (-not $scriptPath) {
        $scriptPath = $MyInvocation.MyCommand.Path
    }
    $Root = (Resolve-Path (Join-Path (Split-Path -Parent $scriptPath) '..')).Path
}
else {
    $Root = (Resolve-Path $Root).Path
}

$script:RootPath = $Root
$script:GitSafeDirectory = $Root.Replace('\', '/')
$script:GitExe = (Get-Command git.exe -CommandType Application -ErrorAction Stop).Source

function Invoke-RepoGit {
    & $script:GitExe -c "safe.directory=$script:GitSafeDirectory" @args
}

function Write-Step {
    param([string]$Message)
    Write-Host ""
    Write-Host "==> $Message" -ForegroundColor Cyan
}

function Write-Ok {
    param([string]$Message)
    Write-Host "OK  $Message" -ForegroundColor Green
}

function Write-Warn {
    param([string]$Message)
    Write-Host "WARN  $Message" -ForegroundColor Yellow
}

function Invoke-CheckedCommand {
    param(
        [string]$Label,
        [string]$Command,
        [string[]]$Arguments
    )

    Write-Step $Label
    & $Command @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "$Label failed with exit code $LASTEXITCODE"
    }
}

function Get-GitOutput {
    param([string[]]$Arguments)

    $output = Invoke-RepoGit @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "git $($Arguments -join ' ') failed with exit code $LASTEXITCODE"
    }

    return $output
}

function Assert-PathExists {
    param(
        [string]$Path,
        [string]$Description
    )

    if (-not (Test-Path $Path)) {
        throw "$Description not found at: $Path"
    }
}

if (-not $TagName) {
    $TagName = "resume-$(Get-Date -Format 'yyyyMMdd-HHmm')"
}

Write-Host "Release preparation for Mohit7th/resume" -ForegroundColor Cyan
Write-Host "Root:   $Root"
Write-Host "Branch: $Branch"
Write-Host "Remote: $Remote"
Write-Host "Tag:    $(if ($NoTag) { '(disabled)' } else { $TagName })"

Assert-PathExists $Root 'Repository root'

Push-Location $Root
try {
    Assert-PathExists (Join-Path $Root '.git') 'Git repository'

    Write-Step 'Checking repository state'
    $currentBranch = (Get-GitOutput @('branch', '--show-current')).Trim()
    if (-not $currentBranch) {
        throw 'Could not determine current git branch'
    }

    if ($currentBranch -ne $Branch) {
        throw "Current branch is '$currentBranch'. Checkout '$Branch' before releasing."
    }

    $remoteUrl = (Get-GitOutput @('remote', 'get-url', $Remote)).Trim()
    Write-Host "Remote URL: $remoteUrl"
    if ($remoteUrl -notmatch 'Mohit7th[\/\\]resume(\.git)?$') {
        Write-Warn "Remote URL does not look like Mohit7th/resume. Make sure pushes land in the repo that owns GitHub Pages."
    }

    $dirty = Get-GitOutput @('status', '--porcelain')
    if ($dirty -and -not $AllowDirty) {
        Write-Host $dirty
        throw 'Working tree is dirty. Commit/stash changes or rerun with -AllowDirty for local validation only.'
    }
    elseif ($dirty) {
        Write-Warn 'Working tree is dirty; continuing because -AllowDirty was provided.'
    }
    else {
        Write-Ok 'Working tree is clean.'
    }

    if (-not $SkipFetch) {
        Write-Step "Fetching $Remote"
        Invoke-RepoGit fetch --prune $Remote
        if ($LASTEXITCODE -ne 0) {
            throw "git fetch --prune $Remote failed"
        }

        $remoteBranchRef = "$Remote/$Branch"
        Invoke-RepoGit show-ref --verify --quiet "refs/remotes/$remoteBranchRef"
        $hasRemoteBranch = ($LASTEXITCODE -eq 0)
        if ($hasRemoteBranch) {
            $behind = (Get-GitOutput @('rev-list', '--count', "HEAD..$remoteBranchRef")).Trim()
            $ahead = (Get-GitOutput @('rev-list', '--count', "$remoteBranchRef..HEAD")).Trim()

            if ($behind -ne '0') {
                throw "Local '$Branch' is behind '$remoteBranchRef' by $behind commit(s). Pull/rebase before releasing."
            }
            if ($ahead -ne '0') {
                Write-Warn "Local '$Branch' is ahead of '$remoteBranchRef' by $ahead commit(s). Push will publish them."
            }
        }
        else {
            Write-Warn "Remote branch '$remoteBranchRef' was not found. First push may create it."
        }
    }
    else {
        Write-Warn 'Skipping git fetch and remote ahead/behind checks.'
    }

    if (-not $SkipInstall) {
        Invoke-CheckedCommand 'Installing dependencies with npm ci' 'npm' @('ci')
    }
    else {
        Write-Warn 'Skipping npm ci.'
    }

    Invoke-CheckedCommand 'Running typecheck' 'npm' @('run', 'typecheck')

    if (-not $SkipTests) {
        Invoke-CheckedCommand 'Running tests' 'npm' @('test')
    }
    else {
        Write-Warn 'Skipping tests.'
    }

    if (-not $SkipBuild) {
        Invoke-CheckedCommand 'Building production site' 'npm' @('run', 'build')

        Write-Step 'Validating GitHub Pages build output'
        $buildDir = Join-Path $Root 'build'
        $indexHtml = Join-Path $buildDir 'index.html'
        $resumePdf = Join-Path $buildDir 'assets/Mohit_Uniyal.pdf'

        Assert-PathExists $indexHtml 'Build index.html'
        Assert-PathExists $resumePdf 'Resume PDF in build output'

        $indexContent = Get-Content -Raw $indexHtml
        if ($indexContent -notmatch '\./assets/') {
            throw 'Build output does not reference relative ./assets paths.'
        }
        if ($indexContent -match 'href="/assets|src="/assets') {
            throw 'Build output contains root-relative /assets paths, which can break on GitHub Pages project URLs.'
        }

        Write-Ok 'Build output uses GitHub Pages-compatible relative paths.'
    }
    else {
        Write-Warn 'Skipping production build.'
    }

    if (-not $SkipAudit) {
        Invoke-CheckedCommand 'Auditing production dependencies' 'npm' @('audit', '--omit=dev')
    }
    else {
        Write-Warn 'Skipping npm audit.'
    }

    $createdTag = $false
    if (-not $NoTag) {
        Write-Step "Preparing release tag '$TagName'"
        Invoke-RepoGit rev-parse --verify --quiet "refs/tags/$TagName" | Out-Null
        if ($LASTEXITCODE -eq 0) {
            throw "Tag '$TagName' already exists."
        }

        if ($dirty) {
            Write-Warn 'Not creating a tag because the working tree is dirty.'
        }
        else {
            Invoke-RepoGit tag -a $TagName -m "Release $TagName"
            if ($LASTEXITCODE -ne 0) {
                throw "Failed to create tag '$TagName'"
            }
            $createdTag = $true
            Write-Ok "Created local tag '$TagName'."
        }
    }

    Write-Host ""
    Write-Host "=================================================================" -ForegroundColor Cyan
    Write-Host " RELEASE READY" -ForegroundColor Cyan
    Write-Host "=================================================================" -ForegroundColor Cyan
    Write-Host "GitHub Pages target: https://mohit7th.github.io/resume"
    Write-Host "Workflow: .github/workflows/deploy.yml"

    if ($Push) {
        Write-Step "Pushing '$Branch' to '$Remote'"
        Invoke-RepoGit push $Remote $Branch
        if ($LASTEXITCODE -ne 0) {
            throw "Failed to push '$Branch' to '$Remote'"
        }

        if ($createdTag) {
            Write-Step "Pushing tag '$TagName' to '$Remote'"
            Invoke-RepoGit push $Remote $TagName
            if ($LASTEXITCODE -ne 0) {
                throw "Failed to push tag '$TagName' to '$Remote'"
            }
        }

        Write-Ok 'Push complete. Check GitHub Actions for the Pages deployment.'
    }
    else {
        Write-Host ""
        Write-Host "Nothing was pushed. After review, run:" -ForegroundColor Yellow
        Write-Host "git push $Remote $Branch"
        if ($createdTag) {
            Write-Host "git push $Remote $TagName"
        }
    }
}
finally {
    Pop-Location
}
