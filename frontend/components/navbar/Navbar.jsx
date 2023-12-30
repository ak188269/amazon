'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import DesktopNavbar from './desktopNavbar/DesktopNavbar';
import MobileNavbar from './mobileNavbar/MobileNavbar';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isBigScreen, setIsBigScreen] = useState(true);
  const [shouldNavbarShown , setShouldNavbarShown] = useState(true);
  const pathname = usePathname()
  const routesWithoutNavbar  = ["/login","/register"] // i am writing route that doesn`t need navbar beacuse currently these are less in number than the number of routes that require navbar
  const setScreenSize = useCallback(()=> {
    if((typeof window !== 'undefined' && window.innerWidth >= 1024)){
      setIsBigScreen(true);
    }
    else setIsBigScreen(false);
  },[]);

  const decideNavbarVisibility = useCallback(()=>{
    
    if(routesWithoutNavbar.includes(pathname)){
      setShouldNavbarShown(false);
    }
    else setShouldNavbarShown(true);
  })
  useEffect(()=>{
    decideNavbarVisibility();
  },[pathname])
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
     shouldNavbarShown ? ( isBigScreen ? <DesktopNavbar/> : <MobileNavbar/>) : null
    }
    
    </>
  )
}

export default Navbar