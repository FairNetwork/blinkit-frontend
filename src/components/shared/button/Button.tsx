import { CSSProperties, FC, ReactNode } from 'react';
import './button.scss';

interface ButtonProps {
    children: ReactNode;
    onClick?: VoidFunction;
    style?: CSSProperties;
    isDisabled?: boolean;
}

const Button: FC<ButtonProps> = ({ children, isDisabled, onClick, style }) => {
    return (
        <button
            className="button"
            onClick={!isDisabled ? onClick : undefined}
            style={{ ...style, opacity: isDisabled ? 0.5 : undefined }}>
            {children}
        </button>
    );
};

Button.displayName = 'Button';

export default Button;
