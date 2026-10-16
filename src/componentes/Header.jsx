import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <header className="site-header border-bottom bg-white">
      <nav className="navbar navbar-expand-lg container">
        <NavLink className="navbar-brand fw-bold text-success" to="/" onClick={cerrarMenu}>
          🐾 PawPets
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir o cerrar menú"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`}>
          <div className="navbar-nav ms-auto gap-lg-2">
            <NavLink className="nav-link" to="/" end onClick={cerrarMenu}>Inicio</NavLink>
            <NavLink className="nav-link" to="/login" onClick={cerrarMenu}>Ingresar</NavLink>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header