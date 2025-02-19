import { useLocation } from 'react-router-dom';
import HomeHeader from '../components/shared/header/home-header/HomeHeader';

export const useHeaderContent = () => {
    const location = useLocation();

    if (location.pathname === '/') {
        return <HomeHeader />;
    }

    return <HomeHeader />;
};
