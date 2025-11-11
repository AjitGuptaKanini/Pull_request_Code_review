import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SparklesIcon } from './icons/SparklesIcon';


interface ReviewOutputProps {
  review: string;
  isLoading: boolean;
  error: string | null;
}

const ReviewOutput: React.FC<ReviewOutputProps> = ({ review, isLoading, error }) => {
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
          <div className="w-12 h-12 border-4 border-dark-600 border-t-brand-primary rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-semibold">Analyzing your code...</p>
          <p className="text-sm">The AI is reviewing your diff. This may take a moment.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-red-400">
          <h3 className="text-xl font-bold mb-2">An Error Occurred</h3>
          <p className="bg-red-900/50 p-4 rounded-md font-mono text-sm">{error}</p>
        </div>
      );
    }
    
    if (review) {
      return (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          children={review}
          className="prose prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none p-6"
          components={{
            h1: ({node, ...props}) => <h1 className="text-2xl font-bold border-b border-dark-700 pb-2 mb-4" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-xl font-bold border-b border-dark-700 pb-2 mb-4" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-lg font-semibold" {...props} />,
            p: ({node, ...props}) => <p className="leading-relaxed" {...props} />,
            code: ({node, inline, className, children, ...props}) => {
                const match = /language-(\w+)/.exec(className || '')
                return !inline ? (
                  <pre className="bg-dark-900/70 p-4 rounded-md overflow-x-auto">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className="bg-dark-700 text-brand-secondary px-1 py-0.5 rounded" {...props}>
                    {children}
                  </code>
                )
            },
            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-dark-600 pl-4 italic" {...props} />,
          }}
        />
      )
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <SparklesIcon className="w-16 h-16 mb-4 text-dark-600" />
        <h3 className="text-xl font-semibold">AI Code Review</h3>
        <p className="max-w-md">Your professional code review will appear here once you submit a diff.</p>
      </div>
    );
  };
  
  return (
    <div className="bg-dark-800 rounded-lg border border-dark-700 shadow-lg overflow-y-auto min-h-[400px] lg:h-full">
        {renderContent()}
    </div>
  );
};

export default ReviewOutput;