import { NavLink } from "react-router-dom";

export default function Siderbar() {

    return(
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            
           
              <nav className="flex-1 py-6 px-2 space-y-8">        
                
                <NavLink 
                        to="/cargos" 
                        className={({ isActive }) => 
                       `flex items-center gap-3 px-3 py-2.5 rounded-lg text-white bg-blue-600 ${isActive ? 'bg-gray-300' : 'hover:bg-blue-700'}`}>
                       <span className="group-hover:scale-110 transition-transform">💼</span> Cargos
                </NavLink>

                <NavLink 
                        to="/funcionarios" 
                        className={({ isActive }) => 
                       `flex items-center gap-3 px-3 py-2.5 rounded-lg text-white bg-blue-600 ${isActive ? 'bg-gray-300' : 'hover:bg-blue-700'}`}>
                       <span className="group-hover:scale-110 transition-transform">👥</span> Funcionários
                </NavLink>

                 <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                       `flex items-center gap-3 px-3 py-2.5 rounded-lg text-white bg-blue-600 ${isActive ? 'bg-gray-300' : 'hover:bg-blue-700'}`}>
                       <span className="group-hover:scale-110 transition-transform">📄</span> Relatórios
                </NavLink>
              </nav>


        </div>
    )
}