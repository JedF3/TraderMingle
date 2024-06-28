import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
  const { user } = useAuthContext();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="settings"
          element={user ? <Settings /> : <Navigate to="/settings" />}
        />
        <Route
          path="login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

// references: 
// static navigation logic: https://www.youtube.com/watch?v=LDB4uaJ87e0&t=4681s
// modification: https://chatgpt.com/share/3e6b1017-4213-481f-9a6c-52999d2cf484