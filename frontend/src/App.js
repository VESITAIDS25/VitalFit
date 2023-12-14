import "./App.css";
import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import PageNotFound from "./components/PageNotFound";
import Home from "./pages/Home";
import PrivateRoute from "./components/auth/PrivateRoute";
import Loader from './common/Loader';
import routes from './routes';
import ECommerce from './pages/Dashboard/ECommerce';
import Login from "./pages/auth/Login";
const DefaultLayout = lazy(() => import('./components/Layout'))

function App() {

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);


  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<PrivateRoute />}>
      <Route path = "" element={<DefaultLayout />}>
          <Route index element={<ECommerce />} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
          </Route>
        </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
