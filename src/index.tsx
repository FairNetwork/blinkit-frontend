import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import SidebarProvider from './components/shared/sidebar/SidebarProvider';

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <SidebarProvider>
                    <App />
                </SidebarProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
