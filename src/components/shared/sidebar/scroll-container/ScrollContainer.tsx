import { FC, ReactNode } from 'react';
import './scrollContainer.scss';

export type ScrollContainerProps = {
    children: ReactNode;
};

const ScrollContainer: FC<ScrollContainerProps> = ({ children }) => {
    return <div className="scroll-container">{children}</div>;
};

ScrollContainer.displayName = 'ScrollContainer';

export default ScrollContainer;
