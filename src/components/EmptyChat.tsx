interface EmptyChatProps {
  onMenuClick?: () => void;
}

export const EmptyChat = ({ onMenuClick }: EmptyChatProps) => {
  return (
    <div className="flex-1 flex flex-col bg-background-light">
      {/* Header con botón de menú */}
      {onMenuClick && (
        <header className="h-20 px-6 border-b border-slate-100 flex items-center bg-background-light">
          <button 
            onClick={onMenuClick}
            className="md:hidden text-slate-500 hover:text-primary transition-colors p-2 rounded-lg hover:bg-white/80"
          >
            <span className="material-icons-round">menu</span>
          </button>
        </header>
      )}
      
      {/* Contenido centrado */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-32 h-32 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="material-icons-round text-7xl text-primary">chat</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            SageChat
          </h2>
          <p className="text-slate-500">
            Selecciona una conversación para comenzar a chatear
          </p>
        </div>
      </div>
    </div>
  );
};