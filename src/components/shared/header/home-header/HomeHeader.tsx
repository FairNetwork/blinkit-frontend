import './homeHeader.scss';
import { useIsMobile } from '../../../../hooks/environment';
import Icon from '../../icon/Icon';
import { useSidebarProvider } from '../../sidebar/SidebarProvider';

const HomeHeader = () => {
    const isMobile = useIsMobile();
    const { updateIsOpen } = useSidebarProvider();

    return (
        <div className="home-header">
            {isMobile && (
                <div id="sidebar-toggle">
                    <Icon
                        icon="fas fa-bars"
                        onClick={() =>
                            typeof updateIsOpen === 'function' ? updateIsOpen(true) : undefined
                        }
                    />
                </div>
            )}
            <div>FairNet</div>
        </div>
    );
};

HomeHeader.displayName = 'HomeHeader';

export default HomeHeader;
