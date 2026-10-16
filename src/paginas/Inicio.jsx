import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <main>
      <section className="bg-success text-white py-5">
        <div className="container">
          <p className="fw-bold text-warning">TODO PARA QUIENES MÁS QUIERES</p>
          <h1>Cuidado real para patas felices.</h1>
          <p>Alimentos, juegos y bienestar para acompañar cada etapa de su vida.</p>
          <Link className="btn btn-warning fw-bold" to="/productos">
            Ver productos
          </Link>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="mb-4">Áreas del sistema</h2>
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="card h-100 p-4">
              <h3>Cliente</h3>
              <p>Explora productos y usa el carrito de compras.</p>
              <Link className="btn btn-success" to="/productos">Ver tienda</Link>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card h-100 p-4">
              <h3>Vendedor</h3>
              <p>Consulta inventario y ventas.</p>
              <Link className="btn btn-success" to="/vendedor">Ver panel</Link>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card h-100 p-4">
              <h3>Administrador</h3>
              <p>Administra productos, usuarios y reportes.</p>
              <Link className="btn btn-success" to="/admin/productos">Ver panel</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Inicio