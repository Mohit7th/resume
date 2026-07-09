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

    if (publicUrl && publicUrl !== "/") {
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
