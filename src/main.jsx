import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import App from './App.jsx'
import { initVistaEscritorio } from './utils/vistaEscritorio.js'
import './index.css'

// Aplica la preferencia "Vista de escritorio" (CH-10) antes del primer
// render para evitar parpadeo entre layouts.
initVistaEscritorio()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
