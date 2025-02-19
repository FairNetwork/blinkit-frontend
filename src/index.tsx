import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import SidebarProvider from './components/shared/sidebar/SidebarProvider';
import { PDFProvider } from './components/pdf-context/PdfContext';

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <PDFProvider>
                <SidebarProvider>
                    <App />
                </SidebarProvider>
            </PDFProvider>
        </BrowserRouter>
    </React.StrictMode>
);
