import { useEffect, useState } from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import {
  esPantallaChica,
  esVistaEscritorio,
  initVistaEscritorio,
  setVistaEscritorio,
} from '../../utils/vistaEscritorio.js';

// Toggle "Vista de escritorio" (CH-10 Opción A): solo en pantallas chicas
// (screen.width, inmune al meta viewport). Con la vista activa el navegador
// pinta el layout de escritorio escalado; el botón sigue visible para poder
// volver a modo móvil.
export default function VistaEscritorioToggle() {
  const [activa, setActiva] = useState(esVistaEscritorio());

  useEffect(() => {
    initVistaEscritorio();
  }, []);

  if (!esPantallaChica()) return null;

  const alternar = () => {
    const nuevo = !activa;
    setVistaEscritorio(nuevo);
    setActiva(nuevo);
  };

  return (
    <button
      onClick={alternar}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-p3-red hover:bg-red-50 rounded-lg transition-colors"
      title={activa ? 'Volver a la vista móvil' : 'Ver como en computadora (todo el panorama)'}
    >
      {activa ? <Smartphone size={18} /> : <Monitor size={18} />}
      <span className="hidden sm:inline">{activa ? 'Vista móvil' : 'Vista escritorio'}</span>
    </button>
  );
}
