import React from 'react';
import { Button } from './Button';
import { Sparkles, Upload, Globe, CheckCircle } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative overflow-hidden bg-white pt-16 pb-32 lg:pt-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">让你的简历</span>{' '}
            <span className="block text-blue-600 xl:inline">脱颖而出</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            专为留学生和转行者打造。一键生成 ATS 友好的中英双语简历，助你轻松斩获名企 Offer。
          </p>
          <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Button size="lg" onClick={onStart} className="w-full md:w-auto flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                立即优化
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">ATS 深度优化</h3>
            <p className="mt-2 text-base text-gray-500">
              拒绝被系统过滤。我们针对世界 500 强企业使用的招聘系统（ATS）优化您的简历结构和关键词。
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">中英双语对照</h3>
            <p className="mt-2 text-base text-gray-500">
              海投全球？即刻获取完美润色的英文简历及对应的中文版本，语言不再是障碍。
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 mb-4">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">智能诊断分析</h3>
            <p className="mt-2 text-base text-gray-500">
              识别缺失关键词，增强动词力度。将“负责”转化为可量化的“成就”，提升专业度。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};