export function convertToDateObject(date) {
    return new Date(date);
}

export function convertToCapitalCase(string) {
    return string ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() : "";
}