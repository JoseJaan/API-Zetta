import { Routes, Route } from 'react-router-dom';
import Home from './pages/BestSellers/BestSellers';
import ListOverview from './pages/ListOverview/ListOverview';
import Reviews from './pages/Reviews/Reviews';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/overview" element={<ListOverview />} />
      <Route path="/reviews" element={<Reviews />} />
    </Routes>
  );
};

export default AppRoutes;