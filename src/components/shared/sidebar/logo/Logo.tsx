import './logo.scss';
import { FC, ReactNode, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
    /**
     * Optional content on the right side of the logo.
     */
    children?: ReactNode;
    /**
     * The source of the logo.
     */
    src: string;
}

const Logo: FC<LogoProps> = ({ src, children }) => {
    const navigate = useNavigate();

    const clickCountRef = useRef(0);
    const timeoutRef = useRef<number>(undefined);

    const handleClick = () => {
        clickCountRef.current++;

        window.clearTimeout(timeoutRef.current);

        timeoutRef.current = window.setTimeout(() => {
            clickCountRef.current = 0;
        }, 300);

        if (clickCountRef.current === 10) {
            navigate('/secret');
        }
    };

    return (
        <div className="logo" onClick={handleClick}>
            <img src={src} alt="Sidebar logo" />
            {children}
        </div>
    );
};

Logo.displayName = 'Logo';

export default Logo;
