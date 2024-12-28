import React from 'react';
import './footer.css'
import { useLocation } from 'react-router-dom';

const Footer = () =>{
    const location = useLocation();
    return (
        <section className={`Footer ${location.pathname === '/chat' && "chatApp"}`}>
            <p className="Footer__text">Made with ❤ by Salaxer</p>
            <p className="Footer__text">Last Update on May 2024</p>
        </section>
    )
}
export default Footer;