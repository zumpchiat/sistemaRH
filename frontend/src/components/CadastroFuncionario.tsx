import { useState, useEffect } from 'react';
import api from '../services/api';
import { mask_CPF, mask_Phone } from '../utils/mask';
import toast from 'react-hot-toast';


interface Cargo {
  id: number;
  name: string;
}

interface Funcionario {
  id?: number;
  name: string;
  cpf: string;
  role_id: string | number;
  birth_date?: string | null;
  email: string;
  cep: string;
  phone: string; 
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

const CadastroFuncionarios = () => {
const [busca, setBusca] = useState('');
const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
const [cargos, setCargos] = useState<Cargo[]>([]);
const [funcSelecionado, setFuncSelecionado] = useState<Funcionario | null>(null);
const [loading, setLoading] = useState(false);


useEffect(() => {
  const carregarCargos = async () => {
    try {
      const response = await api.get('/roles');
      
      setCargos(response.data.data || response.data);
    } catch (error) {
      toast.error("Erro ao carregar lista de cargos.");
    }
  };
  carregarCargos();
}, []);


const handlePesquisar = async () => {
  setLoading(true);
  setFuncSelecionado(null);

  try {

    const buscaLimpa = busca.replace(/[.-]/g, '');
    const isCpf = /^\d+$/.test(buscaLimpa);
    const params = isCpf ? { cpf: buscaLimpa } : { name: busca };
    const response = await api.get('/employees', { params });
    const data = response.data.data; 
    
    setFuncionarios(data);
    
    if (data.length === 0) toast.error("Nenhum funcionário encontrado.");
  } catch (error) {
    console.error(error);
    toast.error("Erro ao buscar funcionários.");
  } finally {
    setLoading(false);
  }
};

const prepararInclusao = () => {
  setFuncSelecionado({
        name: '',
        cpf: '', 
        role_id: '',
        birth_date: null,
        email: '',
        cep:'',
        phone: '',
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        state: ''
      
      });
};

const handleSalvar = async () => {
  if (!funcSelecionado) return;

  if (!funcSelecionado.name || !funcSelecionado.cpf || !funcSelecionado.role_id) {
    toast.error("Nome, CPF e Cargo são obrigatórios!");
    return;
  }

  const loadToast = toast.loading("Processando...");

  try {
    
    const dadosParaEnviar = {
      ...funcSelecionado,
      cep: funcSelecionado.cep.replace(/\D/g, ''),
      cpf: funcSelecionado.cpf.replace(/\D/g, ''), 
      role_id: Number(funcSelecionado.role_id)    
    };

    if (funcSelecionado.id) {
      
      await api.put(`/employees/${funcSelecionado.id}`, dadosParaEnviar);
      toast.success("Funcionário atualizado!", { id: loadToast });
      //console.log(dadosParaEnviar);
      
    } else {
      
      await api.post('/employees', dadosParaEnviar);
      toast.success("Funcionário cadastrado!", { id: loadToast });
    }

    setFuncSelecionado(null);
    setBusca(""); 
    handlePesquisar(); 
  } catch (error: any) {
    
    const backendMessage = error.response?.data?.errors?.cpf?.[0] 
      || error.response?.data?.message 
      || "Erro ao salvar. Verifique os dados.";
    
    toast.error(backendMessage, { id: loadToast });
  }
};

const handleExcluir = async (id: number) => {
  if (!window.confirm("Deseja realmente excluir este funcionário?")) return;
  const loadToast = toast.loading("Excluindo...");
  try {
    await api.delete(`/employees/${id}`);
    setFuncionarios(prev => prev.filter(f => f.id !== id));
    setFuncSelecionado(null);
    setBusca("");
    toast.success("Removido com sucesso!", { id: loadToast });
  } catch (error) {
    toast.error("Erro ao excluir funcionário.", { id: loadToast });
  }
};

  return (
    <div className="space-y-6">
      {/*  PESQUISA (NOME OU CPF) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">Gestão de Funcionários</h2>
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
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Pesquisar por nome ou CPF..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button 
            onClick={handlePesquisar}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
          >
            {loading ? 'Buscando...' : '🔍 Pesquisar'}
          </button>
        </div>
      </div>

        {/*  FORMULÁRIO  */}
      {funcSelecionado && (
       
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4  border-slate-200 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              {funcSelecionado.id ? `Editando: ${funcSelecionado.name}` : 'Cadastrar Novo Funcionário'}
            </h2>
            <button onClick={() => setFuncSelecionado(null)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-600">Nome Completo *</label>
              <input 
                className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
                value={funcSelecionado.name}
                onChange={(e) => setFuncSelecionado({...funcSelecionado, name: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-600">Cargo *</label>
              <select 
                className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none bg-white cursor-pointer"
                value={funcSelecionado.role_id}
                onChange={(e) => setFuncSelecionado({...funcSelecionado, role_id: e.target.value})}
              >
                <option value="">Selecione um cargo</option>
                {cargos.map(cargo => (
                  <option key={cargo.id} value={cargo.id}>{cargo.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-600">CPF *</label>
              <input 
                className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
                placeholder="000.000.000-00"
                value={mask_CPF(funcSelecionado.cpf)}
                onChange={(e) => setFuncSelecionado({...funcSelecionado, cpf: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-600">Nascimento</label>
              <input 
                type="date"
                className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
                value={funcSelecionado.birth_date || ''}
                onChange={(e) => setFuncSelecionado({...funcSelecionado, birth_date: e.target.value || null})}
              />
            </div>
             <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-600">Email</label>
              <input 
                className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
                value={funcSelecionado.email}
                onChange={(e) => setFuncSelecionado({...funcSelecionado, email: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-600">Telefone</label>
              <input 
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:border-blue-500 outline-none"
                value={mask_Phone(funcSelecionado.phone) }
                onChange={(e) => setFuncSelecionado({...funcSelecionado, phone: e.target.value})}
              />
            </div>
          </div>
          {/* Seção de Endereço  */}
            <div className="mt-6 pt-6 border-t border-slate-100">
           
            
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

               
                <div className="md:col-span-1 space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Cep</label>
                <input 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                    value={funcSelecionado.cep || ''}
                    onChange={(e) => setFuncSelecionado({...funcSelecionado, cep: e.target.value})}
                />
                </div>
                
               
                <div className="md:col-span-4 space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Rua</label>
                <input 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                    value={funcSelecionado.street || ''}
                    onChange={(e) => setFuncSelecionado({...funcSelecionado, street: e.target.value})}
                />
                </div>

                
                <div className="md:col-span-1 space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Número</label>
                <input 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                    value={funcSelecionado.number || ''}
                    onChange={(e) => setFuncSelecionado({...funcSelecionado, number: e.target.value})}
                />
                </div>
         

                
                <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Bairro</label>
                <input 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                    value={funcSelecionado.neighborhood || ''}
                    onChange={(e) => setFuncSelecionado({...funcSelecionado, neighborhood: e.target.value})}
                />
                </div>

                
                <div className="md:col-span-3 space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">Cidade</label>
                <input 
                    className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                    value={funcSelecionado.city || ''}
                    onChange={(e) => setFuncSelecionado({...funcSelecionado, city: e.target.value})}
                />
                </div>

                
                <div className="md:col-span-1 space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase">UF</label>
                <input 
                    maxLength={2}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none uppercase"
                    value={funcSelecionado.state || ''}
                    onChange={(e) => setFuncSelecionado({...funcSelecionado, state: e.target.value.toUpperCase()})}
                />
                </div>

            </div>
            </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex gap-3">
            <button onClick={handleSalvar} className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 font-bold shadow-lg transition-all">
              Salvar 
            </button>
            
            {funcSelecionado.id && (
              <button 
                onClick={() => handleExcluir(funcSelecionado.id!)}
                className="bg-white text-red-500 border border-red-200 px-8 py-2.5 rounded-lg hover:bg-red-50 font-bold transition-all"
              >
                Excluir
              </button>
            )}

            <button onClick={() => setFuncSelecionado(null)} className="bg-slate-100 text-slate-600 px-8 py-2.5 rounded-lg font-bold hover:bg-slate-200">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* TABELA DE RESULTADOS */}

      {funcionarios.length > 0 && (
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-y-auto no-scrollbar">
         <div className="max-h-[700px] overflow-y-auto no-scrollbar shadow-inner">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Nome</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">CPF</th>
                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {funcionarios.map(f => (
                <tr 
                  key={f.id} 
                  onClick={() => setFuncSelecionado(f)}
                  className="hover:bg-blue-50 cursor-pointer transition-colors group"
                >
                  <td className="px-6 py-3 text-sm font-medium text-slate-700">{f.name}</td>
                  <td className="px-6 py-3 text-sm text-slate-500">{mask_CPF(f.cpf)}</td>
                  <td className="px-6 py-3 text-sm text-right text-blue-600 font-semibold group-hover:underline">Selecionar</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

    
    </div>
  );
};

export default CadastroFuncionarios;