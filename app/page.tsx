'use client';

import { useState } from 'react';

type Language = 'JavaScript' | 'Python' | 'Java' | 'Other';

interface ExplanationResult {
  simpleExplanation: string;
  whatItDoes: string;
  realWorldAnalogy: string;
}

export default function Home() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<Language>('JavaScript');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ExplanationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExplain = async () => {
    if (!code.trim()) {
      setError('Please paste some code first');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error('Failed to explain code');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-white overflow-hidden flex flex-col">
      <div className="container mx-auto px-6 py-8 max-w-7xl flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="mb-6 text-center flex-shrink-0">
          <h1 className="text-5xl font-light text-slate-900 mb-3 tracking-tight">
            Code Explainer
          </h1>
          <p className="text-slate-500 text-base font-light">
            Understand your code with clear explanations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0 overflow-hidden">
          {/* Input Section */}
          <div className="space-y-6 flex flex-col min-h-0">
            <div className="flex-shrink-0">
              <label htmlFor="language" className="block text-xs font-medium text-slate-600 mb-2 uppercase tracking-wider">
                Language
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 bg-white text-slate-900 text-sm transition-colors"
              >
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              <label htmlFor="code" className="block text-xs font-medium text-slate-600 mb-2 uppercase tracking-wider flex-shrink-0">
                Code
              </label>
              <textarea
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                className="w-full flex-1 px-4 py-4 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 font-mono text-sm bg-white text-slate-900 resize-none leading-relaxed transition-colors overflow-y-auto"
              />
            </div>

            <div className="flex-shrink-0 space-y-4">
              <button
                onClick={handleExplain}
                disabled={loading}
                className="w-full bg-slate-900 text-white font-medium py-3 px-6 rounded-md hover:bg-slate-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Explaining...
                  </span>
                ) : (
                  'Explain Code'
                )}
              </button>

              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-md text-red-700 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Output Section */}
          <div className="flex flex-col min-h-0 overflow-hidden">
            <h2 className="text-xs font-medium text-slate-600 mb-6 uppercase tracking-wider flex-shrink-0">
              Explanation
            </h2>

            <div className="flex-1 overflow-y-auto">
              {!result && !loading && (
                <div className="flex items-center justify-center h-full text-slate-300 border border-dashed border-slate-200 rounded-md">
                  <div className="text-center">
                    <svg className="mx-auto h-10 w-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <p className="text-sm">Explanation will appear here</p>
                  </div>
                </div>
              )}

              {result && (
                <div className="space-y-5 pr-2">
                  {/* Simple Explanation */}
                  <div className="border-l-2 border-slate-300 pl-5 pb-5">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wider">
                      Simple Explanation
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-sm">{result.simpleExplanation}</p>
                  </div>

                  {/* What This Code Does */}
                  <div className="border-l-2 border-slate-300 pl-5 pb-5">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wider">
                      What This Code Does
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-sm">{result.whatItDoes}</p>
                  </div>

                  {/* Real-World Analogy */}
                  <div className="border-l-2 border-slate-300 pl-5">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wider">
                      Real-World Analogy
                    </h3>
                    <p className="text-slate-700 leading-relaxed text-sm">{result.realWorldAnalogy}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
