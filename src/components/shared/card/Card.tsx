import { FC, ReactNode, useRef } from 'react';
import Button from '../button/Button';
import './card.scss';
import {useVisibility} from "../../../hooks/visibility";

export type CardProps = {
    /**
     * The aspect ratio.
     */
    aspectRatio?: number;
    /**
     * The text of the badge.
     */
    badgeText?: string;
    /**
     * The text of the button.
     */
    buttonText?: string;
    /**
     * The content of the card.
     */
    children: ReactNode;
    /**
     * The id of the container.
     */
    containerId?: string;
    /**
     * Function to be executed when the button is clicked.
     */
    onButtonClick?: () => void;
    /**
     * The width of the card.
     */
    width?: string;
};

const Card: FC<CardProps> = ({
    children,
    buttonText,
    aspectRatio,
    containerId,
    onButtonClick,
    badgeText,
    width
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const isVisible = useVisibility({ elementRef: ref, containerId });

    return (
        <div
            className="card"
            style={{ width, opacity: isVisible ? 1 : 0.6, aspectRatio }}
            ref={ref}>
            {badgeText && <div className="card__badge">{badgeText}</div>}
            <div className="card__wrapper">
                <div className="card__wrapper__content">{children}</div>
                {buttonText && (
                    <div className="card__button">
                        <Button onClick={onButtonClick} style={{ width: '100%' }}>
                            {buttonText}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

Card.displayName = 'Card';

export default Card;
