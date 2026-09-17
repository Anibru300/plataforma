// Toggle "Vista de escritorio" (CH-10 Opción A).
// Fija el meta viewport a 1024px para que el navegador renderice el layout
// de escritorio escalado (equivale al "sitio para computadora" del menú del
// navegador, con zoom por pinza porque NO se fija maximum-scale).
// Persistente por dispositivo en localStorage; por defecto apagado (móvil).

const KEY = 'p3-vista-escritorio';
const DEFAULT_CONTENT = 'width=device-width, initial-scale=1.0';
const ESCRITORIO_CONTENT = 'width=1024';

let originalContent = null;

export function esVistaEscritorio() {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

function aplicar(activa) {
  const meta = document.querySelector('meta[name="viewport"]');
  if (!meta) return;
  if (originalContent === null) originalContent = meta.getAttribute('content') || DEFAULT_CONTENT;
  meta.setAttribute('content', activa ? ESCRITORIO_CONTENT : originalContent);
}

export function setVistaEscritorio(activa) {
  try {
    localStorage.setItem(KEY, activa ? '1' : '0');
  } catch {
    // localStorage bloqueado: el toggle vive solo en la sesión.
  }
  aplicar(activa);
}

export function initVistaEscritorio() {
  aplicar(esVistaEscritorio());
}

// Ancho físico de pantalla (screen.width NO cambia con el meta viewport,
// a diferencia de matchMedia / innerWidth). Sirve para mostrar el toggle
// solo en dispositivos chicos, aunque la vista escritorio esté activa.
export function esPantallaChica() {
  return typeof window !== 'undefined' && window.screen.width < 1024;
}
