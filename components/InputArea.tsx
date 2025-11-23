import React, { useState } from 'react';
import { Button } from './Button';
import { FileText, ArrowRight, AlertCircle } from 'lucide-react';

interface InputAreaProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simple text file reading. Real production would use pdf-parse server side.
    if (file.type === "text/plain" || file.name.endsWith('.md') || file.name.endsWith('.txt')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                setText(event.target.result as string);
            }
        };
        reader.readAsText(file);
    } else {
        alert("目前仅支持 .txt 或 .md 文件，或者请直接粘贴文本内容。");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">上传或粘贴简历</h2>
          <p className="mt-2 text-gray-600">
            请复制粘贴您的当前简历内容，我们将为您进行深度分析与优化。
          </p>
        </div>
        
        <div className="p-6 md:p-8 bg-gray-50">
            <div className="mb-4 flex justify-end">
                 <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <FileText className="w-4 h-4 mr-2" />
                    导入文本文件
                    <input type="file" className="hidden" onChange={handleFileChange} accept=".txt,.md" />
                </label>
            </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="张三&#10;软件工程师&#10;工作经历...&#10;2020-2023 某某科技有限公司..."
            className="w-full h-96 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none font-mono text-sm leading-relaxed"
          />
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                <AlertCircle className="w-4 h-4 mr-2" />
                <span>上传前请移除敏感个人信息（如手机号、住址）。</span>
            </div>
            <Button 
                onClick={() => onSubmit(text)} 
                disabled={text.length < 50} 
                isLoading={isLoading}
                size="lg"
            >
                开始深度优化 <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};