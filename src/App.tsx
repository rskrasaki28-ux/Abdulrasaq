import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortfolioPage from './pages/PortfolioPage';
import VelorahPage from './pages/VelorahPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/velorah" element={<VelorahPage />} />
      </Routes>
    </BrowserRouter>
  );
}
