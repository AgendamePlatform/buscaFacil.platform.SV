import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-lightTheme-background dark:bg-darkTheme-background">
            <div className="flex flex-row gap-2">
                <div className="w-11 h-11 rounded-full bg-darkTheme-icono border-dark-tremor-brand-subtle animate-bounce"></div>
                <div className="w-11 h-11 rounded-full bg-blue-300 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-11 h-11 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
            </div>
        </div>
    );
};

export default Loader;
