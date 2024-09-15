import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MarkdownForm: React.FC<{ onChange: (value: string) => void }> = ({ onChange }) => {
    const [value, setValue] = useState<string>('');

    const handleQuillChange = (content: string) => {
        setValue(content);
        onChange(content);
    };

    return (
        <div>
            <ReactQuill
                value={value}
                onChange={handleQuillChange}
                className="rounded-md h-auto"
                modules={{
                    toolbar: {
                        container: [
                            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'color': [] }, { 'background': [] }],
                            ['link',],
                            ['clean']
                        ],
                    },
                }}
                style={{
                    height: 'auto',
                    fontSize: '16px',
                    border: 'none', // Elimina el borde exterior
                }}
            />
        </div>
    );
};

export default MarkdownForm;
