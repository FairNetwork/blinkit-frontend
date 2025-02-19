import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import Home from '../view/home/Home';
import NoContent from '../view/no-content/NoContent';

export const useContent = () => {
    const location = useLocation();

    return useMemo(() => {
        const path = location.pathname;

        if (path === '/no_content') return <NoContent />;

        return <Home />;
    }, [location.pathname]);
};
