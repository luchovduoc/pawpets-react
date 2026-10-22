import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './componentes/Header.jsx'
import Footer from './componentes/Footer.jsx'
import Inicio from './paginas/Inicio.jsx'
import Login from './paginas/Login.jsx'
import Registro from './paginas/Registro.jsx'
import Contacto from './paginas/Contacto.jsx'
import Nosotros from './paginas/Nosotros.jsx'
import Vendedor from './paginas/Vendedor.jsx'
import Perfil from './paginas/Perfil.jsx'
import Blog from './paginas/Blog.jsx'
import BlogCalor from './paginas/BlogCalor.jsx'
import BlogVacunas from './paginas/BlogVacunas.jsx'
import Catalogo from './paginas/Catalogo.jsx'
import DetalleProducto from './paginas/DetalleProducto.jsx'
import Carrito from './paginas/Carrito.jsx'
import Checkout from './paginas/Checkout.jsx'
import ResultadoCompra from './paginas/ResultadoCompra.jsx'
import AdminUsuarios from './paginas/AdminUsuarios.jsx'
import AdminProductos from './paginas/AdminProductos.jsx'
import AdminCategorias from './paginas/AdminCategorias.jsx'
import AdminReportes from './paginas/AdminReportes.jsx'
import productos from './datos/productos.json'
import categorias from './datos/categorias.json'
import { confirmarCompra } from './servicios/compras.js'
import { obtenerSesion } from './servicios/sesion.js'

function App() {
  // AGREGADO POR CLAUDE — estado del carrito y del último pedido confirmado
  const [carrito, setCarrito] = useState([])
  const [pedidoActual, setPedidoActual] = useState(null)

  // AGREGADO POR CLAUDE — agrega o incrementa un producto en el carrito
  function agregarAlCarrito(productoId) {
    setCarrito(prev => {
      const existe = prev.find(i => i.productoId === productoId)
      if (existe) return prev.map(i => i.productoId === productoId ? { ...i, cantidad: i.cantidad + 1 } : i)
      return [...prev, { productoId, cantidad: 1 }]
    })
  }

  // AGREGADO POR CLAUDE — handler que confirma la compra, guarda el pedido y vacía el carrito
  function handleConfirmar(cliente, usuarioId) {
    const pedido = confirmarCompra(carrito, cliente, productos, usuarioId)
    setPedidoActual(pedido)
    setCarrito([])
    return pedido
  }

  const sesion = obtenerSesion() // AGREGADO POR CLAUDE — para pasar datos del usuario al Checkout

  return (
    <BrowserRouter>
      <Header cantidadCarrito={carrito.length} />
      <div className="contenido-principal">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/vendedor" element={<Vendedor />} />
          <Route path="/admin/usuarios" element={<AdminUsuarios />} />
          <Route path="/perfil" element={<Perfil />} />
          {/* AGREGADO POR CLAUDE — rutas de contenido */}
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/calor" element={<BlogCalor />} />
          <Route path="/blog/vacunas" element={<BlogVacunas />} />
          {/* AGREGADO POR CLAUDE — rutas del flujo de compra */}
          <Route path="/productos" element={<Catalogo productos={productos} onAgregar={agregarAlCarrito} />} />
          <Route path="/productos/:id" element={<DetalleProducto productos={productos} onAgregar={agregarAlCarrito} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} productos={productos} onActualizar={setCarrito} />} />
          <Route path="/checkout" element={<Checkout carrito={carrito} productos={productos} onConfirmar={handleConfirmar} usuario={sesion} />} />
          <Route path="/compra/exito/:id" element={<ResultadoCompra pedido={pedidoActual} />} />
          <Route path="/compra/error" element={<ResultadoCompra fallido />} />
          {/* AGREGADO POR CLAUDE — rutas de administración con props */}
          <Route path="/admin/productos" element={<AdminProductos productos={productos} categorias={categorias} />} />
          <Route path="/admin/categorias" element={<AdminCategorias categorias={categorias} productos={productos} />} />
          <Route path="/admin/reportes" element={<AdminReportes productos={productos} />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
} // fin App

export default App