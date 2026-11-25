import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

import Layout from "./components/layout/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Details from "./pages/Details";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Puppies from "./pages/Puppies";
import PuppyEnquiry from "./pages/PuppyEnquiry";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/puppies" element={<Puppies />} />
            <Route path="/puppies/:id" element={<Details />} />
            <Route path="/puppies/:id/enquire" element={<PuppyEnquiry />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="*"
              element={
                <div className="section empty-state">
                  <h1>Oops, little paws went missing.</h1>
                  <a href="/">Back home</a>
                </div>
              }
            />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return <AnimatedRoutes />;
}
