'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import DesktopNavbar from './desktopNavbar/DesktopNavbar';
import MobileNavbar from './mobileNavbar/MobileNavbar';

const Navbar = () => {
  const [isBigScreen, setIsBigScreen] = useState(true);
  const setScreenSize = useCallback(()=> {
    if((typeof window !== 'undefined' && window.innerWidth >= 1024)){
      setIsBigScreen(true);
    }
    else setIsBigScreen(false);
  },[]);
  useEffect(()=>{
    setScreenSize();
    window.onresize = setScreenSize;
    return ()=>{
      window.removeEventListener('resize', setScreenSize);
    }
  },[])


  return (
    <>
    {
      isBigScreen ? <DesktopNavbar/> : <MobileNavbar/> 
    }
    
    </>
  )
}

export default Navbar