import {RouterProvider} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';

import './assets/styles/global.scss';
import {router} from './router';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
