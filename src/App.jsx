import React, { useState } from 'react';
import { Routes , Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion"

import NotificationContext from './state/NotificationContext.jsx'
import { AuthProvider } from './state/AuthContext.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { Notification } from './components';

import { Contact, Works, NotFound, Chat, Love, Home, Auth } from './pages'
import { Layout } from './containers'
import ProtectedRoute from './components/ProtectedRoute.jsx';

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
    element: Chat,
    protected: true
  },
  {
    path: '/iloveyou',
    element: Love,
    protected: true
  },
  {
    path: '/auth',
    element: Auth
  }
]

function App() {
  const [notification, setNotification] = useState([]);
  //{message: 'something', title: 'something', life: 4000}
  const location = useLocation();

  return (
    <HelmetProvider>
      <AuthProvider>
        <NotificationContext.Provider value={{
          list: notification,
          add: setNotification
        }}>
          <Layout>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path='*' element={
                    <NotFound />
                } />  
                {pages.map((item, index)=>{
                  return( item.protected ? 
                    <Route key={index} path={item.path} element={
                      <ProtectedRoute>
                        <motion.div 
                          initial={{y: 20, opacity: 0}}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 100, 
                            delay: 0,
                            duration: 0.8,
                          }}
                          style={{ 
                            height: "100vh", 
                            width: "100vw", 
                            overflow: "auto",
                            paddingBottom: `${location.pathname !== '/chat' && "3rem"}`,
                            display: 'flex',
                            justifyContent: "center"
                          }}
                          >
                          <item.element />
                        </motion.div>
                      </ProtectedRoute>
                    } /> 
                    : 
                    <Route key={index} path={item.path} element={
                      <motion.div 
                        initial={{y: 20, opacity: 0}}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 100, 
                          delay: 0.2,
                          duration: 0.8,
                        }}
                        style={{ 
                          height: "100vh", 
                          width: "100%", 
                          overflow: "auto",
                          paddingBottom: "3rem",
                          display: 'flex',
                          justifyContent: "center"
                        }}
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
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
