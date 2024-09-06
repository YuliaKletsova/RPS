'use client'
import { useEffect, useState } from 'react';

export const BREAKPOINTS = {
    smallMobile: '375px',
    mobile: '767px',
    tablet: '1024px',
};

export const useResponsive = () => {
    const [width, setWidth] = useState<number | undefined>(undefined);

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWidth(window.innerWidth);
        }
      }, []);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    const isMobile = width <= parseInt(BREAKPOINTS.mobile, 10) && width > 375;
    const isDesktop = width > parseInt(BREAKPOINTS.tablet, 10);

    return { isMobile, isDesktop };
};
