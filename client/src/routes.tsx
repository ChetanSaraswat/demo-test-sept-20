import { Navigate, useRoutes, RouteObject } from "react-router-dom";
import AppLayout from './layout/sidebarLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';

import SignUp from './pages/SignUp/SignUp';
import BaseLayout from './layout/baseLayout';
import Login from "./pages/Login/Login";
import { useAppSelector } from "./hooks";
import { RootState } from "./store/store";
import DashboardAdmin from "./pages/Dashboard/DashboardAdmin";
import DashboardUser from "./pages/Dashboard/DashboardUser";

function Routes() {
  const isLogined = useAppSelector((state:RootState)=>state.auth?.logged) ;
  const user = useAppSelector((state:RootState)=> state.auth.user)
  const getDashboardComponent = () => {
    switch (user && user.role) {
      case 'ADMIN':
        return <DashboardAdmin />;
      case 'CUSTOMER':
        return <DashboardUser/>;
        case 'RESTAURANT':
          return <Dashboard/>;
      // Add more roles and dashboards as needed
      default:
        return <Navigate to="/auth/login" />; // If the role is invalid or undefined, redirect to login
    }
  };


  const routes: RouteObject[] = [
    {
      path: 'auth',
      element: isLogined ? <Navigate to={'/'} /> : <BaseLayout />,
      children: [
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'signup',
          element: <SignUp />
        }
      ]
    },
    {
      path: '/',
      element: isLogined ? <AppLayout /> : <Navigate to='/auth/login' />,
      children: [
        {
          path: '/',
          element: getDashboardComponent()
        },
        {
          path: 'profile',
          element: <Profile />
        }
      ]
    }
  ];

  return routes;
}

export default Routes;
