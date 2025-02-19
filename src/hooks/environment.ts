import { useEffect, useState } from 'react';

export const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            const mobileQuery = window.matchMedia('(max-width: 768px)');
            setIsMobile(mobileQuery.matches);
        };

        checkIsMobile();

        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    return isMobile;
};
