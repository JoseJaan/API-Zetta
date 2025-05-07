import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import BestSellers from './pages/BestSellers/BestSellers';
import ListOverview from './pages/ListOverview/ListOverview';
import Reviews from './pages/Reviews/Reviews';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/best-sellers" element={<BestSellers />} />
      <Route path="/overview" element={<ListOverview />} />
      <Route path="/reviews" element={<Reviews />} />
    </Routes>
  );
};

export default AppRoutes;