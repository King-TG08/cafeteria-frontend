import { useState } from 'react';
import FormularioVenta from './components/FormularioVenta';
import ListaVentas from './components/ListaVentas';

function App() {
  // Contador que se incrementa cada vez que se registra una venta.
  // Al cambiar, ListaVentas vuelve a pedir los datos al servidor.
  const [ventasVersion, setVentasVersion] = useState(0);
  const handleVentaCreada = () => setVentasVersion((v) => v + 1);

  return (
    <>
      <header>
        <h1>Cafetería escolar</h1>
      </header>

      <main>
        <section aria-label="Registrar venta">
          <FormularioVenta onCreated={handleVentaCreada} />
        </section>

        <ListaVentas refreshKey={ventasVersion} />
      </main>
    </>
  );
}

export default App;