import { obtenerSesion, cerrarSesion } from '../servicios/sesion.js'
import { obtenerPedidosPorVendedor } from '../servicios/compras.js' // AGREGADO POR CLAUDE
import { listarUsuarios } from '../servicios/usuarios.js' // AGREGADO POR CLAUDE
import productos from '../datos/productos.json' // AGREGADO POR CLAUDE
import { useNavigate } from 'react-router-dom'

function Vendedor() {
  const sesion = obtenerSesion()
  const navigate = useNavigate()
  // AGREGADO POR CLAUDE — carga las ventas del vendedor logueado desde localStorage
  const misVentas = sesion ? obtenerPedidosPorVendedor(sesion.id) : []
  // AGREGADO POR CLAUDE — clientes y productos para las tarjetas del panel
  const clientes = listarUsuarios().filter(u => u.rol === 'cliente')

  function handleCerrarSesion() {
    cerrarSesion()
    navigate('/login')
  } // fin handleCerrarSesion

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Panel Vendedor</h1>
          {sesion && (
            <p className="text-muted">Bienvenido, {sesion.nombre}</p>
          )}
        </div>
        <button
          className="btn btn-outline-danger"
          onClick={handleCerrarSesion}
        >
          Cerrar sesión
        </button>
      </div>

      <div className="row g-4">
        {/* AGREGADO POR CLAUDE — inventario con datos reales de productos.json */}
        <div className="col-12">
          <div className="card p-4">
            <h3>Inventario</h3>
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(producto => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>${producto.precio.toLocaleString('es-CL')}</td>
                    <td>{producto.stock === 0
                      ? <span className="badge text-bg-danger">Agotado</span>
                      : producto.stock}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* fin card inventario */}

        {/* AGREGADO POR CLAUDE — clientes filtrados por rol desde listarUsuarios() */}
        <div className="col-12">
          <div className="card p-4">
            <h3>Mis clientes</h3>
            {clientes.length === 0 ? (
              <p className="text-muted">No hay clientes registrados.</p>
            ) : (
              <table className="table table-striped mt-3">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map(cliente => (
                    <tr key={cliente.id}>
                      <td>{cliente.nombre}</td>
                      <td>{cliente.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {/* fin card clientes */}

        {/* AGREGADO POR CLAUDE — muestra las órdenes del vendedor logueado */}
        <div className="col-12">
          <div className="card p-4">
            <h3>Mis ventas</h3>
            {misVentas.length === 0 ? (
              <p className="text-muted">Aún no hay ventas registradas para tu cuenta.</p>
            ) : (
              <table className="table table-striped mt-3">
                <thead>
                  <tr>
                    <th>ID Pedido</th>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Entrega</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {misVentas.map(pedido => (
                    <tr key={pedido.id}>
                      <td>#{pedido.id}</td>
                      <td>{new Date(pedido.fecha).toLocaleDateString('es-CL')}</td>
                      <td>{pedido.cliente.nombre}</td>
                      <td>{pedido.entrega === 'domicilio' ? 'Despacho' : 'Retiro'}</td>
                      <td>${pedido.total.toLocaleString('es-CL')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {/* fin card ventas */}
      </div>
    </main>
  )
} // fin Vendedor

export default Vendedor