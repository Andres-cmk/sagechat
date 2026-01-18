export const formatDateHour = (d: Date) => {
    const now = new Date();

    const optionsFormat = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        locale: 'en-US',
    }

    const hourFormat = new Intl.DateTimeFormat('en-US', optionsFormat as Intl.DateTimeFormatOptions).format(now);
    return hourFormat;
}
