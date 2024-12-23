import mqtt from 'mqtt';
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './chat.css'
import { TextareaAutoSize } from '../../components';
import { useNavigate } from 'react-router-dom';
import detectarYEnlazar from '../../utils/detectHyperlinlks'
import { getPassword } from '../../api/mqtt';

const Chat = () => {

    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);
    
    const [newMessage, setNewMessage] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useState(false);

    const navigate = useNavigate();

    const terminalRef = useRef(null)

    const getMQTTPassword = async () => {
        const { resolve } = await getPassword({password})
        connectToMqtt(resolve.MQTT)
    }

    const connectToMqtt = (MQTT) =>{
        const mqttClient = mqtt.connect('wss://0070dab94b6e4df894cff18d9cd6aa81.s1.eu.hivemq.cloud:8884/mqtt', {
            clientId: `client${(Math.floor(Math.random()*1000))}`,
            username: 'Salaxer',
            password: MQTT
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
                const date = messageObject.date;
        
                console.log('Mensaje:', content);
                console.log('Enviado por:', sender);
                if(content === "Te amo"){
                    navigate("/iloveyou")
                }
        
                setMessages((prevMessages) => [...prevMessages, { sender, content, date }]);
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
            if (newMessage === "") {
                return;
            }
            const messageObject = {
                sender: user, // Cambia esto por la identificación del remitente
                content: newMessage,
                date: new Date()
              };
              console.log(messageObject);
              
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
            <section className='messages' ref={terminalRef}>
                {messages.map((msg, index) => {
                    const fecha = new Date(msg.date)
                    const opciones = {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false // Ajusta a true si quieres formato de 12 horas
                      };
                    const horaFormateada = fecha.toLocaleTimeString('es-ES', opciones);
                    return <div key={index} className={`message ${user === msg.sender ? "from" : "to"}`} >
                        <pre dangerouslySetInnerHTML={{ __html: detectarYEnlazar(msg.content) }}></pre>
                        <span className='datetime'>{horaFormateada}</span>
                    </div>
                })}
            </section>
            <section className='input'>
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
                { !auth ? 
                <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={getMQTTPassword}
                className="linkToWorks buttonDetails"
                >Connect</motion.button>
                : 
                <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="send"
                >
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg> 
                </motion.button>
                }
            </section>
        </div>
  );
};

export default Chat;