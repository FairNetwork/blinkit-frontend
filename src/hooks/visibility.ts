import { useEffect, useState, useCallback, RefObject } from 'react';

export const useVisibility = ({
    elementRef,
    threshold = 0.5,
    containerId
}: {
    elementRef: RefObject<HTMLElement | null>;
    threshold?: number;
    containerId?: string;
}): boolean => {
    const [isVisible, setIsVisible] = useState(false);

    if (!containerId) {
        return true;
    }

    const checkVisibility = useCallback(() => {
        const container = document.getElementById(containerId);
        if (!container || !elementRef.current) return;

        const containerRect = container.getBoundingClientRect();
        const elementRect = elementRef.current.getBoundingClientRect();

        const intersectionWidth = Math.max(
            0,
            Math.min(containerRect.right, elementRect.right) -
                Math.max(containerRect.left, elementRect.left)
        );
        const intersectionHeight = Math.max(
            0,
            Math.min(containerRect.bottom, elementRect.bottom) -
                Math.max(containerRect.top, elementRect.top)
        );

        const intersectionArea = intersectionWidth * intersectionHeight;
        const elementArea = elementRect.width * elementRect.height;

        setIsVisible(intersectionArea / elementArea > threshold);
    }, [containerId, elementRef, threshold]);

    useEffect(() => {
        const container = document.getElementById(containerId);

        if (!container) return;

        container.addEventListener('scroll', checkVisibility);
        checkVisibility();

        return () => {
            container.removeEventListener('scroll', checkVisibility);
        };
    }, [containerId, checkVisibility]);

    return isVisible;
};
