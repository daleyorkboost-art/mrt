import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { WhatsappWidget } from './components/WhatsappWidget';
import { AriaChatbotPage } from './pages/AriaChatbotPage';
import { CaptionGeneratorPage } from './pages/CaptionGeneratorPage';
import { DubaiDayPlannerPage } from './pages/DubaiDayPlannerPage';
import { HomePage } from './pages/HomePage';
import { InternalQuoteGeneratorPage } from './pages/InternalQuoteGeneratorPage';
import { ItineraryBuilderPage } from './pages/ItineraryBuilderPage';
import { RecommenderPage } from './pages/RecommenderPage';
import { VisaChecklistPage } from './pages/VisaChecklistPage';

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen overflow-x-hidden bg-navy text-white">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/ai-trip-recommender" element={<RecommenderPage />} />
          <Route path="/aria-chatbot" element={<AriaChatbotPage />} />
          <Route path="/itinerary-builder" element={<ItineraryBuilderPage />} />
          <Route path="/visa-checklist" element={<VisaChecklistPage />} />
          <Route path="/dubai-day-planner" element={<DubaiDayPlannerPage />} />
          <Route path="/caption-generator" element={<CaptionGeneratorPage />} />
          <Route path="/internal-quote-generator" element={<InternalQuoteGeneratorPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <WhatsappWidget />
    </div>
  );
}
