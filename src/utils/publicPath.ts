export function getPublicAssetPath(assetPath: string) {
    if (/^(https?:)?\/\//.test(assetPath) || assetPath.startsWith("data:")) {
        return assetPath;
    }

    const publicUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
    const normalizedAssetPath = assetPath.startsWith("/")
        ? assetPath
        : `/${assetPath}`;

    return `${publicUrl}${normalizedAssetPath}`;
}

export function getRouterBasename() {
    const publicUrl = import.meta.env.BASE_URL;

    // Only trust an absolute base path (e.g. "/resume/"). A relative base such
    // as "./" carries no subpath, so fall through to hostname detection below.
    if (publicUrl && publicUrl !== "/" && !publicUrl.startsWith(".")) {
        const pathname = new URL(publicUrl, window.location.origin).pathname.replace(
            /\/$/,
            ""
        );

        return pathname || "/";
    }

    if (
        typeof window !== "undefined" &&
        window.location.hostname.endsWith("github.io")
    ) {
        const [repositoryName] = window.location.pathname
            .split("/")
            .filter(Boolean);

        return repositoryName ? `/${repositoryName}` : "/";
    }

    return "/";
}
