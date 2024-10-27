import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { createRoutesFromElements, RouterProvider, Route } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login.jsx';
import AdminRoute from './pages/adminRoute/AdminRoute.jsx';
import HRDashboard from './pages/adminRoute/HRDashboard.jsx';
import Dashboard from './pages/Dashboard.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Dashboard/>}/>
      <Route path='' element={<AdminRoute/>}>
        <Route path='/dashboard' element={<HRDashboard/>} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
