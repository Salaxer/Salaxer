import { AnimatePresence, motion } from "framer-motion"
import React ,{ useEffect, useState, useContext, useRef }  from 'react';
import NotificationContext from '../state/NotificationContext'
import { remove } from '../utils/array';

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
    const contexNotification = useContext(NotificationContext);
    const [lenghtNotifi, setLenghtNotifi] = useState(0);
    const notify = useRef(contexNotification.list);
    const removeNotification = (item) =>{
        contexNotification.add(remove(notify.current, item));
    }
    useEffect(()=>{
        notify.current = contexNotification.list;
        const addInterval = (item) =>{
            if (typeof item.life == 'number') {
                setTimeout(removeNotification, item.life, item);
            }
        }
        // only if there is a new notification
        if (contexNotification.list.length !== lenghtNotifi) {
            if (contexNotification.list.length >= lenghtNotifi) {
                // this why my add() function of notifications added the notification at the start of the array
                const newArr = [...contexNotification.list];
                addInterval(newArr[0]);
            }
            setLenghtNotifi(contexNotification.list.length);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[contexNotification.list])

    return (
    <ul className='notifications'>
        <AnimatePresence>
            {contexNotification.list.map((item, index) => (
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
                whileFocus={{ outline: '0.2rem solid var(--outlinecolor)', scale: 0.9}}
                className="notifications__item--close" onClick={()=> contexNotification.add(remove(contexNotification.list, item))}>
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
    )
}

export default Notification;