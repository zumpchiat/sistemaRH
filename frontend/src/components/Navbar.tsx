export default function Navbar() {

    return(
    <div className=" mb-3">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-20">
        <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            RH
        </div>
        <h1 className="font-bold text-xl tracking-tight text-black-800 ">Assim</h1>
        </div>
        
        <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-700 leading-none">Usuário</p>
            <p className="text-xs text-slate-500">Desenvolvedor Full Stack</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-blue-100 flex items-center justify-center text-blue-600 font-bold">
            DS
        </div>
        </div>
    </header>
  </div>
  );

}