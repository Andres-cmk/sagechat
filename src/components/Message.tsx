export const Message = () => {
    return (
        <main className="flex-1 flex flex-col relative bg-white">
            {/* Header */}
            <header className="h-20 px-6 border-b border-slate-100 flex items-center justify-between bg-background-light backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <button className="md:hidden text-slate-500">
                        <span className="material-icons-round">menu</span>
                    </button>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            Sarah Miller
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        </h2>
                        <p className="text-xs text-slate-500">
                            Active now
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors">
                        <span className="material-icons-round">call</span>
                    </button>
                    <button className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors">
                        <span className="material-icons-round">videocam</span>
                    </button>
                    <div className="h-6 w-px bg-slate-200 mx-1"></div>
                    <button className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors">
                        <span className="material-icons-round">more_vert</span>
                    </button>
                </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Los mensajes se renderizarán aquí dinámicamente */}
            </div>

            {/* Message Input */}
            <div className="p-6 bg-white backdrop-blur-sm z-10">
                <div className="flex items-end gap-3 max-w-4xl mx-auto">
                    <div className="flex-1 bg-white shadow-sm rounded-3xl p-2 flex items-center border border-slate-200 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all">
                        <button className="p-2 text-slate-400 hover:text-primary transition-colors rounded-full hover:bg-slate-50">
                            <span className="material-icons-round text-2xl">add_circle</span>
                        </button>
                        <input
                            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-700 placeholder-slate-400 px-2 h-10"
                            placeholder="Type a message..."
                            type="text"
                        />
                        <button className="p-2 text-slate-400 hover:text-yellow-500 transition-colors rounded-full hover:bg-slate-50">
                            <span className="material-icons-round text-xl">emoji_emotions</span>
                        </button>
                    </div>
                    <button className="h-14 w-14 bg-primary hover:bg-primary-hover text-white rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center transition-transform active:scale-95 group">
                        <span className="material-icons-round text-2xl group-hover:translate-x-0.5 transition-transform">
                            send
                        </span>
                    </button>
                </div>
            </div>
        </main>
    );
};