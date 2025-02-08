import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import './App.css';
import SignUpPage from './sign-up';
import Home from './pages/home/home';
import SignInPage from "./Signin"
import Dashboard from './pages/dashboard/dashboard';
import AddDashboard from './pages/dashboard/Add';
import DnDFlowWrapper from './components/workflow/workflow';
import Google_int from './components/api_int/google_int';
// import Workflow from './workflow';
function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}
function RedirectAfterSignIn() {
  const navigate = useNavigate();
  navigate('/dashboard');
  return null;
}

function App() {
  return (
      <Router>
        <SignedOut>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="*" element={<Navigate to="/sign-in" />} />
          </Routes>
        </SignedOut>

        <SignedIn>
          <RedirectAfterSignIn />
          <Routes>
            <Route path="/google_int" element={<Google_int/>} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<>hello</>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/dashboard/add" element={<AddDashboard/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SignedIn>
      </Router>
  );
}

export default App;
