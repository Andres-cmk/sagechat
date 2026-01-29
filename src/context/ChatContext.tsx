import { createContext, useContext, useState, type ReactNode } from "react";
import { type Contact } from "../types/contact";


interface ChatContextType {
    selectedChat: Contact | null;
    setSelectedChat: (contact: Contact | null) => void;
};


const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [selectedChat, setSelectedChat] = useState<Contact | null>(null);
    return (
        <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};