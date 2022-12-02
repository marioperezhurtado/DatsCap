import { Routes, Route } from 'react-router-dom'

import { AuthProvider } from './contexts/AuthContext'
import { DbProvider } from './contexts/DbContext'

import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import AuthRoute from './components/AuthRoute/AuthRoute'

import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import NotFound from './pages/NotFound/NotFound'

export default function App() {
  return (
    <AuthProvider>
      <DbProvider>
        <div className="box-border min-h-screen bg-neutral-800 text-slate-300">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </DbProvider>
      <div className="box-border min-h-screen bg-neutral-800 text-slate-300">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignUp />
              </AuthRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SignIn />
              </AuthRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}
