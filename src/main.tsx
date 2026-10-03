import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initSecurityShield } from './lib/securityShield';

// Initialize production anti-inspection, right-click disabling, and DevTools locking
initSecurityShield();

createRoot(document.getElementById('root')!).render(<App />);
