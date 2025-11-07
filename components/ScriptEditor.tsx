
import React from 'react';
import Spinner from './icons/Spinner';

interface ScriptEditorProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const ScriptEditor: React.FC<ScriptEditorProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 shadow-lg w-full">
      <label htmlFor="script-prompt" className="block mb-2 text-sm font-medium text-amber-400 uppercase tracking-wider">
        Scene Prompt
      </label>
      <textarea
        id="script-prompt"
        rows={6}
        className="block p-2.5 w-full text-sm text-gray-300 bg-gray-900 rounded-md border border-gray-600 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200 placeholder-gray-500 font-mono resize-none"
        placeholder="e.g., A tense standoff in the ruins of District 12..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isLoading}
      ></textarea>
      <button
        onClick={onSubmit}
        disabled={isLoading || !prompt}
        className="mt-4 w-full inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-black bg-amber-400 rounded-lg hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isLoading ? (
          <>
            <Spinner />
            Generating...
          </>
        ) : (
          'Write Script'
        )}
      </button>
    </div>
  );
};

export default ScriptEditor;
