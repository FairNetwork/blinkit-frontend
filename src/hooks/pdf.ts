import { useLocation } from 'react-router-dom';
import pdfjs from 'pdfjs-dist';
import { useRef, useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = 'https://d2v5g.csb.app/pdf.worker.js';

export const usePdfRoute = () => {
    const location = useLocation();

    const route = location.pathname;

    const startIndex = route.indexOf('/') + 1;
    const endIndex = route.indexOf('/', startIndex);

    if (endIndex === -1) {
        return route.substring(startIndex).toLowerCase();
    } else {
        return route.substring(startIndex, endIndex).toLowerCase();
    }
};

export const usePdfViewer = () => {
    const [numPages, setNumPages] = useState<number | null>(null);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const pdfDocRef = useRef<pdfjs.PDFDocumentProxy | null>(null);
    const currentPage = useRef(1);

    const loadPdf = async (base64: string, page: number) => {
        try {
            const base64Data = base64.split(',').pop() ?? '';

            const byteArray = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

            const loadingTask = pdfjs.getDocument({ data: byteArray });
            const pdf = await loadingTask.promise;
            pdfDocRef.current = pdf;
            setNumPages(pdf.numPages);

            void renderPage(page);
        } catch (error) {
            console.error('Fehler beim Laden der PDF:', error);
        }
    };

    const renderPage = async (pageNum: number) => {
        if (!pdfDocRef.current || !canvasRef.current) return;

        const page = await pdfDocRef.current.getPage(pageNum);
        const container = canvasRef.current.parentElement;
        if (!container) return;

        const canvas = canvasRef.current;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const viewport = page.getViewport({ scale: 1 });
        const pdfWidth = viewport.width;
        const pdfHeight = viewport.height;

        const scale = Math.min(containerWidth / pdfWidth, containerHeight / pdfHeight);
        const scaledViewport = page.getViewport({ scale });

        const context = canvas.getContext('2d');
        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        const renderContext = {
            canvasContext: context!,
            viewport: scaledViewport
        };

        try {
            await page.render(renderContext).promise;
            currentPage.current = pageNum;
        } catch (error) {
            console.error('Fehler beim Rendern der Seite:', error);
        }
    };

    const nextPage = () => {
        if (pdfDocRef.current && currentPage.current < pdfDocRef.current.numPages) {
            currentPage.current += 1;
            void renderPage(currentPage.current);
        }
    };

    const prevPage = () => {
        if (currentPage.current > 1) {
            currentPage.current -= 1;
            void renderPage(currentPage.current);
        }
    };

    return { canvasRef, loadPdf, nextPage, prevPage, numPages, currentPage };
};
