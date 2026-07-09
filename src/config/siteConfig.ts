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
};
