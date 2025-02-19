import { useEffect, useState } from 'react';
import { DARK_MODE_STORAGE_KEY } from '../constants/storage';
import { ColorMode } from '../types/theme';

export const useColorMode = () => {
    const [colorMode, setColorMode] = useState<ColorMode>(ColorMode.Light);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === DARK_MODE_STORAGE_KEY) {
                setColorMode(event.newValue === 'true' ? ColorMode.Dark : ColorMode.Light);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return colorMode;
};
