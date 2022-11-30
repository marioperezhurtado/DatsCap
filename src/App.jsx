import { Routes, Route } from 'react-router-dom'

import { AuthProvider } from './contexts/AuthContext'

import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import NotFound from './pages/NotFound/NotFound'

export default function App() {
  return (
    <AuthProvider>
      <div className="box-border min-h-screen bg-neutral-800 text-slate-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}
