import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/tokens.css';
import './styles/base.css';
import App from './App';

createRoot(document.getElementById('racine')!).render(
  <StrictMode>
    {/* basename : '/anabus/' en ligne, '/' en local (voir vite.config.ts) */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
