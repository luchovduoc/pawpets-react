import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom' // AGREGADO POR CLAUDE — useNavigate para cerrar sesión
import { obtenerSesion, cerrarSesion } from '../servicios/sesion.js' // AGREGADO POR CLAUDE
import '../estilos/header.css'

function Header({ cantidadCarrito = 0 }) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const navigate = useNavigate() // AGREGADO POR CLAUDE

  // AGREGADO POR CLAUDE — se llama en cada render para leer la sesión actual
  const sesion = obtenerSesion()

  const cerrarMenu = () => setMenuAbierto(false)

  // AGREGADO POR CLAUDE — cierra sesión y redirige al login
  function handleCerrarSesion() {
    cerrarSesion()
    cerrarMenu()
    navigate('/login')
  }

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg" aria-label="Navegación principal">
        <div className="container">
          <NavLink className="brand navbar-brand" to="/" onClick={cerrarMenu}>
            🐾 <span>PawPets</span>
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            aria-label="Abrir o cerrar menú"
            aria-expanded={menuAbierto}
            aria-controls="menu-pawpets"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            id="menu-pawpets"
            className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`}
          >
            <div className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
              <NavLink className="nav-link" to="/" end onClick={cerrarMenu}>Inicio</NavLink>
              <NavLink className="nav-link" to="/productos" onClick={cerrarMenu}>Productos</NavLink>
              <NavLink className="nav-link" to="/nosotros" onClick={cerrarMenu}>Nosotros</NavLink>
              <NavLink className="nav-link" to="/blog" onClick={cerrarMenu}>Blog</NavLink>
              <NavLink className="nav-link" to="/contacto" onClick={cerrarMenu}>Contacto</NavLink>
              <NavLink className="nav-link" to="/vendedor" onClick={cerrarMenu}>Vendedor</NavLink>
              <NavLink className="nav-link" to="/admin/productos" onClick={cerrarMenu}>Administrador</NavLink>
              {/* AGREGADO POR CLAUDE — muestra Mi perfil y Cerrar sesión si hay sesión activa */}
              {sesion ? (
                <>
                  <NavLink className="nav-link" to="/perfil" onClick={cerrarMenu}>Mi perfil</NavLink>
                  <button className="btn btn-link nav-link p-0" onClick={handleCerrarSesion}>Cerrar sesión</button>
                </>
              ) : (
                <NavLink className="nav-link" to="/login" onClick={cerrarMenu}>Ingresar</NavLink>
              )}
              <NavLink className="cart-button" to="/carrito" onClick={cerrarMenu}>
                🛒 Carrito <b>{cantidadCarrito}</b>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
