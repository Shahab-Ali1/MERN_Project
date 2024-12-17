import React from 'react'
import './App.scss';
import AppRoutes from './Routes/AppRoutes';
import Layout from './Components/Layout/Layout';
import AuthRoutes from './Routes/AuthRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : "";
  return (
    <React.Fragment>
      {token ? (
        <Layout>
          <AppRoutes />
        </Layout>
      ) : (
        <AuthRoutes />
      )}

      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
