import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth } from "../services/firebase";
import { useChat } from "../context/ChatContext";
import { formatDateHour } from "../helpers/format";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import es from 'emoji-picker-react/dist/data/emojis-es'; // Spanish


export const Message = () => {

    const [message, setMessage]: any = useState("");
    const { selectedChat } = useChat();
    const [messagesCollection, setMessages] = useState<any>([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const sendMessage = async (e: any) => {
        
        e.preventDefault();

        if (!message.trim()) {
            console.log("Mensaje vacío, no se envía");
            return;
        } // No enviar mensajes vacíos

        console.log("Mensaje enviado:", message);

        const user = auth.currentUser;
        
        if (!user) {
            console.error("Usuario no autenticado");
            return;
        }

        const { uid, displayName, photoURL } = user;

        await addDoc(collection(db, "default"), {
            text: message,
            name: displayName,
            uid: uid,
            photo: photoURL,
            createdAt: serverTimestamp()
        });

        setMessage("");
    }

    const onEmojiClick = (emojiData: EmojiClickData) => {
        setMessage((prevMessage: string) => prevMessage + emojiData.emoji);
    };

    // Traer los mensaje en tiempo real.

    useEffect( () => {
        const q = query(collection(db, "default"), orderBy("createdAt", "asc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs: any[] = [];
            querySnapshot.forEach((doc) => {
                msgs.push({ id: doc.id, ...doc.data() });
            });
            setMessages(msgs);
    });

        return () => unsubscribe();
    }, [selectedChat]);


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
                            {selectedChat?.name || 'Usuario'}
                            {selectedChat?.active && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
                        </h2>
                        <p className="text-xs text-slate-500">
                            {selectedChat?.active ? 'Active now' : 'Offline'}
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
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background-light">
                {messagesCollection.map((msg: any) => {
                    const isCurrentUser = msg.uid === auth.currentUser?.uid;
                    
                    return (
                        <div key={msg.id} className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Avatar - para ambos usuarios */}
                            <img
                                src={isCurrentUser ? auth.currentUser?.photoURL || '' : (selectedChat?.avatar || msg.photoURL)}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full object-cover shrink-0"
                            />
                            
                            {/* Contenedor del mensaje */}
                            <div className={`flex flex-col gap-1 max-w-md ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                                {/* Nombre - solo para mensajes del otro usuario */}
                                {!isCurrentUser && (
                                    <span className="text-xs text-slate-500 px-1">
                                        {selectedChat?.name || msg.name}
                                    </span>
                                )}
                                
                                {/* Burbuja del mensaje */}
                                <div className={`px-4 py-3 rounded-2xl ${
                                    isCurrentUser 
                                        ? 'bg-primary text-white rounded-tr-sm' 
                                        : 'bg-white text-slate-800 rounded-tl-sm shadow-sm'
                                }`}>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
                                        {msg.text}
                                    </p>
                                </div>
                                
                                {/* Hora del mensaje */}
                                <span className={`text-xs text-slate-400 px-1 ${isCurrentUser ? 'text-right mag mr-2' : 'text-left ml-2'}`}>
                                    {msg.createdAt && msg.createdAt.toDate 
                                        ? formatDateHour(msg.createdAt.toDate()) 
                                        : msg.localTimestamp
                                            ? formatDateHour(new Date(msg.localTimestamp))
                                            : 'Enviando...'}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Message Input */}
            <div className="p-10 bg-white backdrop-blur-sm z-10">
                <form className="flex items-end gap-3 max-w-4xl mx-auto relative" onSubmit={sendMessage}>
                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                        <div className="absolute bottom-full mb-2 right-20">
                            <EmojiPicker onEmojiClick={onEmojiClick} emojiData={es} />
                        </div>
                    )}
                    
                    <div className="flex-1 bg-white shadow-sm rounded-3xl p-2 flex items-center border border-slate-200 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all">
                        {/* <button className="p-2 text-slate-400 hover:text-primary transition-colors rounded-full hover:bg-slate-50">
                            <span className="material-icons-round text-2xl">add_circle</span>
                        </button> */}
                     
                        <input
                            className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-slate-700 placeholder-slate-400 px-2 h-10"
                            placeholder="Escribe un mensaje..."
                            type="text"
                            value={message}
                            onChange={ e => setMessage(e.target.value)}
                        />
                        <button 
                            type="button"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="p-2 text-slate-400 hover:text-yellow-500 transition-colors rounded-full hover:bg-slate-50"
                        >
                            <span className="material-icons-round text-xl">emoji_emotions</span>
                        </button>
                    </div>
                    <button type="submit" className="h-14 w-14 bg-primary hover:bg-primary-hover text-white rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center transition-transform active:scale-95 group">
                    
                        <span className="material-icons-round text-2xl group-hover:translate-x-0.5 transition-transform">
                            send
                        </span>
                    </button>
                </form>
            </div>
        </main>
    );
};