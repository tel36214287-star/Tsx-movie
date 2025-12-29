import React, { useState, useCallback } from 'react';
import StarLayout from './components/StarLayout';
import ScriptEditor from './components/ScriptEditor';
import GeneratedScript from './components/GeneratedScript';
import { generateScript } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!prompt || isLoading) return;
    setIsLoading(true);
    setError(null);
    setGeneratedScript(''); // Clear previous script on new submission
    try {
      const script = await generateScript(prompt);
      setGeneratedScript(script);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  const clearScript = useCallback(() => {
    setGeneratedScript('');
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans p-4 sm:p-6 lg:p-8 overflow-hidden">
      <main className="container mx-auto max-w-7xl">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wider uppercase" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
            <span className="text-amber-400">District</span> Script Writer
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Harnessing the Spark of Panem's Districts</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <StarLayout />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <ScriptEditor
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
            {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">{error}</div>}
            <GeneratedScript script={generatedScript} isLoading={isLoading} onClear={clearScript} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;