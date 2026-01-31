import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PanelUsers } from "./PanelUsers";
import { Message } from "./Message";
import { EmptyChat } from "./EmptyChat";
import { useChat } from "../context/ChatContext";


export const Chat = () => {
  const [user, loading]: any = useAuthState(auth);
  const navigate: any = useNavigate();
  const { selectedChat } = useChat();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // Si no hay usuario, redirigir al login
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-500">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-background-light text-slate-800 h-screen w-screen overflow-hidden">
      <div className="flex h-full w-full relative" >
        {/* Overlay para cerrar el sidebar en móvil */}
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}
        
        {/* Panel de usuarios */}
        <PanelUsers showSidebar={showSidebar} onClose={() => setShowSidebar(false)} />
        
        {/* Área de mensajes */}
        {selectedChat ? <Message onMenuClick={() => setShowSidebar(true)} /> : <EmptyChat onMenuClick={() => setShowSidebar(true)} />}
      </div>
    </div>
  );
};

export default Chat;
