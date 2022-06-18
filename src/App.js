import React, { useState, useEffect } from 'react';
import { Routes , Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion"
import Layout from './containers/Layout';
import Home from './pages/Home';
import Works from './pages/Works';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import NotificationContext from './state/NotificationContext'
import { remove } from './utils/array';

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

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay , type: "tween", duration: 1, bounce: 0 },
        opacity: { delay, duration: 0.01 }
      }
    };
  }
};

function App() {
  const [notification, setNotification] = useState([]);
  //{message: 'somethin', title: 'something'}
  const location = useLocation();
  useEffect(()=>{
    console.log(notification);
  },[notification])

  return (
    <NotificationContext.Provider value={{
      list: notification,
      add: setNotification
    }}>
      <Layout>
        <AnimatePresence exitBeforeEnter>
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
                  >
                    <item.element />
                  </motion.div>
                } />   
              )
            })}
          </Routes>
        </AnimatePresence>
      </Layout>
      <ul className='notifications'>
        <AnimatePresence>
            {notification.map((item, index) => (
              <motion.li
                className='notifications__item'
                key={item.id}
                transition={{ duration: 0.2 }}
                layout 
                initial={{ opacity: 0, y: 50, scale: 0.3}}
                animate={{ opacity: 1, y: 0, scale: 1}}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              >
                <h3>{item.title}</h3>
                <p>{item.message}</p>
                <motion.button 
                whileHover={{scale: 1.1}}
                whileFocus={{ outline: '0.2rem solid var(--outlinecolor)', scale: 0.9}}
                className="notifications__item--close" onClick={()=> setNotification(remove(notification, item))}>
                  <motion.svg 
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    initial="hidden"
                    animate="visible">
                    <motion.line x1="5" y1="25" x2="25" y2="5" stroke="var(--textcolor)" variants={draw} custom={0.5}/>
                    <motion.line x1="5" y1="5" x2="25" y2="25" stroke="var(--textcolor)" variants={draw} custom={1}/>
                  </motion.svg>
                </motion.button>
              </motion.li>
            ))}
          </AnimatePresence>
      </ul>
    </NotificationContext.Provider>
  );
}

export default App;
