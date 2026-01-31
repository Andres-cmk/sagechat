export const formatDateHour = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    
    // Normalizar fechas a medianoche para comparación precisa
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDateStart = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
    
    // Calcular diferencia en días
    const diffInMs = todayStart.getTime() - messageDateStart.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    

    
    const optionsFormat: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
    // Si es hoy
    if (diffInDays === 0) {
        return new Intl.DateTimeFormat('en-US', optionsFormat).format(messageDate);
    }
    
    // Si fue ayer
    if (diffInDays === 1) {
        return `${'Yesterday'} ${new Intl.DateTimeFormat('en-US', optionsFormat).format(messageDate)}`;
    }
    
    // Si fue esta semana (últimos 7 días)
    if (diffInDays < 7) {
        return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(messageDate);
    }
    
    // Si es más antiguo, muestra fecha completa
    return new Intl.DateTimeFormat('en-US', { 
        month: 'short', 
        day: 'numeric' 
    }).format(messageDate);
};