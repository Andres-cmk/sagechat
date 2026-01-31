import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase"
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const Logout = () => {

    const [user, _]: any = useAuthState(auth);

    const navigate: any = useNavigate();
    return (
        <div
          className="p-4 border-t border-slate-200 mt-auto space-y-4 bg-white/30 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 px-2">

            <img src={user?.photoURL} alt={user?.displayName} className="rounded-full w-10 h-10"/>

            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">
                {user?.displayName}
              </p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span
                  className="text-[11px] font-medium text-slate-500 uppercase tracking-tight"
                  >Conectado</span>
              </div>
            </div>
            <button
              className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-slate-100 rounded-lg"
            >
              {/* <span className="material-icons-round text-xl">settings</span> */}
            </button>
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-dark-sage font-semibold text-sm transition-all duration-300 border border-slate-200/50 hover:bg-red-50 hover:text-red-600 group"
            onClick={async () => {
                await signOut(auth);
                navigate("/login");
            }}
          >
            <span
              className="material-symbols-outlined text-xl transition-transform group-hover:-translate-x-0.5"
              >logout
              </span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
    );
}