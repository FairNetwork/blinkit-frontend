import React, { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { ColorMode, ColorScheme, ColorSettings } from '../../../types/theme';

export type ColorSchemeProviderProps = {
    /**
     * The content of the application or the components for which the styles should be set
     */
    children: ReactNode;
    /**
     * The colors of the components
     */
    colors: ColorScheme;
    /**
     * The color mode to be used for the children
     */
    colorMode?: ColorMode;
    /**
     * Additional styles set on the root element
     */
    style?: { [key: string]: string | number };
};

export interface Theme {
    [key: string]: string;
}

export interface ColorSchemeContextProps {
    color: ColorSettings;
    colorMode: ColorMode;
}

export const ColorSchemeContext = createContext<ColorSchemeContextProps | undefined>(undefined);

export const useColorScheme = () => useContext(ColorSchemeContext);

const ColorSchemeProvider: FC<ColorSchemeProviderProps> = ({
    children,
    colors,
    colorMode = ColorMode.Light,
    style
}) => {
    const color = useMemo(
        () => (colorMode === ColorMode.Light ? colors.light : colors.dark),
        [colors, colorMode]
    );

    const theme: Theme = useMemo(() => {
        return Object.keys(color).reduce((acc, key) => {
            const cssVariableName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
            acc[cssVariableName] = color[key as keyof ColorSettings];
            return acc;
        }, {} as Theme);
    }, [color]);

    const contextValue: ColorSchemeContextProps | undefined = useMemo(() => {
        return {
            colorMode,
            color
        };
    }, [colorMode, color]);

    return (
        <ColorSchemeContext.Provider value={contextValue}>
            <div
                className="color-scheme-provider"
                style={{
                    ...style,
                    ...theme,
                    color: 'var(--primary-text-color)',
                    backgroundColor: 'var(--primary-background-color)'
                }}>
                {children}
            </div>
        </ColorSchemeContext.Provider>
    );
};

ColorSchemeProvider.displayName = 'ColorSchemeProvider';

export default ColorSchemeProvider;
