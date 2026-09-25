import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EditarVenta from './EditarVenta';

function ListaVentas() {
  // 1. Estados de la aplicación
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  // 2. Funciones de carga e interacción con la API (Render/Axios)
  const cargarVentas = () => {
    api.get('/ventas')
      .then(res => setVentas(res.data))
      .catch(err => console.error('Error al obtener ventas:', err));
  };

  const eliminarVenta = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta venta?')) {
      api.delete(`/ventas/${id}`)
        .then(res => {
          alert(res.data.message);
          cargarVentas(); // Recarga la lista después de borrar
        })
        .catch(err => console.error('Error al eliminar venta:', err));
    }
  };

  // 3. Efectos de React
  useEffect(() => {
    cargarVentas();
  }, []);

  // 4. Renderizado del componente (Interfaz de usuario)
  return (
    <div>
      <h2>Ventas de la Cafetería</h2>
      
      <table border="1">
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id}>
              <td>{v.estudiante}</td>
              <td>{v.producto}</td>
              <td>{v.cantidad}</td>
              <td>\${v.precio}</td>
              <td>\${v.total}</td>
              <td>{v.fecha}</td>
              <td>
                <button onClick={() => setVentaSeleccionada(v)}>Editar</button>
                <button onClick={() => eliminarVenta(v.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario modal o condicional para editar */}
      {ventaSeleccionada && (
        <EditarVenta 
          venta={ventaSeleccionada} 
          onUpdate={() => {
            setVentaSeleccionada(null); // Cierra el formulario de edición
            cargarVentas();             // Refresca la tabla
          }} 
        />
      )}
    </div>
  );
}

export default ListaVentas;
