import React, { useState } from 'react';
import { Routes , Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion"

import NotificationContext from './state/NotificationContext.jsx'
import { HelmetProvider } from 'react-helmet-async';
import { Notification } from './components';

import { Contact, Works, NotFound, Chat, Love, Home } from './pages'
import { Layout } from './containers'

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
  },
  {
    path: '/chat',
    element: Chat
  },
  {
    path: '/iloveyou',
    element: Love
  }
]

function App() {
  const [notification, setNotification] = useState([]);
  //{message: 'something', title: 'something', life: 4000}
  const location = useLocation();

  return (
    <HelmetProvider>
      <NotificationContext.Provider value={{
        list: notification,
        add: setNotification
      }}>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path='*' element={
                <motion.div 
                  initial={{y: 20, opacity: 0}}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
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
                      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                      exit={{opacity: 0,  y: 20}}
                      style={{ height: "calc(100vh - 70px)", width: "100%", paddingBottom: "3rem"}}
                    >
                      <item.element />
                    </motion.div>
                  } />   
                )
              })}
            </Routes>
          </AnimatePresence>
        </Layout>
        <Notification></Notification>
      </NotificationContext.Provider>
    </HelmetProvider>
  );
}

export default App;
