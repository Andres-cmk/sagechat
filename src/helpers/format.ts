export const formatDateHour = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    
    // Calcular diferencia en días
    const diffInMs = now.getTime() - messageDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    // Si es hoy
    if (diffInDays === 0 && now.toDateString() === messageDate.toDateString()) {
        const optionsFormat: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return new Intl.DateTimeFormat('en-US', optionsFormat).format(messageDate);
    }
    
    // Si fue ayer
    if (diffInDays === 1) {
        return 'Yesterday';
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