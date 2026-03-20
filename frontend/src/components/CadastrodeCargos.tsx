import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';


interface Cargo {
  id?: number;
  name: string;
  salary: string | number;
}

const CadastroCargos = () => {
  const [busca, setBusca] = useState('');
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [cargoSelecionado, setCargoSelecionado] = useState<Cargo | null >(null); 
  const [loading, setLoading] = useState(false);

  const handlePesquisar = async () => {
    setLoading(true);
    setCargoSelecionado(null); 
    try {
      const response = await api.get(`/roles?search=${busca}`);
      const data = response.data.data || response.data;
      setCargos(data);
      if (data.length === 0) toast.error("Nenhum cargo encontrado.");
    } catch (error) {
      toast.error("Erro na busca.");
    } finally {
      setLoading(false);
    }
  };

  
  const prepararInclusao = () => {
    setCargoSelecionado({ name: '', salary: '' });
  };

  const handleSalvar = async () => {
  if (!cargoSelecionado) return;

  if (!cargoSelecionado.name || !cargoSelecionado.salary) {
    toast.error("Preencha todos os campos!");
    return;
  }

  const loadingToast = toast.loading("Salvando dados...");

  try {
    if (cargoSelecionado.id) {
     
      await api.put(`/roles/${cargoSelecionado.id}`, cargoSelecionado);
      toast.success("Cargo atualizado!", { id: loadingToast });
    } else {
     
      await api.post('/roles', cargoSelecionado);
      toast.success("Cargo cadastrado!", { id: loadingToast });
    }
    
    setCargoSelecionado(null); 
    handlePesquisar();       
  } catch (error) {
    toast.error("Erro ao salvar.", { id: loadingToast });
  }
};

const handleExcluir = async (id: number) => {
  
    if (!window.confirm("Tem certeza que deseja excluir este cargo?")) return;
      const loadingToast = toast.loading("Excluindo registro...");

      try {
        
        await api.delete(`/roles/${id}`);

        setCargos((prevCargos) => prevCargos.filter(cargo => cargo.id !== id));
        setCargoSelecionado(null);        
        toast.success("Cargo excluído com sucesso!", { id: loadingToast});

      } catch (error) {

        console.error("Erro ao excluir:", error);        
        toast.error("Não foi possível excluir o cargo. Verifique se há funcionários vinculados a ele.", { id: loadingToast });
    }
};


  return (
    <div className="space-y-6">
      {/*  SEÇÃO DE BUSCA */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">Gestão de Cargos</h2>
          <button 
            onClick={prepararInclusao}
            className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md shadow-green-100"
          >
            + Adicionar
          </button>
        </div>
        
        <div className="flex gap-2">
          <input 
            type="text"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Pesquisar por nome do cargo..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button 
            onClick={handlePesquisar}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium"
          >
            {loading ? '...' : 'Pesquisar'}
          </button>
        </div>
      </div>

        
      {/*  FORMULÁRIO DE EDIÇÃO/INCLUSÃO  */}
      {cargoSelecionado && (
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4  border-slate-200 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              {cargoSelecionado.id ? `Detalhes do Cargo #${cargoSelecionado.id}` : 'Adicionar Cargo'}
            </h2>
            <button 
              onClick={() => setCargoSelecionado(null)} 
              className="text-slate-400 hover:text-slate-600 text-2xl"
            >
              &times;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-600">Nome do Cargo</label>
              <input 
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none transition-all"
                value={cargoSelecionado.name}
                onChange={(e) => { if(cargoSelecionado){ setCargoSelecionado({...cargoSelecionado, name: e.target.value})}}}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-600">Salário (R$)</label>
              <input 
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none transition-all"
                value={cargoSelecionado.salary}
                onChange={(e) => {if (cargoSelecionado) { setCargoSelecionado({...cargoSelecionado, salary: e.target.value})}}}
              />
            </div>
          </div>

         <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-3">
                <button 
                    onClick={handleSalvar} 
                    className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 font-bold shadow-lg shadow-blue-200 transition-all"
                >
                    {cargoSelecionado.id ? 'Atualizar ' : 'Salvar '}
                </button>
                
                {cargoSelecionado.id && (
                    <button 
                    onClick={() => handleExcluir(cargoSelecionado.id!)}
                    className="bg-white text-red-500 border border-red-200 px-8 py-2.5 rounded-lg hover:bg-red-50 transition-all font-bold"
                    >
                    Excluir
                    </button> 
                )}
                
                <button 
                    onClick={() => setCargoSelecionado(null)}
                    className="bg-slate-100 text-slate-600 px-8 py-2.5 rounded-lg hover:bg-slate-200 font-bold transition-all"
                >
                    Cancelar
                </button>
            </div>
                    
        </div>
      )}


      {/*  TABELA DE RESULTADOS */}
      {cargos.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-500">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-xs uppercase tracking-wider font-bold text-slate-500">ID</th>
                <th className="px-6 py-3 text-xs uppercase tracking-wider font-bold text-slate-500">Nome do Cargo</th>
                <th className="px-6 py-3 text-xs uppercase tracking-wider font-bold text-slate-500 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cargos.map((cargo) => (
                <tr 
                  key={cargo.id} 
                  className="hover:bg-blue-50 cursor-pointer transition-colors group"
                  onClick={() => setCargoSelecionado(cargo)}
                >
                  <td className="px-6 py-3 text-sm text-slate-500">#{cargo.id}</td>
                  <td className="px-6 py-3 text-sm font-medium text-slate-700">{cargo.name}</td>
                  <td className="px-6 py-3 text-sm text-right text-blue-600 font-semibold group-hover:underline">
                    Selecionar
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default CadastroCargos;