import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LeafletMap from '../components/LeafletMap/Map';
import "leaflet/dist/leaflet.css";
import Home from '../pages/Home/Home.jsx';
import State from '../pages/State.jsx';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "map",
        element: <LeafletMap/>,
      },
      {
        path: "states/:stateName",
        element: <State/>,
      }
    ],
  },
]);