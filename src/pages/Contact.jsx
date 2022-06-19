import React, { useState, useContext } from 'react';

import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import SocilaNetworks from '../components/SocilaNetworks'
// GlobalState
import NotificationContext from '../state/NotificationContext'

import { add } from '../utils/array';
import { getMessageForm } from '../utils/getMessage';
import '../styles/contact.css'

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const contexNotification = useContext(NotificationContext);
  
  const sendRequest = (e) =>{
    e.preventDefault();
    const [myMessage, error] = getMessageForm(email, message)
    contexNotification.add(add(contexNotification.list, myMessage));
    if (!error) {
      setEmail("");
      setMessage("");
    }
  }
  // const meta = {
  //   title: 'Salaxer | Contact me',
  //   description: 'Here you can follow me in all my social networks and if you like you can contact me.',
  //   canonical: 'http://salaxer/logo512.png',
  //   meta: {
  //     charset: 'utf-8',
  //     name: {
  //       keywords: 'react,meta,document,html,tags'
  //     },
  //   }
  // };

  return (
      <div className="viewContact" style={{color: 'white'}}>
        <Helmet>
          <title>Salaxer | Contact me</title>
          <meta name="description" content="You can contact to Salaxer here"/>
          <meta name="twitter:title" content="Salaxer | Contact me"/>
          <meta property="og:type" content="Contact me"/> 
          <meta property="og:description" content="I am a Software Developer and currently on certification process of Mechatronics engineering, You can contact to Salaxer here"/>
          <link rel="canonical" href="https://salaxer.com/"/>
        </Helmet>
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
            value={email}
            className="inputEmail"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}>
          </motion.input>
          <label htmlFor="textareaEmail"><h3>Message</h3></label>
          <motion.textarea
            value={message}
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