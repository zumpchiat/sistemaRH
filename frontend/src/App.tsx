
import { Toaster } from 'react-hot-toast';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'

import Navbar from './components/Navbar';
import Siderbar from './components/Siderbar';

import CadastroCargos from './components/CadastrodeCargos';
import CadastroFuncionario from './components/CadastroFuncionario';
import RelatorioFuncionarios from './components/RelatorioFuncionarios';


function App() {
  
 
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col h-screen w-full bg-slate-50  overflow-hidden  font-sans">
         
        <Navbar/>

        <div className="p-3 md:p-0 ml-2 flex flex-1 overflow-hidden">
         

           <Siderbar />

           
          <main className=" flex-1 overflow-y-auto no-scrollbar p-2 md:p-0 ml-2 mr-2">
            <div className="max-w-6xl mx-auto">
          <Routes>

            <Route path='/' element={<RelatorioFuncionarios/>}/>
            <Route path='/cargos' element={<CadastroCargos/>}/>
            <Route path='/funcionarios' element={<CadastroFuncionario />}/>
          
         </Routes>
             
            
            </div>
          </main>
        </div>
    </div>
      
    </Router>
    
   
  )
}

export default App

