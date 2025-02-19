import pdfjs from 'pdfjs-dist';
import { PDF } from '../types/pdf';

pdfjs.GlobalWorkerOptions.workerSrc = 'https://d2v5g.csb.app/pdf.worker.js';

const DB_NAME = 'pdfDatabase';
const STORE_NAME = 'pdfs';

export const getPdfPageCount = async (base64Data: string): Promise<number> => {
    const loadingTask = pdfjs.getDocument({ data: atob(base64Data.split(',')[1]) });
    const pdf = await loadingTask.promise;
    return pdf.numPages;
};

export const openDb = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onerror = (event) => {
            reject('Failed to open DB');
        };

        request.onsuccess = (event) => {
            resolve((event.target as IDBRequest).result);
        };
    });
};

export const getAllPdfs = async () => {
    const db = await openDb();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    return new Promise<PDF[]>((resolve, reject) => {
        const request = store.getAll();
        request.onerror = () => reject('Failed to fetch PDFs');
        request.onsuccess = () => resolve(request.result);
    });
};

export const addPdfToDb = async (pdf: PDF) => {
    const db = await openDb();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    return new Promise<void>((resolve, reject) => {
        const request = store.add(pdf); // Hier wird die ID genutzt
        request.onerror = () => reject('Failed to add PDF');
        request.onsuccess = () => resolve();
    });
};

export const removePdfFromDb = async (id: string) => {
    const db = await openDb();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    return new Promise<void>((resolve, reject) => {
        const request = store.delete(id); // Löschen mit der ID
        request.onerror = () => reject('Failed to remove PDF');
        request.onsuccess = () => resolve();
    });
};

export const updatePdfInDb = async (pdf: PDF) => {
    const db = await openDb();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    return new Promise<void>((resolve, reject) => {
        const request = store.put(pdf); // Hier wird die ID für die Aktualisierung verwendet
        request.onerror = () => reject('Failed to update PDF');
        request.onsuccess = () => resolve();
    });
};
