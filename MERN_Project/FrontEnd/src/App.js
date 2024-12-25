import React, { useEffect } from 'react'
import './App.scss';
import AppRoutes from './Routes/AppRoutes';
import Layout from './Components/Layout/Layout';
import AuthRoutes from './Routes/AuthRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

function App() {
  const { LoggedInUser } = useSelector(state => state.Auth);
  const token = LoggedInUser?.accessToken || "";
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
