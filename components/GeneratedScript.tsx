import React, { useState, useEffect } from 'react';
import Spinner from './icons/Spinner';
import { translateText } from '../services/geminiService';

interface GeneratedScriptProps {
  script: string;
  isLoading: boolean;
  onClear: () => void;
}

const GeneratedScript: React.FC<GeneratedScriptProps> = ({ script, isLoading, onClear }) => {
  const [portugueseScript, setPortugueseScript] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [displayLanguage, setDisplayLanguage] = useState<'english' | 'portuguese'>('english');
  const [translationError, setTranslationError] = useState<string | null>(null);

  useEffect(() => {
    // Reset translation states when a new script is generated or script is cleared
    if (!isLoading && script) {
        setPortugueseScript('');
        setIsTranslating(false);
        setDisplayLanguage('english');
        setTranslationError(null);
    } else if (!script) {
        // When script is cleared, ensure all related states are reset
        setPortugueseScript('');
        setIsTranslating(false);
        setDisplayLanguage('english');
        setTranslationError(null);
    }
  }, [script, isLoading]);

  const handleTranslate = async () => {
    if (isTranslating || !script) return;

    if (displayLanguage === 'portuguese') {
      // If currently showing Portuguese, switch back to English
      setDisplayLanguage('english');
      setTranslationError(null); // Clear any previous translation error
    } else {
      // Currently showing English, attempt to translate
      if (portugueseScript) {
        // Already translated, just switch to Portuguese
        setDisplayLanguage('portuguese');
      } else {
        // Need to translate
        setIsTranslating(true);
        setTranslationError(null);
        try {
          const translated = await translateText(script, 'Português (Brasil)');
          setPortugueseScript(translated);
          setDisplayLanguage('portuguese');
        } catch (err) {
          setTranslationError('Falha na tradução. Por favor, tente novamente.');
          console.error("Translation error:", err);
        } finally {
          setIsTranslating(false);
        }
      }
    }
  };

  const currentScriptToDisplay = displayLanguage === 'portuguese' ? portugueseScript : script;

    if (isLoading) {
        return (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 shadow-lg w-full min-h-[200px] flex flex-col items-center justify-center">
                <div className="text-gray-400">Gerando seu script...</div>
                <div className="mt-4 text-sm text-gray-500">Os distritos estão trabalhando duro.</div>
            </div>
        );
    }

    if (!script) {
        return (
             <div className="bg-gray-800/50 border border-dashed border-gray-700 rounded-lg p-6 shadow-lg w-full min-h-[200px] flex flex-col items-center justify-center">
                <div className="text-gray-500">Seu script gerado aparecerá aqui.</div>
            </div>
        )
    }

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 shadow-lg w-full min-h-[200px] relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-amber-400 uppercase tracking-wider">
            {isTranslating ? (
                <div className="flex items-center">
                    <Spinner /> Traduzindo...
                </div>
            ) : (
                'CENA GERADA'
            )}
        </h3>
        <div className="flex items-center space-x-2">
            {script && ( // Only show translation button if there's a script
                <button
                    onClick={handleTranslate}
                    disabled={isTranslating}
                    className="px-3 py-1 text-xs font-medium text-center text-amber-400 bg-gray-700 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    {displayLanguage === 'english' ? 'Traduzir para Português' : 'Mostrar Original'}
                </button>
            )}
            {script && ( // Only show clear button if there's a script
                <button
                    onClick={onClear}
                    className="px-3 py-1 text-xs font-medium text-center text-gray-400 bg-gray-700 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
                >
                    Limpar Script
                </button>
            )}
        </div>
      </div>
      {translationError && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 p-2 text-sm rounded-lg mb-4" role="alert">
          {translationError}
        </div>
      )}
      <pre className="whitespace-pre-wrap font-mono text-gray-300 text-sm leading-relaxed">
        {currentScriptToDisplay}
      </pre>
    </div>
  );
};

export default GeneratedScript;