
import React from 'react';
import { CodeIcon } from './icons/CodeIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-800 shadow-md border-b border-dark-700">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center gap-4">
        <div className="bg-brand-primary p-2 rounded-lg">
          <CodeIcon className="w-8 h-8 text-white" />
        </div>
        <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">Gemini AI Code Review Agent</h1>
            <p className="text-sm text-gray-400">Your professional AI partner for pull request reviews</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
