import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
// import FullLayout from '../layouts/full/FullLayout';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/MultiStepForm')));
const ViewClients = Loadable(lazy(() => import('../views/dashboard/ViewClients')));
const Viewmedia = Loadable(lazy(() => import ('../views/dashboard/viewmedia')));
const ClientMedia = Loadable(lazy(() => import('../views/dashboard/ClientMedia')));

// authentication
// const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance')));

// landingpage
// const Landingpage = Loadable(lazy(() => import('../views/pages/landingpage/Landingpage')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard/service" /> },
      { path: '/dashboard/service', exact: true, element: <ModernDash />  },
      { path: '/dashboard/servicehistory', exact: true, element: <ViewClients /> },
      { path: '/dashboard/viewmedia', exact: true, element: <Viewmedia /> },
      { path: '/dashboard/client-media/:clientId', exact: true, element: <ClientMedia /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/maintenance', element: <Maintenance /> },
      // { path: '/admin/login', element: <Login /> },
      // { path: '/landingpage', element: <Landingpage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;


