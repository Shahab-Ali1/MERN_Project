import React, { useEffect } from 'react'
import './App.scss';
import AppRoutes from './Routes/AppRoutes';
import Layout from './Components/Layout/Layout';
import AuthRoutes from './Routes/AuthRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { userInfo } from './Utils/Functions/Functions';

function App() {
  const { token } = userInfo();
  const { LoggedInUser } = useSelector(state => state.Auth);
  const isAuthorized = LoggedInUser?.accessToken || token;
  return (
    <React.Fragment>
      {isAuthorized ? (
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
