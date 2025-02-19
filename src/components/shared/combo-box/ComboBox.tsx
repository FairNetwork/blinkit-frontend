import './comboBox.scss';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../icon/Icon';

export interface ComboBoxItem {
    id: string;
    icon?: string;
    text: string;
}

interface ComboBoxProps {
    placeholder: string;
    selectedItemId?: string;
    items: ComboBoxItem[];
    onSelect?: (selectedItemId: ComboBoxItem['id']) => void;
}

const ComboBox: FC<ComboBoxProps> = ({ selectedItemId, placeholder, items, onSelect }) => {
    const comboBoxRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);

    const selectedItem = useMemo(() => {
        if (!selectedItemId) {
            return undefined;
        }

        return items.find(({ id }) => id === selectedItemId);
    }, [selectedItemId, items]);

    const body = useMemo(() => {
        return items.map(({ id, icon, text }) => {
            return (
                <div
                    className="combo-box__body__item"
                    key={`combo-box-item--${id}`}
                    style={{
                        backgroundColor:
                            id === selectedItemId ? 'var(--sidebar-active-color' : undefined
                    }}
                    onClick={() => (typeof onSelect === 'function' ? onSelect(id) : undefined)}>
                    {icon && <Icon icon={icon} style={{ width: '20px', textAlign: 'center' }} />}
                    {text}
                </div>
            );
        });
    }, [items, selectedItemId]);

    const handleShow = () => {
        setIsOpen(true);
    };

    const handleHide = () => {
        setIsOpen(false);
    };

    const handleClick = () => {
        isOpen ? handleHide() : handleShow();
    };

    const handleWindowClick = (event: MouseEvent) => {
        if (comboBoxRef.current && !comboBoxRef.current.contains(event.target as Node)) {
            handleHide();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleWindowClick);

        return () => {
            document.removeEventListener('click', handleWindowClick);
        };
    }, [handleWindowClick]);

    return (
        <div className="combo-box" ref={comboBoxRef}>
            <div
                className="combo-box__head"
                onClick={handleClick}
                style={isOpen ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : {}}>
                {!selectedItem ? (
                    <div className="combo-box__head__placeholder">{placeholder}</div>
                ) : (
                    <div className="combo-box__head__item">
                        {selectedItem?.icon && (
                            <Icon
                                icon={selectedItem.icon}
                                style={{ width: '20px', textAlign: 'center' }}
                            />
                        )}
                        {selectedItem.text}
                    </div>
                )}
                <Icon icon="fas fa-chevron-down" onClick={() => {}} />
            </div>
            {isOpen && <div className="combo-box__body">{body}</div>}
        </div>
    );
};

ComboBox.displayName = 'ComboBox';

export default ComboBox;
