import './input.scss';
import { ChangeEventHandler, FC, HTMLInputTypeAttribute, ReactNode } from 'react';

interface InputProps {
    placeholder: string;
    leftElement?: ReactNode;
    rightElement?: ReactNode;
    value: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    type?: HTMLInputTypeAttribute;
    isInvalid?: boolean;
}

const Input: FC<InputProps> = ({
    onChange,
    type,
    leftElement,
    rightElement,
    value,
    placeholder,
    isInvalid
}) => {
    return (
        <div
            className="input"
            style={{ borderColor: isInvalid ? 'var(--invalid-border-color)' : undefined }}>
            {leftElement && leftElement}
            <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
            {rightElement && rightElement}
        </div>
    );
};

Input.displayName = 'Input';

export default Input;
