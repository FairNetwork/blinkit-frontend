import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { PDF } from '../../types/pdf';
import { v4 as uuidv4 } from 'uuid';
import {
    addPdfToDb,
    getAllPdfs,
    getPdfPageCount,
    removePdfFromDb,
    updatePdfInDb
} from '../../utils/pdf';

interface PDFContextType {
    pdfList: PDF[];
    addPdf: (file: File) => void;
    removePdf: (id: string) => void;
    updatePdf: (id: string, updatedPdf: PDF) => void;
    getPdfById: (id: string) => PDF | undefined;
}

const PDFContext = createContext<PDFContextType | undefined>(undefined);

interface PDFProviderProps {
    children: ReactNode;
}

export const PDFProvider: React.FC<PDFProviderProps> = ({ children }) => {
    const [pdfList, setPdfList] = useState<PDF[]>([]);

    useEffect(() => {
        const loadPdfs = async () => {
            const storedPdfs = await getAllPdfs();
            setPdfList(storedPdfs);
        };

        void loadPdfs();
    }, []);

    const addPdf = async (file: File) => {
        if (file && file.type === 'application/pdf') {
            const reader = new FileReader();

            reader.onloadend = async () => {
                const base64Data = reader.result as string;
                const pages = await getPdfPageCount(base64Data);

                const newPdf: PDF = {
                    id: uuidv4(),
                    name: file.name.replace('.pdf', ''),
                    data: base64Data,
                    pages,
                    currentPage: 1
                };

                await addPdfToDb(newPdf);

                setPdfList((prev) => [...prev, newPdf]);
            };

            reader.readAsDataURL(file);
        }
    };

    const removePdf = async (id: string) => {
        await removePdfFromDb(id);

        setPdfList((prev) => prev.filter((pdf) => pdf.id !== id));
    };

    const updatePdf = async (id: string, updatedPdf: PDF) => {
        await updatePdfInDb(updatedPdf);

        setPdfList((prev) => prev.map((pdf) => (pdf.id === id ? updatedPdf : pdf)));
    };

    const getPdfById = (id: string): PDF | undefined => {
        return pdfList.find((pdf) => pdf.id === id);
    };

    return (
        <PDFContext.Provider value={{ pdfList, addPdf, removePdf, updatePdf, getPdfById }}>
            {children}
        </PDFContext.Provider>
    );
};

export const usePDFContext = (): PDFContextType => {
    const context = useContext(PDFContext);

    if (!context) {
        throw new Error('usePDFContext must be used within a PDFProvider');
    }

    return context;
};
