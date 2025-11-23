import React, { useState } from 'react';
import { AppStep, AnalysisResult } from './types';
import { Hero } from './components/Hero';
import { InputArea } from './components/InputArea';
import { ResultsView } from './components/ResultsView';
import { optimizeResume } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.LANDING);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleStart = () => {
    setStep(AppStep.INPUT);
  };

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    try {
      const result = await optimizeResume(text);
      setAnalysisResult(result);
      setStep(AppStep.RESULT);
    } catch (error) {
      console.error("Failed to analyze", error);
      alert("AI 服务响应异常，请稍后重试。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep(AppStep.LANDING);
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar for Landing/Input */}
      {step !== AppStep.RESULT && (
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                    R
                  </div>
                  <span className="text-xl font-bold tracking-tight text-gray-900">ResumeAI Pro</span>
                </div>
              </div>
              <div className="flex items-center">
                  <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">登录</a>
              </div>
            </div>
          </div>
        </nav>
      )}

      {step === AppStep.LANDING && (
        <Hero onStart={handleStart} />
      )}

      {step === AppStep.INPUT && (
        <div className="animate-fade-in-up">
            <InputArea onSubmit={handleAnalyze} isLoading={isLoading} />
        </div>
      )}

      {step === AppStep.RESULT && analysisResult && (
        <ResultsView results={analysisResult} onReset={handleReset} />
      )}
      
      {/* Footer */}
       {step !== AppStep.RESULT && (
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} ResumeAI Pro. 专为国际人才打造.
          </p>
        </div>
      </footer>
       )}
    </div>
  );
};

export default App;