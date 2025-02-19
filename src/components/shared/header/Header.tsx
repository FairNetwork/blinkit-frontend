import './header.scss';
import { useHeaderContent } from '../../../hooks/header';

const Header = () => {
    const content = useHeaderContent();

    return <div className="header">{content}</div>;
};

Header.displayName = 'Header';

export default Header;
