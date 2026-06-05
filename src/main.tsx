import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CmsProvider } from './cms/CmsProvider';
import { DesignModeProvider } from './design/DesignModeProvider';
import './index.css';
import './cms/sitebuilder/themes.css';
import './cms/sitebuilder/blocks/variant-styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DesignModeProvider>
      <CmsProvider>
        <App />
      </CmsProvider>
    </DesignModeProvider>
  </React.StrictMode>,
);
