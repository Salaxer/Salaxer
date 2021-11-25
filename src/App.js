import React from 'react';
import { Routes , Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion"

import Layout from './containers/Layout';
import Home from './pages/Home';
import Works from './pages/Works';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';

const pages = [
  {
    path: '/',
    element: Home,
  },
  {
    path: '/works',
    element: Works,
  },
  {
    path: '/contact',
    element: Contact
  }
]


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
            {pages.map((item, index)=>{
              return(
                <Route key={index} path={item.path} element={
                  <motion.div 
                    initial={{y: 20, opacity: 0}}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                    exit={{opacity: 0,  y: 20}}
                  >
                    <item.element />
                  </motion.div>
                } />   
              )
            })}
          </Routes>
        </AnimatePresence>
      </Layout>
  );
}

export default App;
