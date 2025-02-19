import FileInput from '../../components/shared/file-input/FileInput';
import { usePDFContext } from '../../components/pdf-context/PdfContext';
import './home.scss';

const Home = () => {
    const { addPdf } = usePDFContext();

    const handleSelectFiles = (files: File[]) => {
        const file = files[0];

        if (file && file.type === 'application/pdf') {
            addPdf(file);
        }
    };

    return (
        <div className="home" id="home">
            <div className="home__headline">
                BlinkIt – Blättere durch deine PDFs mit einem Augenblick!
            </div>
            Mit BlinkIt wechselst du PDF-Seiten ganz einfach durch dreimal schnelles Blinzeln. Kein
            Tippen, kein Wischen – nur dein Blick steuert dein Leseerlebnis. Speichere automatisch
            deine zuletzt gelesene Seite, öffne deine Lieblingsdokumente blitzschnell und genieße
            ein völlig neues, freihändiges Lesen.
            <FileInput onSelect={handleSelectFiles} />
        </div>
    );
};

Home.displayName = 'Home';

export default Home;
