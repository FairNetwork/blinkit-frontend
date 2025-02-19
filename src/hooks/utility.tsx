import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import UtilityImpressum from '../view/utility/utility-impressum/UtilityImpressum';
import UtilityDataProtection from '../view/utility/utility-data-protection/UtilityDataProtection';

export const useUtilityContent = () => {
    const location = useLocation();

    return useMemo(() => {
        const path = location.pathname;

        if (path.endsWith('/data-protection')) {
            return <UtilityDataProtection />;
        }

        return <UtilityImpressum />;
    }, [location.pathname]);
};
