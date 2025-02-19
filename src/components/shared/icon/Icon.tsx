import { CSSProperties, MouseEventHandler } from 'react';

interface IconProps {
    icon: string;
    size?: CSSProperties['fontSize'];
    color?: CSSProperties['color'];
    onClick?: MouseEventHandler<HTMLElement>;
    style?: CSSProperties;
}

const Icon = ({ icon, color, size, style, onClick }: IconProps) => {
    return (
        <i
            className={icon}
            style={{
                ...style,
                fontSize: size,
                color,
                cursor: typeof onClick === 'function' ? 'pointer' : 'default'
            }}
            onClick={onClick}></i>
    );
};

Icon.displayName = 'Icon';

export default Icon;
