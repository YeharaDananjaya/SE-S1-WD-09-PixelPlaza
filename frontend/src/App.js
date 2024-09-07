import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Components
import Navbar from './Componenets/Navbar';
import Dashboard from './Pages/Dashboard';
import Loading from './Utils/Loading';
import Shoppanel from './Pages/Shoppanel';

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="relative flex flex-row h-auto w-[100vw]">
      {/* Navbar Section */}
      <Navbar />

      {/* Main Content Section */}
      <div className="flex-grow h-full overflow-y-auto overflow-x-hidden">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loading />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Shops" element={<Shoppanel />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
