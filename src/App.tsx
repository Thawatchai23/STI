import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ComplaintForm from './pages/ComplaintForm';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import NewsPage from './pages/NewsPage';
import CommunityPage from './pages/CommunityPage';
import ContactPage from './pages/ContactPage';
import TaxPaymentPage from './pages/TaxPaymentPage';
import WelfarePage from './pages/WelfarePage';
import OnlineServicesPage from './pages/OnlineServicesPage';
import SocialWelfarePage from './pages/SocialWelfarePage';
import EnvironmentPage from './pages/EnvironmentPage';
import StaffDirectoryPage from './pages/StaffDirectoryPage';
import DashboardPage from './pages/DashboardPage';
import DocumentsPage from './pages/DocumentsPage';

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/complaint" element={<ComplaintForm />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/tax-payment" element={<TaxPaymentPage />} />
              <Route path="/welfare" element={<WelfarePage />} />
              <Route path="/online-services" element={<OnlineServicesPage />} />
              <Route path="/social-welfare" element={<SocialWelfarePage />} />
              <Route path="/environment" element={<EnvironmentPage />} />
              <Route path="/staff" element={<StaffDirectoryPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/documents" element={<DocumentsPage />} />
            </Routes>
          </MainLayout>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;