import mqtt from 'mqtt';
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './chat.css'
import { TextareaAutoSize } from '../../components';

const Chat = () => {

    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);
    
    const [newMessage, setNewMessage] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useState(false);

    const terminalRef = useRef(null)

    const connectToMqtt = () =>{
        const mqttClient = mqtt.connect('wss://0070dab94b6e4df894cff18d9cd6aa81.s1.eu.hivemq.cloud:8884/mqtt', {
            clientId: `client${(Math.floor(Math.random()*1000))}`,
            username: 'Salaxer',
            password: password
        });
        setClient(mqttClient);
        
        mqttClient.on('connect', () => {
            console.log('Conectado a MQTT');
            mqttClient.subscribe('tu/tema', (err) => {
                if (!err) {
                    console.log('Suscrito al tema');
                    setAuth(()=>true);
                }
            });
        });
        
        mqttClient.on('message', (topic, message) => {
            try {
                const messageObject = JSON.parse(message.toString());
                const sender = messageObject.sender;
                const content = messageObject.content;
        
                console.log('Mensaje:', content);
                console.log('Enviado por:', sender);
        
                setMessages((prevMessages) => [...prevMessages, { sender, content }]);
                setTimeout(() => {
                    scrollDown();
                  }, 200);
              } catch (e) {
                console.error('Error al parsear el mensaje:', e);
              }
        });
    }

    const scrollDown = () =>{
        terminalRef.current.scrollTo(0, terminalRef.current.scrollHeight)
    }
    

    const handleSendMessage = () => {
        if (client) {
            const messageObject = {
                sender: user, // Cambia esto por la identificación del remitente
                content: newMessage,
              };
            const messageString = JSON.stringify(messageObject);
            client.publish('tu/tema', messageString, (err) => {
                if (!err) {
                    setNewMessage(''); // Limpia el campo después de enviar el mensaje
                } else {
                    console.error('Error al enviar el mensaje:', err);
                }
            });
        }
    };


    return (
        <div className="container" style={{color: 'white'}}>
            <div className="terminal" ref={terminalRef}>
                {messages.map((msg, index) => {
                    console.log(msg);
                    return <pre key={index} 
                    className={user === msg.sender ? "from" : "to"}>{msg.content}</pre>
                })}
                <section className='inputContainer'>
                    {auth ? 
                    <TextareaAutoSize 
                    EnterDown={handleSendMessage} 
                    onChange={(t) => setNewMessage(t)}
                    value={newMessage}>
                    </TextareaAutoSize>
                    :
                    <>
                        <motion.input
                            id='inputNme'
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            className="inputEmail"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            placeholder={"Type your name"}>
                        </motion.input>
                        <motion.input
                            id='inputName'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="inputEmail"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            placeholder={ "Type your password"}>
                        </motion.input>
                    </>
                    }
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={auth ? handleSendMessage : connectToMqtt}
                        className="linkToWorks buttonDetails"
                        >
                        {auth ? "send" : "Connect"}
                    </motion.button>
                </section>
            </div>
        </div>
  );
};

export default Chat;