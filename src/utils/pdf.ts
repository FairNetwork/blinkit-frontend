import pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = 'https://d2v5g.csb.app/pdf.worker.js';

export const getPdfPageCount = async (base64Data: string): Promise<number> => {
    const loadingTask = pdfjs.getDocument({ data: atob(base64Data.split(',')[1]) });
    const pdf = await loadingTask.promise;
    return pdf.numPages;
};

export const generatePdfPreview = async (pdfData: string): Promise<string> => {
    const loadingTask = pdfjs.getDocument({ data: atob(pdfData.split(',')[1]) });
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);

    const scale = 1;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas Context nicht verfügbar');

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;

    return canvas.toDataURL('image/png');
};
