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
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ListingScreen from './pages/ListingScreen';
import AddListing from './pages/AddListing';
import { useState } from 'react';
import searchTermContext from './context/searchTermContext';
import ViewListing from './pages/ViewListing';

function App() {
  const { user } = useAuthContext();
  let [searchTerm, setSearchTerm] = useState('');
  const search = { searchTerm, setSearchTerm };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={user ? <ListingScreen /> : <Navigate to="/login" />}
        />
        <Route
          path="profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="settings"
          element={user ? <Settings /> : <Navigate to="/settings" />}
        />
        <Route path="login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route
          path="signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/search/"
          element={<ListingScreen />}
        />
        <Route
          path="/addListing"
          element={<AddListing />}
        />
        <Route
          path="/editListing/:id"
          element={<AddListing />}
        />
        <Route
          path="/viewListing/:id"
          element={<ViewListing />}
        />
      </Route>
    )
  );

  return (
    <div className="App">
      <searchTermContext.Provider value={search}>
        <RouterProvider router={router} />
      </searchTermContext.Provider>
    </div>
  );
}

export default App;

// references:
// static navigation logic: https://www.youtube.com/watch?v=LDB4uaJ87e0&t=4681s
// modification: https://chatgpt.com/share/3e6b1017-4213-481f-9a6c-52999d2cf484
