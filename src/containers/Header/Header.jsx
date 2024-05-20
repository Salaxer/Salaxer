import React, { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

import NavDesktop from '../../components/NavDesktop'
import NavMobile from '../../components/NavMobile/NavMobile';

import './header.css';
import MediaQuery from '../../utils/MediaQuery';
import myLogo from '../../assets/logo.svg';

const Header = () =>{
    
    const refHeader = useRef(null);

    const rest = MediaQuery();

    const [nav, setNav] = useState(false);

    useMemo(()=>{
        if (rest === 'mobile') {
            setNav(true)
        }else{
            setNav(false)
        }
    },[rest])

    useEffect(()=>{
        const computed = window.getComputedStyle(refHeader.current).getPropertyValue("backdrop-filter");
        if (computed) return;
        refHeader.current.style.backgroundColor = "var(--mainColor)";
    },[refHeader])

    return (
        <>
            <nav ref={refHeader} className="Header">
                <figure className='figureLogo'>
                    <img src={myLogo} alt="logo" height={45} width={45} srcset="" />
                    <h1 className="Logo">SALAXER</h1>
                </figure>
                {nav ? null : <NavDesktop/>}
            </nav>
            {nav ? <NavMobile/> : null }
        </>
    )
}
export default Header;