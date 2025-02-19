import { useLocation } from 'react-router-dom';
import HomeHeader from '../components/shared/header/home-header/HomeHeader';
import PdfHeader from '../components/shared/header/pdf-header/PdfHeader';

export const useHeaderContent = () => {
    const location = useLocation();

    if (location.pathname === '/') {
        return <HomeHeader />;
    }

    return <PdfHeader />;
};
