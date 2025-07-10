import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MainNavigation } from './navigation/main-navigation.tsx';

import './index.css';

const root = document.getElementById('root');

if (root) {
   createRoot(root).render(
      <StrictMode>
         <MainNavigation />
      </StrictMode>,
   );
}
