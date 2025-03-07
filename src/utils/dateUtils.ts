// src/utils/dateUtils.ts

export const calculateYearsAndMonths = (
    startDate: string,
    endDate: string | null = null
): { years: number; months: number } => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(); // Use current date if endDate is null

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error(
            "Invalid date format. Please use a valid date string (YYYY-MM-DD)."
        );
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return { years, months };
};
