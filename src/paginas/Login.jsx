import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [formulario, setFormulario] = useState({
    email: '',
    password: '',
    rol: ''
  }) // fin estado formulario

  const [errores, setErrores] = useState({}) // fin estado errores
  const [mensaje, setMensaje] = useState('') // fin estado mensaje

  function cambiarCampo(evento) {
    const { name, value } = evento.target
    setFormulario(anterior => ({
      ...anterior,
      [name]: value
    }))
  } // fin cambiarCampo

  function validar() {
    const nuevosErrores = {}

    if (!formulario.rol) {
      nuevosErrores.rol = 'Seleccione un rol.'
    } // fin validacion rol

    if (!formulario.email) {
      nuevosErrores.email = 'El correo es obligatorio.'
    } // fin validacion email

    if (formulario.password.length < 4 || formulario.password.length > 10) {
      nuevosErrores.password = 'La contraseña debe tener entre 4 y 10 caracteres.'
    } // fin validacion password

    return nuevosErrores
  } // fin validar

  function handleSubmit(evento) {
    evento.preventDefault()
    const erroresEncontrados = validar()

    if (Object.keys(erroresEncontrados).length > 0) {
      setErrores(erroresEncontrados)
      return
    } // fin if errores

    setErrores({})
    setMensaje('Inicio de sesión exitoso.')
  } // fin handleSubmit

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">

          <h1 className="mb-4">Ingresar a PawPets</h1>

          {mensaje && (
            <div className="alert alert-success">{mensaje}</div>
          )}

          <form onSubmit={handleSubmit} noValidate>

            <div className="mb-3">
              <label htmlFor="rol" className="form-label">Rol</label>
              <select
                id="rol"
                name="rol"
                className="form-select"
                value={formulario.rol}
                onChange={cambiarCampo}
              >
                <option value="">Seleccione un rol</option>
                <option value="cliente">Cliente</option>
                <option value="vendedor">Vendedor</option>
                <option value="administrador">Administrador</option>
              </select>
              {errores.rol && (
                <div className="text-danger small">{errores.rol}</div>
              )}
            </div>
            {/* fin campo rol */}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                value={formulario.email}
                onChange={cambiarCampo}
                placeholder="nombre@correo.com"
              />
              {errores.email && (
                <div className="text-danger small">{errores.email}</div>
              )}
            </div>
            {/* fin campo email */}

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                value={formulario.password}
                onChange={cambiarCampo}
              />
              {errores.password && (
                <div className="text-danger small">{errores.password}</div>
              )}
            </div>
            {/* fin campo password */}

            <button type="submit" className="btn btn-success w-100">
              Ingresar
            </button>

          </form>
          {/* fin form */}

          <p className="mt-3 text-center">
            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          </p>

        </div>
      </div>
    </main>
  )
} // fin Login

export default Login