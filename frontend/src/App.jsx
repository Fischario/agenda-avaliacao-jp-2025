import './App.css'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

import Clientes from './pages/Clientes'
import CreateCliente from './pages/Clientes/create'
import UpdateCliente from './pages/Clientes/update'

import Atendimentos from './pages/Atendimentos'
import TodosAtendimentos from './pages/TodosAtendimentos'
import CreateAtendimento from './pages/Atendimentos/create'
import UpdateAtendimento from './pages/Atendimentos/update'

import { AuthProvider } from './auth/Context'

import PrivateRoute from './router/PrivateRoute'

import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <AuthProvider>

      <Header />

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<PrivateRoute />}>
          <Route path='/clientes' element={<Clientes />} />
          <Route path='/update/cliente' element={<UpdateCliente />} />
          <Route path='/create/cliente' element={<CreateCliente />} />

          
          <Route path='/todosatendimentos' element={<TodosAtendimentos />} />
          <Route path='/atendimentos' element={<Atendimentos />} />
          <Route path='/update/atendimento' element={<UpdateAtendimento />} />
          <Route path='/create/atendimento' element={<CreateAtendimento />} />
        </Route>

      </Routes>

      <Footer />
      
    </AuthProvider>
  )
}

export default App