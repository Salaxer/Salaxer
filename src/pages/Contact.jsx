import React, { useState, useContext } from 'react';

import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import SocilaNetworks from '../components/SocilaNetworks'
import Loader from '../components/Loader';
// GlobalState
import NotificationContext from '../state/NotificationContext'

import { add } from '../utils/array';
import { getMessageForm } from '../utils/getMessage';

import '../styles/contact.css'

import axios from 'axios';

const sendMessage = async (email, message, name) =>{
  let resolve, error;
  await axios.post('http://localhost:3002/contact/',{
    email,
    message,
    name,
  }, {
    headers: { 
      Accept: 'application/json', 
      withCredentials: true
    }
  }).then((res)=>{
    resolve = res;
  }).catch((e) =>{
    console.error(e);
    error = e;
  })
  return {resolve, error};
}

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const contexNotification = useContext(NotificationContext);
  
  const sendRequest = async (e) =>{
    e.preventDefault();
    if (loader) return;
    let [myMessage, err] = getMessageForm(email, message, name);
    if (err) return contexNotification.add(add(contexNotification.list, myMessage)); 
    setLoader(true);
    // eslint-disable-next-line no-unused-vars
    let {resolve, error} = await sendMessage(email, message, name);
    if (error) {
      setLoader(false);
      myMessage.title = "Error";
      myMessage.message= error.message ? error.message : "Unexpected error";
      contexNotification.add(add(contexNotification.list, myMessage));
      return 0;
    }
    setLoader(false);
    setEmail("");
    setMessage("");
    setName("");
    contexNotification.add(add(contexNotification.list, myMessage));
  }

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
          <label htmlFor="inputName"><h3>Name</h3></label>
          <motion.input
            id='inputName'
            onChange={(e)=> setName(e.target.value)}
            value={name}
            className="inputName"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}>
          </motion.input>
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
              {loader ? 
              <Loader size="22px" background="transparent" position="relative" color="white"></Loader>
              :
              <p>Send</p>
              }
          </motion.button>
        </form>
      </div>
  );
};

export default Contact;