import React, { FC, ReactNode } from 'react';
import './section.scss';

export type SectionProps = {
    /**
     * The background color of the section.
     */
    backgroundColor: string;
    /**
     * The content that should be displayed inside the section.
     */
    children?: ReactNode;
    /**
     * The text color of the section.
     */
    textColor: string;
};

const Section: FC<SectionProps> = ({ children, textColor, backgroundColor }) => {
    return (
        <div className="section" style={{ color: textColor, backgroundColor }}>
            {children}
        </div>
    );
};

Section.displayName = 'Section';

export default Section;
