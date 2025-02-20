import './pdfHeader.scss';
import { useIsMobile } from '../../../../hooks/environment';
import Icon from '../../icon/Icon';
import { useSidebarProvider } from '../../sidebar/SidebarProvider';
import { usePDFContext } from '../../../pdf-context/PdfContext';
import { usePdfRoute } from '../../../../hooks/pdf';
import { useMemo } from 'react';
import { EYE_STATE } from '../../../../types/pdf';

const PdfHeader = () => {
    const isMobile = useIsMobile();
    const { updateIsOpen } = useSidebarProvider();
    const { removePdf, getPdfById, eyeState } = usePDFContext();
    const pdfId = usePdfRoute();

    const handleIconClick = () => {
        removePdf(pdfId);
    };

    const pdf = getPdfById(pdfId);

    const eyeColor = useMemo(() => {
        switch (eyeState) {
            case EYE_STATE.SUCCESSFUL:
                return 'green';
            case EYE_STATE.RECORDING:
                return 'yellow';
            case EYE_STATE.PAUSED:
                return 'red';
            case EYE_STATE.NONE:
            default:
                return 'grey';
        }
    }, [eyeState]);

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
            <div className="pdf-header__right-wrapper">
                <Icon icon="fas fa-eye" color={eyeColor} />
                <div className="pdf-header__right-wrapper__pages">
                    {pdf?.currentPage}/{pdf?.pages}
                </div>
                <Icon icon="fa fa-trash" onClick={handleIconClick} />
            </div>
        </div>
    );
};

PdfHeader.displayName = 'PdfHeader';

export default PdfHeader;
