import { obtenerLineas, calcularTotal } from './carrito.js'
import { regionesCompra } from '../datos/regionesCompra.js'

// AGREGADO POR CLAUDE — clave para guardar pedidos en localStorage
const CLAVE_PEDIDOS = 'pawpets_pedidos'

// AGREGADO POR CLAUDE — guarda un pedido en el historial local
export function guardarPedido(pedido) {
  const anteriores = obtenerTodosLosPedidos()
  anteriores.push(pedido)
  localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(anteriores))
}

// AGREGADO POR CLAUDE — devuelve todos los pedidos guardados
export function obtenerTodosLosPedidos() {
  const datos = localStorage.getItem(CLAVE_PEDIDOS)
  return datos ? JSON.parse(datos) : []
}

// AGREGADO POR CLAUDE — filtra pedidos por vendedor (usuarioId)
export function obtenerPedidosPorVendedor(vendedorId) {
  return obtenerTodosLosPedidos().filter(p => p.usuarioId === vendedorId)
}

export function validarCliente(cliente) {
  if (!cliente.nombre.trim()) return 'Ingresa el nombre del cliente.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cliente.email.trim())) {
    return 'Ingresa un correo válido.'
  }
  if (!['domicilio', 'retiro'].includes(cliente.entrega)) return 'Selecciona una opción de entrega.'
  if (cliente.entrega === 'domicilio') {
    if (!cliente.direccion.trim()) return 'Ingresa la dirección de entrega.'
    if (!regionesCompra[cliente.region]?.includes(cliente.comuna)) {
      return 'Selecciona una región y comuna válidas.'
    }
  }
  return ''
}

export function validarCarritoCompra(carrito, productos) {
  if (carrito.length === 0) throw new Error('El carrito está vacío.')
  const lineas = obtenerLineas(carrito, productos)
  for (const linea of lineas) {
    if (!linea.disponible) throw new Error('Hay un producto que ya no está disponible. Retíralo del carrito.')
    if (!Number.isInteger(linea.cantidad) || linea.cantidad < 1 || linea.cantidad > linea.stock) {
      throw new Error('Revisa la cantidad de ' + linea.nombre + ': no hay stock suficiente.')
    }
  }
  return lineas
}

// Solo construye el resumen simulado; no escribe datos ni modifica el catálogo.
export function confirmarCompra(carrito, cliente, productos, usuarioId = null) {
  const error = validarCliente(cliente)
  if (error) throw new Error(error)

  const lineas = validarCarritoCompra(carrito, productos)
  const pedido = {
    id: Date.now(),
    usuarioId,
    cliente: { nombre: cliente.nombre.trim(), email: cliente.email.trim() },
    direccion: cliente.entrega === 'domicilio'
      ? { calle: cliente.direccion.trim(), region: cliente.region, comuna: cliente.comuna }
      : null,
    entrega: cliente.entrega,
    fecha: new Date().toISOString(),
    // Copia de los datos recibidos para mostrar el resultado de esta compra.
    productos: lineas.map(linea => ({
      productoId: linea.productoId,
      nombre: linea.nombre,
      cantidad: linea.cantidad,
      precio: linea.precio,
      subtotal: linea.subtotal
    })),
    total: calcularTotal(lineas)
  }
  guardarPedido(pedido) // AGREGADO POR CLAUDE — persiste el pedido en localStorage al confirmar
  return pedido
}
