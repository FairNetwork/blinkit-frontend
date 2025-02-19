import React, { useMemo, type ReactNode, useState, useContext } from 'react';

interface ISidebarContext {
    isOpen?: boolean;
    updateIsOpen?: (isOpen: boolean) => void;
    width?: string;
}

export const SidebarContext = React.createContext<ISidebarContext>({
    isOpen: undefined,
    updateIsOpen: undefined,
    width: undefined
});

SidebarContext.displayName = 'SidebarContext';

export const useSidebarProvider = () => useContext(SidebarContext);

interface SidebarProviderProps {
    children: ReactNode;
    width?: string;
}

const SidebarProvider = ({ children, width = '270px' }: SidebarProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const providerValue = useMemo<ISidebarContext>(
        () => ({
            isOpen,
            updateIsOpen: setIsOpen,
            width
        }),
        [isOpen, setIsOpen, width]
    );

    return <SidebarContext.Provider value={providerValue}>{children}</SidebarContext.Provider>;
};

SidebarProvider.displayName = 'SidebarProvider';

export default SidebarProvider;
