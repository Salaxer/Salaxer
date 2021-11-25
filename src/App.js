import React from 'react';
import { Routes , Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion"

import Layout from './components/Layout';
import Home from './pages/Home';
import Works from './pages/Works';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();
  return (
      <Layout>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route path='*' element={
              <motion.div 
                initial={{y: 20, opacity: 0}}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                exit={{opacity: 0,  y: 20}}
              >
                <NotFound />
              </motion.div>
            } />   
            <Route exact path="/" element={
              <motion.div 
                initial={{y: 20, opacity: 0}}
                animate={{ y: 0, opacity: 1}}
                transition={{ type: "spring", stiffness: 100 }}
                exit={{opacity: 0, y: 20}}
              >
                <Home />
              </motion.div>
            } />
            <Route exact path="/works" element={
              <motion.div
                initial={{y: 20, opacity: 0}}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                exit={{opacity: 0,  y: 20}}
              >
                <Works />
              </motion.div>} />
          </Routes>
        </AnimatePresence>
      </Layout>
  );
}

export default App;
