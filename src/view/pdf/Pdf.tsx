import './pdf.scss';
import { usePDFContext } from '../../components/pdf-context/PdfContext';
import { usePdfRoute, usePdfViewer } from '../../hooks/pdf';
import { useEffect, useMemo } from 'react';

const Pdf = () => {
    const { getPdfById } = usePDFContext();
    const { canvasRef, loadPdf, nextPage, prevPage, numPages, currentPage } = usePdfViewer();
    const pdfId = usePdfRoute();

    const pdf = useMemo(() => getPdfById(pdfId), [pdfId]);

    useEffect(() => {
        if (pdf) {
            void loadPdf(pdf.data);
        }
    }, [pdf]);

    return (
        <div className="pdf">
            {pdf ? (
                <canvas ref={canvasRef}></canvas>
            ) : (
                <div className="pdf__error">Die Datei konnte nicht geladen werden!</div>
            )}
        </div>
    );
};

Pdf.displayName = 'Pdf';

export default Pdf;
