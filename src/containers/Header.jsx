import React, { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

import NavDesktop from '../components/NavDesktop'
import NavMobile from '../components/NavMobile';

import '../styles/header.css';
import MediaQuery from '../utils/MediaQuery';

const Header = () =>{
    
    const refHeader = useRef(null);

    const rest = MediaQuery();

    const [navi, setNavi] = useState(false);

    useMemo(()=>{
        if (rest === 'mobile') {
            setNavi(true)
        }else{
            setNavi(false)
        }
    },[rest])

    useEffect(()=>{
        const computed = window.getComputedStyle(refHeader.current).getPropertyValue("backdrop-filter");
        if (computed) return;
        if (!computed) {
            refHeader.current.style.backgroundColor = "var(--maincolor)";
        }
    },[refHeader])

    return (
        <>
            <nav ref={refHeader} className="Header">
                <h1 className="Logo">SALAXER</h1>
                {navi ? null : <NavDesktop/>}
            </nav>
            {navi ? <NavMobile/> : null }
        </>
    )
}
export default Header;