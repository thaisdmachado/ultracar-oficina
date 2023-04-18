import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Dashboard from '../../Pages/Dashboard';
import Orcamento from '../../Pages/Orcamento';
import Patio from '../../Pages/Patio';
import Listagem from '../../Pages/Listagem';
import OrcamentoDetalhes from '../../Pages/Orcamento/OrcamentoDetalhes';


function AppRoutes() {
    return (
            <Routes>
                <Route path='/' element={<Dashboard />}></Route>               
                <Route path='/orcamento' element={<Orcamento />}></Route>
                <Route path='/patio' element={<Patio />}></Route>
                <Route path='/listagem' element={<Listagem />}></Route>
                <Route path='/orcamento/:id' element={<OrcamentoDetalhes />}></Route>
            </Routes>
    )
}

export default AppRoutes;