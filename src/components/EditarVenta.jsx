import React, { useState, useEffect } from 'react';
import { api } from '../api';

function EditarVenta({ venta, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({ estudiante_id: venta.estudiante_id, producto_id: venta.producto_id, cantidad: venta.cantidad, fecha: venta.fecha.split('T')[0] });
  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get('/estudiantes').then(res => setEstudiantes(res.data));
    api.get('/productos').then(res => setProductos(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/ventas/${venta.id}`, {
      estudiante_id: Number(formData.estudiante_id), producto_id: Number(formData.producto_id),
      cantidad: Number(formData.cantidad), fecha: formData.fecha
    }).then(() => { alert('✅ Ticket corregido'); onUpdate(); });
  };

  return (
    <div className="libreta">
      <h2>✍️ Corregir Ticket #{venta.id}</h2>
      <form onSubmit={handleSubmit} className="form-libreta">
        <label>Cliente:
          <select name="estudiante_id" value={formData.estudiante_id} onChange={(e) => setFormData({...formData, estudiante_id: e.target.value})} required>
            {estudiantes.map(e => <option key={e.id} value={e.id}>{e.nombre} ({e.grupo})</option>)}
          </select>
        </label>
        <label>Producto:
          <select name="producto_id" value={formData.producto_id} onChange={(e) => setFormData({...formData, producto_id: e.target.value})} required>
            {productos.map(p => <option key={p.id} value={p.id}>{p.nombre} (${p.precio})</option>)}
          </select>
        </label>
        <label>Cantidad:
          <input type="number" name="cantidad" min="1" value={formData.cantidad} onChange={(e) => setFormData({...formData, cantidad: e.target.value})} required />
        </label>
        <label>Fecha:
          <input type="date" name="fecha" value={formData.fecha} onChange={(e) => setFormData({...formData, fecha: e.target.value})} required />
        </label>
        <div className="libreta-acciones">
          <button type="button" className="btn-cancelar-vintage" onClick={onCancel}>Cancelar</button>
          <button type="submit" className="btn-sello">Guardar</button>
        </div>
      </form>
    </div>
  );
}
export default EditarVenta;