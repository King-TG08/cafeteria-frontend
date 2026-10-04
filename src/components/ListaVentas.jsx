import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EditarVenta from './EditarVenta';

function ListaVentas({ onAgregar }) {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);

  const cargarVentas = () => {
    setCargando(true);
    api.get('/ventas').then(res => setVentas(res.data)).finally(() => setCargando(false));
  };

  useEffect(() => { cargarVentas(); }, []);

  const eliminarVenta = (id) => {
    if (window.confirm('¿Anular este ticket?')) {
      api.delete(`/ventas/${id}`).then(() => cargarVentas());
    }
  };

  if (ventaSeleccionada) {
    return <EditarVenta venta={ventaSeleccionada} onUpdate={() => { cargarVentas(); setVentaSeleccionada(null); }} onCancel={() => setVentaSeleccionada(null)} />;
  }

  return (
    <div className="lista-recibos">
      <div className="controles">
        <h2>📋 Tickets Emitidos</h2>
        <button className="btn-sello" onClick={onAgregar}>+ Nueva Venta</button>
      </div>
      {cargando ? <p className="loading-text">Imprimiendo tickets...</p> : (
        <div className="mesa-recibos">
          {ventas.map((v) => (
            <div className="recibo" key={v.id}>
              <div className="recibo-header">
                <span>Ticket #{v.id}</span>
                <span className="sello-pagado">PAGADO</span>
              </div>
              <div className="recibo-linea"></div>
              <div className="recibo-datos">
                <p><strong>Cliente:</strong> {v.estudiante}</p>
                <p><strong>Producto:</strong> {v.producto}</p>
                <p><strong>Cant:</strong> {v.cantidad} x ${Number(v.precio).toFixed(2)}</p>
              </div>
              <div className="recibo-linea"></div>
              <div className="recibo-total">
                <span>TOTAL:</span>
                <strong>${Number(v.total).toFixed(2)}</strong>
              </div>
              <div className="recibo-fecha">{new Date(v.fecha).toLocaleDateString()}</div>
              <div className="recibo-acciones">
                <button className="btn-editar-vintage" onClick={() => setVentaSeleccionada(v)}>Corregir</button>
                <button className="btn-anular-vintage" onClick={() => eliminarVenta(v.id)}>Anular</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default ListaVentas;