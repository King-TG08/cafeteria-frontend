import { useState } from 'react';
import ListaVentas from './components/ListaVentas';
import FormularioVenta from './components/FormularioVenta';
import './App.css';

function App() {
  const [vista, setVista] = useState('lista');
  return (
    <div className="app-vintage">
      <header className="pizarra">
        <h1>Cafetería El Rincón</h1>
        <p>~ Menú y Ventas del Día ~</p>
      </header>
      <main className="mesa">
        {vista === 'lista' && <ListaVentas onAgregar={() => setVista('formulario')} />}
        {vista === 'formulario' && <FormularioVenta onSaved={() => setVista('lista')} onCancel={() => setVista('lista')} />}
      </main>
      <footer className="suelo">
        <p>Gracias por su compra - Vuelva pronto</p>
      </footer>
    </div>
  );
}
export default App;