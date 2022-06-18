import React, { useState, useContext } from 'react';

import { motion } from 'framer-motion';

import SocilaNetworks from '../components/SocilaNetworks'
// GlobalState
import NotificationContext from '../state/NotificationContext'
import { add } from '../utils/array';

import '../styles/contact.css'

const Contact = () => {
  const [email, setEmail] = useState(null);
  const [message, setMessage] = useState(null);
  const contexNotification = useContext(NotificationContext);
  
  const sendRequest = (e) =>{
    e.preventDefault();
    if (!email || !message) return 
    const newNotification = {
      id: Date.now(),
      title: 'Sended',
      message: "An Email has been sended, Tanks for contact me, I will contact you as soon posible"
    }
    contexNotification.add(add(contexNotification.list, newNotification));
    console.log(email);
  }
  return (
    <div className="viewContact" style={{color: 'white'}}>
      <div className="followMe">
        <motion.h1 tabIndex={0} aria-label='Find me on'>Find me on</motion.h1>
        <SocilaNetworks/>
      </div>
      <form className='form' action="">
        <h2 tabIndex={0} aria-label='Or leave your email'>Or leave your email</h2>
        <label htmlFor="inputEmail"><h3>Email</h3></label>
        <motion.input
          id='inputEmail'
          onChange={(e)=> setEmail(e.target.value)}
          className="inputEmail"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}>
        </motion.input>
        <label htmlFor="textareaEmail"><h3>Message</h3></label>
        <motion.textarea
          id='textareaEmail'
          onChange={(e)=> setMessage(e.target.value)}
          className="textareaEmail"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
        </motion.textarea>
        <motion.button
          onClick={sendRequest}
          className="buttonSend"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}>
            <p>Send</p>
        </motion.button>
      </form>
    </div>
  );
};

export default Contact;