import { useState, useEffect } from 'react';
import api from '../services/api';
import { mask_Phone, mask_Currency } from '../utils/mask';
import toast from 'react-hot-toast';

interface Cargo {
  id: number;
  name: string;
}

interface FuncionarioRelatorio {
  id: number;
  name: string;
  phone?: string ;
  role?: {
    name: string;
    salary: number; 
  };
}


const RelatorioFuncionarios = () => {
  
  const [cargos, setCargos] = useState<Cargo[]>([]); 
  const [reportData, setReportData] = useState<FuncionarioRelatorio[]>([]);
  const [tipoFiltro, setTipoFiltro] = useState<'name' | 'role'>('name');
  const [valorBusca, setValorBusca] = useState('');

  
useEffect(() => {
  const fetchData = async () => {
    try {
      const [resCargos, resReport] = await Promise.all([
        api.get('/roles'),
        api.get('/employees/report')
      ]);

     
      const dadosCargos = Array.isArray(resCargos.data) ? resCargos.data : (resCargos.data.data || []);
      const dadosReport = Array.isArray(resReport.data) ? resReport.data : (resReport.data.data || []);

      setCargos(dadosCargos);
      setReportData(dadosReport);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      toast.error("Erro ao carregar informações do servidor.");
      
      setCargos([]);
      setReportData([]);
    }
  };

  fetchData();
}, []);

  const handleFiltrar = async () => {
  const loadToast = toast.loading("Filtrando...");
  try {
    
    const params = { [tipoFiltro]: valorBusca };
    
    const response = await api.get('/employees/report', { params });
    setReportData(response.data);
    toast.success(`${response.data.length} registros encontrados`, { id: loadToast });
  } catch (error) {
    toast.error("Erro ao filtrar dados", { id: loadToast });
  }
};

  return (
   <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
  <div className="flex items-center gap-6">
    <span className="text-sm font-bold text-slate-500 uppercase">Filtrar por:</span>
    
    
    <label className="flex items-center gap-2 cursor-pointer group">
      <input 
        type="radio" 
        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
        name="filtro"
        checked={tipoFiltro === 'name'}
        onChange={() => { setTipoFiltro('name'); setValorBusca(''); }}
      />
      <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
        Nome do Funcionário
      </span>
    </label>

    
    <label className="flex items-center gap-2 cursor-pointer group">
      <input 
        type="radio" 
        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300"
        name="filtro"
        checked={tipoFiltro === 'role'}
        onChange={() => { setTipoFiltro('role'); setValorBusca(''); }}
      />
      <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
        Nome do Cargo
      </span>
    </label>
  </div>

  <div className="flex gap-3">
      {tipoFiltro === 'name' ? (
    <input 
      type="text"
      className="flex-1 px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      placeholder="Pesquisar por nome..."
      value={valorBusca}
      onChange={(e) => setValorBusca(e.target.value)}
    />
  ) : (
   <select 
  className="flex-1 px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
  value={valorBusca}
  onChange={(e) => setValorBusca(e.target.value)}
>
  <option value="">Selecione um cargo para filtrar...</option>
  
  
  {Array.isArray(cargos) && cargos.map(cargo => (
    <option key={cargo.id} value={cargo.name}>
      {cargo.name}
    </option>
  ))}
</select>
  )}

  <button 
    onClick={handleFiltrar}
    className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 font-bold shadow-md transition-all active:scale-95"
  >
    🔍 Aplicar Filtro
  </button>
</div>


      {/* TABELA DE RELATÓRIO */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">Nome</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">Telefone</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600">Cargo</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-600 text-right">Salário</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reportData.map(emp => (
              <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-800">{emp.name}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{mask_Phone(emp.phone ?? '') || '(21) ----- ----'}</td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                    {emp.role?.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-right font-mono font-bold text-green-600">
                 {mask_Currency(emp.role?.salary)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-50 font-bold">
            <tr>
              <td colSpan={3} className="px-6 py-4 text-right text-slate-700">Total em Folha:</td>
              <td className="px-6 py-4 text-right text-green-700">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(                 
                  reportData.reduce((acc, curr: any) => acc + (Number(curr.role?.salary) || 0), 0)
                )}
                
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default RelatorioFuncionarios;