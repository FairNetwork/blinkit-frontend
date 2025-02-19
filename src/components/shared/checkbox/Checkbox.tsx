import { ChangeEventHandler, FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './checkbox.scss';

interface CheckboxProps {
    label: string;
    isChecked: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox: FC<CheckboxProps> = ({ onChange, label, isChecked }) => {
    const uuid = uuidv4();

    return (
        <div className="checkbox">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
                id={`checkbox--${uuid}`}
            />
            <label htmlFor={`checkbox--${uuid}`}>{label}</label>
        </div>
    );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
