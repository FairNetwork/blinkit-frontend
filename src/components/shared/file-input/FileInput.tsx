import React, { DragEvent } from 'react';
import Icon from '../../shared/icon/Icon';
import { selectFiles } from '../../../utils/selectFiles';
import './fileInput.scss';

interface FileInputProps {
    onSelect: (files: File[]) => void;
}

const FileInput = ({ onSelect }: FileInputProps) => {
    const handleUploadClick = async () => {
        const files = await selectFiles({ multiple: true, type: 'image/*' });

        if (typeof onSelect === 'function' && files) {
            onSelect(files);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const draggedFiles = Array.from(e.dataTransfer.files) as File[];

        if (typeof onSelect === 'function') {
            onSelect(draggedFiles);
        }
    };

    return (
        <div
            className="file-input"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => void handleDrop(e)}>
            <Icon icon="fas fa-file-arrow-up" size={30} />
            <div className="file-input__text">
                Drag your file(s) here or&nbsp;
                <span onClick={() => void handleUploadClick()}>browse</span>
            </div>
        </div>
    );
};

FileInput.displayName = 'FileInput';

export default FileInput;
