import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { ThemeContextProvider } from './Context/ThemeContext.jsx'
import { LangContextProvider } from './Context/LangContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LangContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </LangContextProvider>
    
  </BrowserRouter>
)