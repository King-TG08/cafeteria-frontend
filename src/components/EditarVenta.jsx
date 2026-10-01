import React, { useEffect, useState } from 'react';
import { api } from '../api';

function EditarVenta({ venta, onUpdate }) {
  const [formData, setFormData] = useState(() => ({
    estudiante_id: venta?.estudiante_id ?? '',
    producto_id: venta?.producto_id ?? '',
    cantidad: venta?.cantidad ?? '',
    fecha: venta?.fecha ? new Date(venta.fecha).toISOString().split('T')[0] : '',
  }));

  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get('/estudiantes')
      .then((res) => setEstudiantes(res.data))
      .catch((err) => console.error('Error al obtener estudiantes:', err));

    api.get('/productos')
      .then((res) => setProductos(res.data))
      .catch((err) => console.error('Error al obtener productos:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.put(`/ventas/${venta.id}`, formData)
      .then((res) => {
        alert(res.data.message);
        onUpdate?.();
      })
      .catch((err) => console.error('Error al actualizar venta:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Editar Venta</h3>
      <select name="estudiante_id" value={formData.estudiante_id} onChange={handleChange} required>
        <option value="">Seleccione estudiante</option>
        {estudiantes.map((estudiante) => (
          <option key={estudiante.id} value={estudiante.id}>
            {estudiante.nombre} - {estudiante.grupo}
          </option>
        ))}
      </select>

      <select name="producto_id" value={formData.producto_id} onChange={handleChange} required>
        <option value="">Seleccione producto</option>
        {productos.map((producto) => (
          <option key={producto.id} value={producto.id}>
            {producto.nombre} - ${producto.precio}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="cantidad"
        value={formData.cantidad}
        onChange={handleChange}
        required
      />
      <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
      <button type="submit">Actualizar Venta</button>
    </form>
  );
}

export default EditarVenta;