import FileInput from '../../components/shared/file-input/FileInput';
import './home.scss';
import { generatePdfPreview, getPdfPageCount } from '../../utils/pdf';
import { useEffect, useState } from 'react';
import { PDF } from '../../types/pdf';

const Home = () => {
    const [pdfList, setPdfList] = useState<PDF[]>([]);

    useEffect(() => {
        const storedPdfs = localStorage.getItem('pdfFiles');

        if (storedPdfs) {
            setPdfList(JSON.parse(storedPdfs));
        }
    }, []);

    const handleSelectFiles = (files: File[]) => {
        const file = files[0];

        if (file && file.type === 'application/pdf') {
            const reader = new FileReader();

            reader.onloadend = async () => {
                const base64Data = reader.result as string;
                const preview = await generatePdfPreview(base64Data);
                const pages = await getPdfPageCount(base64Data);
                const newPdfList: PDF[] = [
                    ...pdfList,
                    {
                        name: file.name,
                        data: base64Data,
                        pages,
                        currentPage: 1,
                        previewUrl: preview
                    }
                ];
                setPdfList(newPdfList);

                localStorage.setItem('pdfFiles', JSON.stringify(newPdfList));
            };

            reader.readAsDataURL(file);
        }
    };

    console.log('TEST', pdfList);

    return (
        <div className="home" id="home">
            <div className="home__headline">Home</div>
            <FileInput onSelect={handleSelectFiles} />
        </div>
    );
};

Home.displayName = 'Home';

export default Home;
