import { FC, ReactNode } from 'react';
import './subHeading.scss';

export type SubHeadingProps = {
    /**
     * The content of the card.
     */
    children: ReactNode;
    /**
     * The headline of the group.
     */
    heading?: string;
};

const SubHeading: FC<SubHeadingProps> = ({ children, heading }) => {
    return (
        <div className="sub-heading">
            {heading && <div className="sub-heading__heading">{heading}</div>}
            {children}
        </div>
    );
};

SubHeading.displayName = 'SubHeading';

export default SubHeading;
