
import React from 'react';

interface GeneratedScriptProps {
  script: string;
  isLoading: boolean;
}

const GeneratedScript: React.FC<GeneratedScriptProps> = ({ script, isLoading }) => {
    if (isLoading) {
        return (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 shadow-lg w-full min-h-[200px] flex flex-col items-center justify-center">
                <div className="text-gray-400">Generating your script...</div>
                <div className="mt-4 text-sm text-gray-500">The districts are hard at work.</div>
            </div>
        );
    }

    if (!script) {
        return (
             <div className="bg-gray-800/50 border border-dashed border-gray-700 rounded-lg p-6 shadow-lg w-full min-h-[200px] flex flex-col items-center justify-center">
                <div className="text-gray-500">Your generated script will appear here.</div>
            </div>
        )
    }

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 shadow-lg w-full min-h-[200px]">
      <h3 className="text-sm font-medium text-amber-400 uppercase tracking-wider mb-4">Generated Scene</h3>
      <pre className="whitespace-pre-wrap font-mono text-gray-300 text-sm leading-relaxed">
        {script}
      </pre>
    </div>
  );
};

export default GeneratedScript;
