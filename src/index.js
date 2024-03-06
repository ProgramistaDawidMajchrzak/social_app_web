import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  BrowserRouter
} from 'react-router-dom'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//   },
//   {
//     path: "/auth",
//     element: <Login />,
//     children: [
//       {
//         path: "/auth/register",
//         element: <Register />,
//       },
//     ],
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> <App /></BrowserRouter>
  </React.StrictMode>
);
