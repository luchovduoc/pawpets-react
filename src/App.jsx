import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './componentes/Header.jsx'
import Footer from './componentes/Footer.jsx'
import Inicio from './paginas/Inicio.jsx'
import Login from './paginas/Login.jsx'
import Registro from './paginas/Registro.jsx'
import Contacto from './paginas/Contacto.jsx'
import Vendedor from './paginas/Vendedor.jsx'
import AdminUsuarios from './paginas/AdminUsuarios.jsx'
import Perfil from './paginas/Perfil.jsx'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="contenido-principal">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/vendedor" element={<Vendedor />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
} // fin App

export default App