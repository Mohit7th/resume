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
    siteUrl: getStringEnv(process.env.REACT_APP_SITE_URL, ""),
    resumePdfPath: getStringEnv(
        process.env.REACT_APP_RESUME_PDF_PATH,
        "/assets/Mohit_Uniyal.pdf"
    ),
    enableAdmin: getBooleanEnv(process.env.REACT_APP_ENABLE_ADMIN, false),
};
