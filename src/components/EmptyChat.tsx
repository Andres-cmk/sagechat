export const EmptyChat = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-background-light p-8">
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
  );
};