export function getPublicAssetPath(assetPath: string) {
    if (/^(https?:)?\/\//.test(assetPath) || assetPath.startsWith("data:")) {
        return assetPath;
    }

    const publicUrl = process.env.PUBLIC_URL || "";
    const normalizedAssetPath = assetPath.startsWith("/")
        ? assetPath
        : `/${assetPath}`;

    return `${publicUrl}${normalizedAssetPath}`;
}

export function getRouterBasename() {
    const publicUrl = process.env.PUBLIC_URL;

    if (publicUrl && publicUrl !== ".") {
        try {
            const pathname = new URL(
                publicUrl,
                window.location.origin
            ).pathname.replace(/\/$/, "");

            return pathname || "/";
        } catch {
            return "/";
        }
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
