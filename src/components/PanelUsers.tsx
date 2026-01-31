import { Logout } from "./Logout";
import { formatDateHour } from "../helpers/format";
import { useChat } from "../context/ChatContext";
import { type Contact } from "../types/contact";
import { useState, useEffect } from "react";
import { AddContact } from "./AddContact";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db, auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface PanelUsersProps {
    showSidebar: boolean;
    onClose: () => void;
}

export const PanelUsers = ({ showSidebar, onClose }: PanelUsersProps) => {

    const { selectedChat, setSelectedChat } = useChat();
    const [showAddContact, setShowAddContact] = useState(false);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [user] = useAuthState(auth);

    const handleContactClick = (contact: Contact) => {
        setSelectedChat(contact);
        onClose(); // Cierra el sidebar en móvil después de seleccionar
    };

    // Cargar contactos en tiempo real desde Firestore
    useEffect(() => {
        if (!user) return;

        const q = query(collection(db, "users", user.uid, "contacts"));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const loadedContacts: Contact[] = [];
            snapshot.forEach((doc) => {
                loadedContacts.push({
                    id: doc.id,
                    name: doc.data().name,
                    email: doc.data().email,
                    message: '',
                    time: formatDateHour(doc.data().addedAt?.toDate() || new Date()),
                    active: false,
                    avatar: doc.data().photoURL
                });
            });
            setContacts(loadedContacts);
        });

        return () => unsubscribe();
    }, [user]);

    return (
        <aside className={`
            w-80 flex-col border-r border-slate-200 bg-sidebar-light transition-all duration-300
            md:flex md:relative md:translate-x-0
            ${showSidebar ? 'flex fixed inset-y-0 left-0 z-50' : 'hidden'}
        `}>
            {/* Header con logo y búsqueda */}
            <div className="p-6 pb-2">
                <div className="flex items-center gap-3 mb-6">
                    {/* Botón cerrar en móvil */}
                    <button
                        onClick={onClose}
                        className="md:hidden text-slate-500 hover:text-primary transition-colors p-2 -ml-2 rounded-lg hover:bg-white/80"
                    >
                        <span className="material-icons-round">close</span>
                    </button>
                    
                    <div className="relative w-10 h-10 flex items-center justify-center">
                        <span className="material-icons-round text-primary text-3xl absolute -left-1 -top-1 opacity-70">
                            chat_bubble
                        </span>
                        <span className="material-icons-round text-primary text-3xl absolute left-1 top-1">
                            chat_bubble
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-primary">
                        SageChat
                    </h1>
                </div>
                
                {/* Botón agregar contacto */}
                <button
                    onClick={() => setShowAddContact(true)}
                    className="w-full mb-4 py-3 px-4 bg-primary text-white rounded-2xl hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                    <span className="material-icons-round text-xl">person_add</span>
                    <span className="font-medium">Agregar Contacto</span>
                </button>
                
                <div className="relative">
                    <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                        search
                    </span>
                    <input
                        className="w-full bg-white border-none rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 placeholder-slate-400 transition-all shadow-sm"
                        placeholder="Buscar usuarios..."
                        type="text"
                    />
                </div>
            </div>

            {/* Lista de conversaciones */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
                {contacts.length === 0 ? (
                    // Mensaje cuando no hay contactos
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                        <span className="material-icons-round text-slate-300 text-6xl mb-4">
                            person_add
                        </span>
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">
                            No tienes contactos
                        </h3>
                        <p className="text-sm text-slate-500 mb-4">
                            Agrega tu primer contacto para comenzar a chatear
                        </p>
                        <button
                            onClick={() => setShowAddContact(true)}
                            className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors text-sm font-medium"
                        >
                            Agregar Contacto
                        </button>
                    </div>
                ) : (
                    // Lista de contactos
                    <>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2 mt-4">
                            Contactos
                        </p>
                        {contacts.map((contact) => (
                            <button 
                                key={contact.id}
                                onClick={() => handleContactClick(contact)}
                                className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                                    selectedChat?.id === contact.id
                                        ? 'bg-accent shadow-sm border border-primary/20' 
                                        : 'bg-white shadow-sm border border-slate-100 hover:bg-accent/50'
                                }`}
                            >
                                <div className="relative">
                                    <img
                                        alt={contact.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                        src={contact.avatar}
                                    />
                                    {contact.active && (
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                    )}
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="flex justify-between items-center mb-0.5">
                                        <span className="font-semibold text-slate-800">
                                            {contact.name}
                                        </span>
                                        <span className="text-xs text-slate-400">{contact.time}</span>
                                    </div>
                                    <p className="text-sm text-slate-500 truncate">
                                        {contact.email}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </>
                )}
            </div>

            {/* Footer con perfil de usuario y logout */}
            <Logout />
            
            {/* Modal de agregar contacto */}
            {showAddContact && <AddContact onClose={() => setShowAddContact(false)} />}
        </aside>
    );
};