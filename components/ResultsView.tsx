import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { Button } from './Button';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Check, X, Download, Lock, Columns, Maximize2 } from 'lucide-react';
import { marked } from 'marked';

interface ResultsViewProps {
  results: AnalysisResult;
  onReset: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ results, onReset }) => {
  // 'split' = Side by Side (English Left, Chinese Right)
  // 'single' = Tabbed view (one at a time)
  const [viewMode, setViewMode] = useState<'split' | 'single'>('split');
  const [activeTab, setActiveTab] = useState<'english' | 'chinese'>('english');
  const [isLocked, setIsLocked] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const scoreData = [{ name: 'Score', value: results.atsScore, fill: results.atsScore > 80 ? '#16a34a' : results.atsScore > 60 ? '#ca8a04' : '#dc2626' }];

  const handleUnlock = () => {
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    setTimeout(() => {
        setIsLocked(false);
        setShowPaymentModal(false);
    }, 1500);
  };

  const renderPaper = (content: string, title: string) => (
    <div className="flex flex-col gap-4 min-w-[210mm]">
      <h4 className="text-center font-bold text-gray-500 uppercase tracking-wider text-xs sticky top-0 z-10 py-2 bg-gray-100/90 backdrop-blur-sm rounded-full mx-auto px-6 shadow-sm border border-gray-200">
        {title}
      </h4>
      <div className="bg-white shadow-xl border border-gray-200 w-[210mm] min-h-[297mm] p-[20mm] md:p-[25mm] mx-auto transition-all hover:shadow-2xl">
        <article 
          className="prose prose-sm max-w-none font-serif prose-headings:font-sans prose-headings:font-bold prose-h1:text-2xl prose-h2:text-lg prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2 prose-h2:mt-4 prose-p:text-gray-800 prose-p:leading-relaxed prose-li:marker:text-gray-400"
          dangerouslySetInnerHTML={{ __html: marked.parse(content || '') as string }} 
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-0 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm flex-shrink-0 z-30 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                R
            </div>
            <h1 className="text-lg font-bold text-gray-900 hidden sm:block">简历分析报告</h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="text-sm text-gray-500 hidden sm:inline-block">ATS Score: <span className="font-bold text-gray-900">{results.atsScore}</span></span>
             <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
             <Button variant="outline" size="sm" onClick={onReset}>重新开始</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
          
          {/* Left Column: Analysis Sidebar (Scrollable) */}
          <div className="w-80 md:w-96 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto hidden lg:block z-20 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
             <div className="p-6 space-y-8">
                {/* Score */}
                <div className="text-center">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">ATS 兼容性评分</h2>
                  <div className="h-40 w-full flex justify-center items-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadialBarChart innerRadius="70%" outerRadius="100%" barSize={12} data={scoreData} startAngle={90} endAngle={-270}>
                        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                        <RadialBar background dataKey="value" cornerRadius={10} />
                      </RadialBarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-4xl font-bold text-gray-900">{results.atsScore}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 px-4">
                    {results.atsScore > 80 ? "优秀！简历结构清晰，关键词丰富。" : "建议根据右侧优化版本调整格式与用词。"}
                  </p>
                </div>

                <hr className="border-gray-100" />

                {/* Improvements */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center text-sm">
                    <span className="w-1 h-5 bg-blue-500 rounded-full mr-2"></span>
                    关键优化点
                  </h3>
                  <ul className="space-y-3">
                    {results.keyImprovements.map((imp, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        {imp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Keywords */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center text-sm">
                     <span className="w-1 h-5 bg-red-500 rounded-full mr-2"></span>
                     补充关键词
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.missingKeywords.map((kw, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-red-50 text-red-600 text-xs rounded-full border border-red-100 font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
             </div>
          </div>

          {/* Right Column: Document View (Main Area) */}
          <div className="flex-1 flex flex-col min-w-0 bg-gray-100/80">
            
            {/* Toolbar */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm z-20">
                {/* View Switcher */}
                <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                    <button 
                        onClick={() => setViewMode('split')}
                        className={`p-1.5 rounded-md transition-all flex items-center gap-2 text-xs font-medium ${viewMode === 'split' ? 'bg-white text-gray-900 shadow ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900'}`}
                        title="左右对照模式"
                    >
                        <Columns className="w-4 h-4" />
                        <span className="hidden sm:inline">对照模式</span>
                    </button>
                    <button 
                        onClick={() => setViewMode('single')}
                        className={`p-1.5 rounded-md transition-all flex items-center gap-2 text-xs font-medium ${viewMode === 'single' ? 'bg-white text-gray-900 shadow ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-900'}`}
                        title="单页专注模式"
                    >
                        <Maximize2 className="w-4 h-4" />
                         <span className="hidden sm:inline">专注模式</span>
                    </button>
                </div>

                {/* Mobile Tab Switcher (Only visible in single mode) */}
                {viewMode === 'single' && (
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg ml-4">
                        <button 
                            onClick={() => setActiveTab('english')}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activeTab === 'english' ? 'bg-white text-blue-600 shadow' : 'text-gray-500'}`}
                        >
                            English
                        </button>
                        <button 
                            onClick={() => setActiveTab('chinese')}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activeTab === 'chinese' ? 'bg-white text-blue-600 shadow' : 'text-gray-500'}`}
                        >
                            中文
                        </button>
                    </div>
                )}
                
                <div className="flex-1"></div>

                <Button size="sm" onClick={handleUnlock} variant={isLocked ? 'secondary' : 'primary'} className="shadow-sm">
                    {isLocked ? <><Lock className="w-3 h-3 mr-2"/> 解锁下载</> : <><Download className="w-3 h-3 mr-2"/> 导出 PDF</>}
                </Button>
            </div>

            {/* Scrollable Document Area */}
            {/* Key logic: Parent scroll container for simultaneous scrolling */}
            <div className="flex-1 overflow-auto custom-scrollbar relative p-6 md:p-10">
                <div className={`mx-auto transition-all duration-500 ease-in-out ${viewMode === 'split' ? 'flex gap-8 justify-start lg:justify-center min-w-max' : 'max-w-[210mm]'}`}>
                    
                    {/* English Paper */}
                    {(viewMode === 'split' || activeTab === 'english') && 
                        renderPaper(results.optimizedContentEnglish, "English Optimized")
                    }

                    {/* Chinese Paper */}
                    {(viewMode === 'split' || activeTab === 'chinese') && 
                        renderPaper(results.optimizedContentChinese, "中文翻译版")
                    }

                </div>

                {/* Paywall Overlay */}
                {isLocked && (
                    <div className="absolute inset-x-0 bottom-0 h-[400px] bg-gradient-to-t from-gray-100 via-gray-100/95 to-transparent flex flex-col items-center justify-end pb-12 pointer-events-none">
                        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/50 max-w-md mx-auto pointer-events-auto transform transition-transform hover:scale-105">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600 shadow-inner">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">解锁完整 Word/PDF</h3>
                            <p className="text-gray-600 mb-6 text-center text-sm">
                                当前仅为预览模式。支付后可获取 ATS 完美格式文档、去除水印并支持无限次修改。
                            </p>
                            <Button size="lg" className="w-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 border-none" onClick={handleUnlock}>
                                立即解锁 (¥9.9)
                            </Button>
                        </div>
                    </div>
                )}
            </div>
          </div>
      </main>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowPaymentModal(false)}></div>
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden relative z-10 animate-fade-in-up">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-900">升级专业版</h3>
                    <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div 
                        className="group border-2 border-blue-600 bg-blue-50/30 rounded-xl p-4 relative cursor-pointer transition-all hover:shadow-md"
                        onClick={handlePayment}
                    >
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg shadow-sm">
                            限时优惠
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-gray-900 group-hover:text-blue-700">单次深度优化</p>
                                <p className="text-sm text-gray-500">包含中英双语 Word 下载</p>
                            </div>
                            <div className="text-right">
                                <span className="block text-2xl font-bold text-gray-900">¥9.9</span>
                                <span className="text-xs text-gray-400 line-through">原价 ¥29.9</span>
                            </div>
                        </div>
                    </div>

                        <div 
                        className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all hover:shadow-sm"
                            onClick={handlePayment}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-gray-900">求职季月卡</p>
                                <p className="text-sm text-gray-500">30天内无限次优化</p>
                            </div>
                            <div className="text-right">
                                <span className="block text-2xl font-bold text-gray-900">¥29</span>
                                <span className="text-xs text-gray-500">/月</span>
                            </div>
                        </div>
                    </div>
                    
                    <Button className="w-full mt-4 h-12 text-lg shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-none" onClick={handlePayment}>
                        确认支付
                    </Button>
                    <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-2">
                        <Lock className="w-3 h-3" /> 支付安全由 Stripe 提供技术支持
                    </p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
