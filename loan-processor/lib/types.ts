export type Decision = "approved" | "denied" | "flagged_for_review";

export interface ScoreFactor {
  weight: number;
  score: number;
  note: string;
}

export interface Application {
  id: string;
  applicant: string;
  email: string;
  loan_amount: number;
  stated_monthly_income: number;
  employment_status: "employed" | "self-employed" | "unemployed";
  documents: string[];
  score: number;
  decision: Decision;
  extraction_error?: string;
  breakdown: {
    income_verification: ScoreFactor;
    income_level: ScoreFactor;
    account_stability: ScoreFactor;
    employment_status: ScoreFactor;
    debt_to_income: ScoreFactor;
  };
}

export interface ReviewerNote {
  id: string;
  appId: string;
  author: string;
  text: string;
  timestamp: string;
}

export type AIAction = "approve" | "deny" | "request_more_info";

export interface AIRecommendationData {
  action: AIAction;
  confidence: number;
  reasoning: string;
  risk_flags: string[];
}
