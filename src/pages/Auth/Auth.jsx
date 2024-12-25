import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Auth.css'

import { auth } from '../../api/firebaseConfig';
import { useSearchParams, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth'

const Auth = () => {
    
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [searchParams] = useSearchParams(); // Accede a los parámetros
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await setPersistence(auth, browserSessionPersistence);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user; // Aquí obtienes los datos del usuario
            console.log("User ID:", user.uid); // Muestra el UID
            console.log("Email:", user.email); // Email del usuario
            console.log("Display Name:", user.displayName); // Nom
            const redirectTo = searchParams.get("redirect");
            navigate(redirectTo ? `/${redirectTo}` : "/");
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    return (
        <div className="container" style={{color: 'white'}}>
            <motion.input
            id='inputNme'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="inputEmail"
            type='email'
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            placeholder={"Type your name"}>
        </motion.input>
        <motion.input
            id='inputName'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="inputEmail"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            placeholder={ "Type your password"}>
        </motion.input>
        <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleLogin}
            className="linkToWorks buttonDetails"
            >Connect</motion.button>
            <p>{error && error}</p>
        </div>
    );
};

// aver falta:

// Guardar mensajes
// Enviar stickers
// Hacer reply
// Poner leidos
// Cambiar colores 
// Editar los mensajes
// Mandar imagenes
// Mandar audios
// barra de busqueda
// ver galeria
// Reacciones

export default Auth;