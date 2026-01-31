import { useState } from "react";
import { collection, query, where, getDocs, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../services/firebase";

interface AddContactProps {
    onClose: () => void;
}

export const AddContact = ({ onClose }: AddContactProps) => {
    const [searchEmail, setSearchEmail] = useState<string>("");
    const [searchResult, setSearchResult] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const searchUser = async () => {
        if (!searchEmail.trim()) {
            setMessage("Escribe un email para buscar");
            return;
        };

        setLoading(true);
        setMessage("");
        setSearchResult(null);

        try {
            // Buscar usuario por email
            const q = query(
                collection(db, "users"), 
                where("email", "==", searchEmail.toLowerCase().trim())
            );
            
            const querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) {
                setMessage("No se encontró ningún usuario con ese email");
            } else {
                const userData = querySnapshot.docs[0];
                const user = { id: userData.id, ...userData.data() };
                
                // No puedes agregarte a ti mismo
                if (user.id === auth.currentUser?.uid) {
                    setMessage("No puedes agregarte a ti mismo");
                    return;
                }
                
                setSearchResult(user);
            }
        } catch (error) {
            console.error("Error buscando usuario:", error);
            setMessage("Error al buscar usuario");
        } finally {
            setLoading(false);
        }
    };



    const addContact = async () => {
        if (!searchResult || !auth.currentUser) return;

        setLoading(true);
        try {
            // Agregar a tu lista de contactos
            await setDoc(doc(db, "users", auth.currentUser.uid, "contacts", searchResult.id), {
                email: searchResult.email,
                name: searchResult.name,
                photoURL: searchResult.photoURL,
                addedAt: serverTimestamp()
            });

            setMessage("¡Contacto agregado exitosamente!");
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            console.error("Error agregando contacto:", error);
            setMessage("Error al agregar contacto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Agregar Contacto</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <span className="material-icons-round text-slate-500">close</span>
                    </button>
                </div>

                {/* Búsqueda */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email del usuario
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && searchUser()}
                            placeholder="ejemplo@gmail.com"
                            className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        />
                        <button
                            onClick={searchUser}
                            disabled={loading}
                            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            <span className="material-icons-round text-xl">search</span>
                        </button>
                    </div>
                </div>

                {/* Mensaje de estado */}
                {message && (
                    <div className={`p-3 rounded-lg mb-4 text-sm ${
                        message.includes("exitosamente") 
                            ? "bg-green-50 text-green-700" 
                            : "bg-slate-50 text-slate-600"
                    }`}>
                        {message}
                    </div>
                )}

                {/* Resultado de búsqueda */}
                {searchResult && (
                    <div className="border border-slate-200 rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src={searchResult.photoURL}
                                alt={searchResult.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-slate-800">{searchResult.name}</h3>
                                <p className="text-sm text-slate-500">{searchResult.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={addContact}
                            disabled={loading}
                            className="w-full py-3 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50 font-medium"
                        >
                            Agregar a contactos
                        </button>
                    </div>
                )}

                {/* Loading */}
                {loading && !searchResult && (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                )}
            </div>
        </div>
    );
};
