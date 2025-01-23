import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LeafletMap from '../components/LeafletMap/Map';
import "leaflet/dist/leaflet.css";
import Home from '../pages/Home/Home.jsx';
import State from '../pages/State.jsx';
import ContractOpportunities from '../pages/ContractOpportunities.jsx';
import CommunityOpportunities from '../pages/CommunityOpportunities.jsx';
import Resources from '../pages/Resources.jsx';
import About from '../pages/About.jsx';
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
      },
      {
        path: "contracts",
        element: <ContractOpportunities/>,
      },
      {
        path: "community",
        element: <CommunityOpportunities/>,
      },
      {
        path: "resources",
        element: <Resources/>,
      },
      {
        path: "about",
        element: <About/>,
      }
    ],
  },
]);
