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
            <div className="home__headline">Home</div>
            <FileInput onSelect={handleSelectFiles} />
        </div>
    );
};

Home.displayName = 'Home';

export default Home;
