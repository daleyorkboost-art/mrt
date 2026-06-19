import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { WhatsappWidget } from './components/WhatsappWidget';
import { VisitorIntelligenceTracker } from './components/VisitorIntelligenceTracker';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const RecommenderPage = lazy(() => import('./pages/RecommenderPage').then((module) => ({ default: module.RecommenderPage })));
const AriaChatbotPage = lazy(() => import('./pages/AriaChatbotPage').then((module) => ({ default: module.AriaChatbotPage })));
const ItineraryBuilderPage = lazy(() => import('./pages/ItineraryBuilderPage').then((module) => ({ default: module.ItineraryBuilderPage })));
const VisaChecklistPage = lazy(() => import('./pages/VisaChecklistPage').then((module) => ({ default: module.VisaChecklistPage })));
const DubaiDayPlannerPage = lazy(() => import('./pages/DubaiDayPlannerPage').then((module) => ({ default: module.DubaiDayPlannerPage })));
const CaptionGeneratorPage = lazy(() => import('./pages/CaptionGeneratorPage').then((module) => ({ default: module.CaptionGeneratorPage })));
const InternalQuoteGeneratorPage = lazy(() => import('./pages/InternalQuoteGeneratorPage').then((module) => ({ default: module.InternalQuoteGeneratorPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen overflow-x-hidden bg-navy text-white">
      <Navbar />
      <VisitorIntelligenceTracker />
      <Suspense fallback={null}>
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
            <Route path="/internal/quote" element={<InternalQuoteGeneratorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
      <WhatsappWidget />
    </div>
  );
}
