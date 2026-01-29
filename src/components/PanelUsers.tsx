import { Logout } from "./Logout";
import { formatDateHour } from "../helpers/format";
import { useChat } from "../context/ChatContext";
import { type Contact } from "../types/contact";

export const PanelUsers = () => {

    const { selectedChat, setSelectedChat } = useChat();

    const contacts: Contact[] = [
        { 
            id: '1', 
            name: 'Sarah Miller', 
            message: 'Can you send me the files?', 
            time: formatDateHour(new Date()), 
            active: true, 
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZG9DJzbjfqSHkm-KNZF7odJd2MCR5s53SLHsZrZ3yQndQqvMykhFg7z6p6jYqIpW4LWMDSlkUlw-7BlDVs65_aCqr0pKtkYtHeww_JXfd1tqA7ZwgbK-j3TJ0aP01qqqYHyOzCIbTvLbo6tYOZf9OY-T5cJ970L9cDn6XRtmC3bBALZ8z1iqM68ACae8d5l0FAfGkPlkC2reaSHRvNhgN6T77PskZ6PG7m_5M3W5LsHnUiY9KgDxYf2iD27BwhRmZDZSIA0J3yp6G'
        },
        { 
            id: '2', 
            name: 'David Chen', 
            message: 'Meeting rescheduled to 3PM.', 
            time: formatDateHour(new Date()), 
            active: false, 
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAYQ0nudiWoC8nY_n8leWppKewcq1kQO3XvawXtMjdmus_VINMeP834YzqlAuSBtTtRX_7k_uS8At2947d58tcOmdM4W4ukBPzbHyohnPFJo5E-B3uGY8Ymg3RLmZ09nVkNQs0J7XwxZ4RTzXNOrGcbhVomlNlBmrhEMt2fV_v2wYI02XX_qWQfchKl_0IVoGOd59ndRnzGlurxTQutCucBrOuOHhvi4bliSO6_LPROcjvWU_agXn2IIUjB33qe7aKOesAagL1fpkd'
        },
        { 
            id: '3', 
            name: 'Marcus Johnson', 
            message: 'Thanks for the update!', 
            time: 'Tue', 
            active: false, 
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1P-3yTair5I69YBI-H-nDLSaZY0sj7DyvQOWBhlM-D_VvZZ8l7ec_L2KM12qMGh5ATE5aZ9C2m5indRycYr60Q2MRNH5-4FGz3Qc7FJbbcJDWuIH9LFrW-yp1FooM4XQbygph532Zs8F_AIKkPms02hqFw1fPXZrsCyf7GkSq7PSW7i1vZEf9QpxVW2FJbEgddYXthdvoFO5syxIOm4wSi_-ySDKNAo8K-csipJxsJSz__IocilyzWlx-HmFA4G2IcLnmgxPhihe_'
        },
        { 
            id: '4', 
            name: 'Emma Wilson', 
            message: 'Great work on the design.', 
            time: 'Mon', 
            active: false, 
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6F1S4cA3MBZBDKBghLgHKLl5RfmHqOh5mpl-Q-ExLzLiUl6itrrEhEt76Gox0PV7aVPSl2MNMjQ6DlSblgERJ4jJyu_QwDBwyM4bVOlQowoo3_VJFmvZIdtJiUUVMZ_Vp6OtvW75tX99jrtXhaGRBkC3vIjjDg5dGGiNYRjBDxP3szYMuXQzhFNKfaEumV5W2Xi74BV9Ui5zJ-2dV0UT2-29GqXT4BFuGqdOuzb2ZMuHI7Y61UOUQcSMc17R6SOtBZoshaeJsAUKD'
        }
    ];

    return (
        <aside className="w-80 flex-col border-r border-slate-200 bg-sidebar-light transition-colors duration-200 hidden md:flex">
            {/* Header con logo y búsqueda */}
            <div className="p-6 pb-2">
                <div className="flex items-center gap-3 mb-6">
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
                {/* Sección Pinned */}
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2 mt-4">
                    Ahora
                </p>
                <button 
                    onClick={() => setSelectedChat(contacts[0])}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all group ${
                        selectedChat?.id === '1' 
                            ? 'bg-accent shadow-sm border border-primary/20' 
                            : 'bg-white shadow-sm border border-slate-100 hover:bg-accent/50'
                    }`}
                >
                    <div className="relative">
                        <img
                            alt="Sarah Avatar"
                            className="w-12 h-12 rounded-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZG9DJzbjfqSHkm-KNZF7odJd2MCR5s53SLHsZrZ3yQndQqvMykhFg7z6p6jYqIpW4LWMDSlkUlw-7BlDVs65_aCqr0pKtkYtHeww_JXfd1tqA7ZwgbK-j3TJ0aP01qqqYHyOzCIbTvLbo6tYOZf9OY-T5cJ970L9cDn6XRtmC3bBALZ8z1iqM68ACae8d5l0FAfGkPlkC2reaSHRvNhgN6T77PskZ6PG7m_5M3W5LsHnUiY9KgDxYf2iD27BwhRmZDZSIA0J3yp6G"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="flex-1 text-left">
                        <div className="flex justify-between items-center mb-0.5">
                            <span className="font-semibold text-slate-800">
                                Sarah Miller
                            </span>
                            <span className="text-xs text-primary font-medium">{formatDateHour(new Date())}</span>
                        </div>
                        <p className="text-sm text-slate-500 truncate">
                            Can you send me the files?
                        </p>
                    </div>
                </button>

                {/* Sección Recent */}
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2 mt-6">
                    Recientes
                </p>
                <button 
                    onClick={() => setSelectedChat(contacts[1])}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                        selectedChat?.id === '2' 
                            ? 'bg-accent shadow-sm border border-primary/20' 
                            : 'hover:bg-white/60'
                    }`}>
                    <div className="relative">
                        <img
                            alt="David Avatar"
                            className="w-12 h-12 rounded-full object-cover grayscale opacity-70"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAYQ0nudiWoC8nY_n8leWppKewcq1kQO3XvawXtMjdmus_VINMeP834YzqlAuSBtTtRX_7k_uS8At2947d58tcOmdM4W4ukBPzbHyohnPFJo5E-B3uGY8Ymg3RLmZ09nVkNQs0J7XwxZ4RTzXNOrGcbhVomlNlBmrhEMt2fV_v2wYI02XX_qWQfchKl_0IVoGOd59ndRnzGlurxTQutCucBrOuOHhvi4bliSO6_LPROcjvWU_agXn2IIUjB33qe7aKOesAagL1fpkd"
                        />
                    </div>
                    <div className="flex-1 text-left">
                        <div className="flex justify-between items-center mb-0.5">
                            <span className="font-medium text-slate-700">
                                David Chen
                            </span>
                            <span className="text-xs text-slate-400">{formatDateHour(new Date())}</span>
                        </div>
                        <p className="text-sm text-slate-400 truncate">
                            Meeting rescheduled to 3PM.
                        </p>
                    </div>
                </button>

                <button 
                    onClick={() => setSelectedChat(contacts[2])}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                        selectedChat?.id === '3' 
                            ? 'bg-accent shadow-sm border border-primary/20' 
                            : 'hover:bg-white/60'
                    }`}>
                    <div className="relative">
                        <img
                            alt="Marcus Avatar"
                            className="w-12 h-12 rounded-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1P-3yTair5I69YBI-H-nDLSaZY0sj7DyvQOWBhlM-D_VvZZ8l7ec_L2KM12qMGh5ATE5aZ9C2m5indRycYr60Q2MRNH5-4FGz3Qc7FJbbcJDWuIH9LFrW-yp1FooM4XQbygph532Zs8F_AIKkPms02hqFw1fPXZrsCyf7GkSq7PSW7i1vZEf9QpxVW2FJbEgddYXthdvoFO5syxIOm4wSi_-ySDKNAo8K-csipJxsJSz__IocilyzWlx-HmFA4G2IcLnmgxPhihe_"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-slate-300 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="flex-1 text-left">
                        <div className="flex justify-between items-center mb-0.5">
                            <span className="font-medium text-slate-700">
                                Marcus Johnson
                            </span>
                            <span className="text-xs text-slate-400">Tue</span>
                        </div>
                        <p className="text-sm text-slate-400 truncate">
                            Thanks for the update!
                        </p>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-primary">
                        2
                    </div>
                </button>

                <button 
                    onClick={() => setSelectedChat(contacts[3])}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                        selectedChat?.id === '4' 
                            ? 'bg-accent shadow-sm border border-primary/20' 
                            : 'hover:bg-white/60'
                    }`}>
                    <div className="relative">
                        <img
                            alt="Emma Avatar"
                            className="w-12 h-12 rounded-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6F1S4cA3MBZBDKBghLgHKLl5RfmHqOh5mpl-Q-ExLzLiUl6itrrEhEt76Gox0PV7aVPSl2MNMjQ6DlSblgERJ4jJyu_QwDBwyM4bVOlQowoo3_VJFmvZIdtJiUUVMZ_Vp6OtvW75tX99jrtXhaGRBkC3vIjjDg5dGGiNYRjBDxP3szYMuXQzhFNKfaEumV5W2Xi74BV9Ui5zJ-2dV0UT2-29GqXT4BFuGqdOuzb2ZMuHI7Y61UOUQcSMc17R6SOtBZoshaeJsAUKD"
                        />
                    </div>
                    <div className="flex-1 text-left">
                        <div className="flex justify-between items-center mb-0.5">
                            <span className="font-medium text-slate-700">
                                Emma Wilson
                            </span>
                            <span className="text-xs text-slate-400">Mon</span>
                        </div>
                        <p className="text-sm text-slate-400 truncate">
                            Great work on the design.
                        </p>
                    </div>
                </button>
            </div>

            {/* Footer con perfil de usuario y logout */}
            <Logout />
        </aside>
    );
};