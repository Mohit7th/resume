function getBooleanEnv(value: string | undefined, defaultValue: boolean) {
    if (value === undefined) {
        return defaultValue;
    }

    return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

function getStringEnv(value: string | undefined, defaultValue: string) {
    return value && value.trim().length > 0 ? value.trim() : defaultValue;
}

export const siteConfig = {
    siteUrl: getStringEnv(import.meta.env.VITE_SITE_URL, ""),
    resumePdfPath: getStringEnv(
        import.meta.env.VITE_RESUME_PDF_PATH,
        "/assets/Mohit_Uniyal.pdf"
    ),
    enableAdmin: getBooleanEnv(import.meta.env.VITE_ENABLE_ADMIN, false),
    // NOTE: This is a static site with no backend, so this "password" only
    // hides the editor UI — it is not real security. Set it via
    // VITE_ADMIN_PASSWORD; the default below is for local development only.
    adminPassword: getStringEnv(import.meta.env.VITE_ADMIN_PASSWORD, "admin"),
};
