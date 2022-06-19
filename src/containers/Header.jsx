import React, { useMemo, useState } from 'react';

import NavDesktop from '../components/NavDesktop'
import NavMobile from '../components/NavMobile';

import '../styles/header.css';
import MediaQuery from '../utils/MediaQuery';

const Header = () =>{
    
    const rest = MediaQuery();

    const [navi, setNavi] = useState(false);

    useMemo(()=>{
        if (rest === 'mobile') {
            setNavi(true)
        }else{
            setNavi(false)
        }
    },[rest])
    
    const handleNav = (e) =>{
        setNavi(e.target.checked);
    } 

    return (
        <>
            <nav className="Header">
                <h1 className="Logo">SALAXER</h1>
                <label htmlFor="checkNav">
                    <input type="checkbox" name="" id="checkNav" onClick={(e)=>{handleNav(e)}}/>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </label>
                {navi ? null : <NavDesktop/>}
            </nav>
            {navi ? <NavMobile/> : null }
        </>
    )
}
export default Header;