import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PanelUsers } from "./PanelUsers";
import { Message } from "./Message";

export const Chat = () => {
  const [user, loading]: any = useAuthState(auth);
  const navigate: any = useNavigate();

  useEffect(() => {
    // Si no hay usuario, redirigir al login
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-mint-light flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-background-light text-slate-800 h-screen w-screen overflow-hidden">
      <div className="flex h-full w-full" >
        <PanelUsers />
        <Message />
      </div>
    </div>
  );
};

export default Chat;
