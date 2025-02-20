import './pdf.scss';
import { usePDFContext } from '../../components/pdf-context/PdfContext';
import { usePdfRoute, usePdfViewer } from '../../hooks/pdf';
import { useEffect, useMemo, useRef } from 'react';
import { useBlinkDetection } from '../../hooks/video';

const Pdf = () => {
    const { getPdfById, updateCurrentPage } = usePDFContext();
    const { canvasRef, loadPdf, nextPage } = usePdfViewer();
    const pdfId = usePdfRoute();

    const pdf = useMemo(() => getPdfById(pdfId), [pdfId, getPdfById]);

    useEffect(() => {
        if (pdf) {
            void loadPdf(pdf.data, pdf.currentPage);
        }
    }, [pdf]);

    const handleTripleBlink = () => {
        nextPage();
        updateCurrentPage(pdfId, (pdf?.currentPage ?? 0) + 1);
    };

    const videoRef = useBlinkDetection(handleTripleBlink);

    return (
        <div className="pdf">
            <video ref={videoRef} autoPlay muted style={{ width: '100%', height: 'auto' }} />
            {pdf ? (
                <div className="pdf__content">
                    <canvas key={pdf.id} ref={canvasRef}></canvas>
                </div>
            ) : (
                <div className="pdf__error">Die Datei konnte nicht geladen werden!</div>
            )}
        </div>
    );
};

Pdf.displayName = 'Pdf';

export default Pdf;
