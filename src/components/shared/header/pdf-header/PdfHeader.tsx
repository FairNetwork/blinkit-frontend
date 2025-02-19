import './pdfHeader.scss';
import { useIsMobile } from '../../../../hooks/environment';
import Icon from '../../icon/Icon';
import { useSidebarProvider } from '../../sidebar/SidebarProvider';
import { usePDFContext } from '../../../pdf-context/PdfContext';
import { usePdfRoute } from '../../../../hooks/pdf';

const PdfHeader = () => {
    const isMobile = useIsMobile();
    const { updateIsOpen } = useSidebarProvider();
    const { removePdf } = usePDFContext();
    const pdfId = usePdfRoute();

    const handleIconClick = () => {
        removePdf(pdfId);
    };

    return (
        <div className="pdf-header">
            <div className="pdf-header__left-wrapper">
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
                <div>BlinkIt</div>
            </div>
            <div>
                <Icon icon="fa fa-trash" onClick={handleIconClick} />
            </div>
        </div>
    );
};

PdfHeader.displayName = 'PdfHeader';

export default PdfHeader;
