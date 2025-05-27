import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Tasks } from './pages/Tasks';
import { Info } from './pages/Info';
import {Services} from "./pages/Services.tsx";
import {Blog} from "./pages/Blog.tsx";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/info" element={<Info />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;