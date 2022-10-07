import Signup from './authentication/Signup';
import Profile from './authentication/Profile';
import Login from './authentication/Login';
import ForgotPassword from './authentication/ForgotPassword';
import UpdateProfile from './authentication/UpdateProfile';
import PrivateRoute from './authentication/PrivateRoute';
import { AuthProvider } from '../contexts/Context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './google-drive/Dashboard';
import LandingPage from './authentication/LandingPage';
import QuickAccess from './google-drive/QuickAccess';
import Favorites from './google-drive/Favorites';
import PublicRoute from './authentication/PublicRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/">
            <Route index element={<LandingPage />} />
            <Route
              path="signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="forgot-password"
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              }
            />

            {/* Drive */}
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="quick-access"
              element={
                <PrivateRoute>
                  <QuickAccess />
                </PrivateRoute>
              }
            />
            <Route
              path="favorites"
              element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route
              path="private-files"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/folder/:folderId"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="update-profile"
              element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
