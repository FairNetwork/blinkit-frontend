import { useLocation } from 'react-router-dom';

export const useIsCurrentRoute = (route: string) => {
    const location = useLocation();

    return location.pathname === route;
};
