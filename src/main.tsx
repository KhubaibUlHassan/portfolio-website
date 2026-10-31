import '@fontsource-variable/inter'
import '@fontsource-variable/space-grotesk'
import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { applyTheme, resolveTheme } from './hooks/useTheme'

applyTheme(resolveTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
