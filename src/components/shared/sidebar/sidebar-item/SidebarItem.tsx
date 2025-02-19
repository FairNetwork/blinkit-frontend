import './sidebarItem.scss';
import Icon from '../../icon/Icon';
import { FC, useMemo } from 'react';
import { useColorScheme } from '../../color-scheme-provider/ColorSchemeProvider';
import { useNavigate } from 'react-router-dom';
import { useIsCurrentRoute } from '../../../../hooks/route';

interface SidebarItemProps {
    /**
     * The text that should be displayed inside a badge.
     */
    badgeText?: string;
    /**
     * The icon of the item.
     */
    icon?: string;
    /**
     * Whether the item is disabled.
     */
    isDisabled?: boolean;
    /**
     * The redirect route.
     */
    route: string;
    /**
     * The text of the item.
     */
    text: string;
}

const SidebarItem: FC<SidebarItemProps> = ({ icon, isDisabled, badgeText, text, route }) => {
    const colorScheme = useColorScheme();
    const navigate = useNavigate();
    const isActive = useIsCurrentRoute(route);

    const backgroundColor = useMemo(() => {
        if (isDisabled) {
            return 'var(--secondary-background-color) !important';
        }

        return isActive ? colorScheme?.color.sidebarActiveColor : undefined;
    }, [isDisabled, isActive, colorScheme?.color.sidebarActiveColor]);

    return (
        <div
            className="sidebar-item"
            onClick={() => (isDisabled ? undefined : navigate(route))}
            style={{
                backgroundColor,
                cursor: isDisabled ? 'default' : 'pointer',
                opacity: isDisabled ? 0.5 : 1
            }}>
            <div className="sidebar-item__wrapper">
                {icon && (
                    <div className="sidebar-item__wrapper__icon">
                        <Icon icon={icon} />
                    </div>
                )}
                {text}
            </div>
            {badgeText && <div className="sidebar-item__badge">{badgeText}</div>}
        </div>
    );
};

SidebarItem.displayName = 'SidebarItem';

export default SidebarItem;
