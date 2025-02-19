import './footer.scss';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FOOTER } from '../../../constants/footer';

const Footer = () => {
    const navigate = useNavigate();

    const content = useMemo(() => {
        return FOOTER.map(({ text, route }) => {
            return (
                <div className="footer__item" onClick={() => navigate(route)}>
                    {text}
                </div>
            );
        });
    }, []);

    return <div className="footer">{content}</div>;
};

Footer.displayName = 'Footer';

export default Footer;
