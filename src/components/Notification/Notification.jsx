import { AnimatePresence, motion } from "framer-motion"
import React ,{ useEffect, useState, useContext, useRef }  from 'react';
import NotificationContext from '../../state/NotificationContext'
import { remove } from '../../utils/array';

import './Notification.css'

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay , type: "spring", duration: 1, bounce: 0 },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
};

const Notification = () =>{
    const contextNotification = useContext(NotificationContext);
    const [lengthNotification, setLengthNotification] = useState(0);
    const notify = useRef(contextNotification.list);
    const removeNotification = (item) =>{
        contextNotification.add(remove(notify.current, item));
    }
    useEffect(()=>{
        notify.current = contextNotification.list;
        const addInterval = (item) =>{
            if (typeof item.life == 'number') {
                setTimeout(removeNotification, item.life, item);
            }
        }
        // only if there is a new notification
        if (contextNotification.list.length !== lengthNotification) {
            if (contextNotification.list.length >= lengthNotification) {
                // this why my add() function of notifications added the notification at the start of the array
                const newArr = [...contextNotification.list];
                addInterval(newArr[0]);
            }
            setLengthNotification(contextNotification.list.length);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[contextNotification.list])

    return (
    <ul className='notifications'>
        <AnimatePresence>
            {contextNotification.list.map((item, index) => (
              <motion.li
                className='notifications__item'
                key={item.id}
                transition={{ duration: 0.2 }}
                layout
                // onClick={()=>cancelRemove(item)}
                initial={{ opacity: 0, y: 50, scale: 0.3}}
                animate={{ opacity: 1, y: 0, scale: 1}}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              >
                <h3>{item.title}</h3>
                <p>{item.message}</p>
                <motion.button 
                whileHover={{scale: 1.1}}
                whileFocus={{ outline: '0.2rem solid var(--outlineColor)', scale: 0.9}}
                className="notifications__item--close" onClick={()=> contextNotification.add(remove(contextNotification.list, item))}>
                  <motion.svg 
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    initial="hidden"
                    animate="visible">
                    <motion.line x1="5" y1="25" x2="25" y2="5" stroke="var(--textColor)" variants={draw} custom={0.5}/>
                    <motion.line x1="5" y1="5" x2="25" y2="25" stroke="var(--textColor)" variants={draw} custom={1}/>
                  </motion.svg>
                </motion.button>
              </motion.li>
            ))}
        </AnimatePresence>
    </ul>
    )
}

export default Notification;