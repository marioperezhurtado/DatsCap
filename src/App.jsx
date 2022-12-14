import { Routes, Route } from 'react-router-dom'

import { AuthProvider } from './contexts/AuthContext'
import { DbProvider } from './contexts/DbContext'

import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import AuthRoute from './components/AuthRoute/AuthRoute'

import Home from './pages/Home/Home'
import Cap from './pages/Cap/Cap'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import Account from './pages/Account/Account'
import CompleteAccount from './pages/CompleteAccount/CompleteAccount'
import NotFound from './pages/NotFound/NotFound'

import Footer from './layout/Footer/Footer'

export default function App() {
  return (
    <AuthProvider>
      <DbProvider>
        <div className="box-border flex flex-col min-h-screen bg-neutral-800 text-slate-300">
          <div className="relative flex-grow">
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
                path="/cap/:id"
                element={
                  <PrivateRoute>
                    <Cap />
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
              <Route
                path="/account"
                element={
                  <PrivateRoute>
                    <Account />
                  </PrivateRoute>
                }
              />
              <Route
                path="/complete-your-account"
                element={<CompleteAccount />}
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </DbProvider>
    </AuthProvider>
  )
}
