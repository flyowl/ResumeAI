export enum AppStep {
  LANDING = 'LANDING',
  INPUT = 'INPUT',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
}

export interface AnalysisResult {
  atsScore: number;
  summary: string;
  keyImprovements: string[];
  optimizedContentEnglish: string;
  optimizedContentChinese: string;
  missingKeywords: string[];
}

export enum PricingPlan {
  FREE = 'FREE',
  PRO_SINGLE = 'PRO_SINGLE',
  PRO_MONTHLY = 'PRO_MONTHLY',
}
