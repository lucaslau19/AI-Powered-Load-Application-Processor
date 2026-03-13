import { Application, ReviewerNote, AIRecommendationData } from "./types";

export const applications: Application[] = [
  {
    id: "app-001",
    applicant: "Jane Doe",
    email: "jane.doe@example.com",
    loan_amount: 1500,
    stated_monthly_income: 5000,
    employment_status: "employed",
    documents: ["pay_stub_strong.pdf", "bank_statement_healthy.pdf"],
    score: 82,
    decision: "approved",
    breakdown: {
      income_verification: { weight: 0.30, score: 95, note: "Documented income matches stated income within tolerance" },
      income_level: { weight: 0.25, score: 90, note: "Monthly income is 3.3x loan amount" },
      account_stability: { weight: 0.20, score: 85, note: "Positive balance, no overdrafts, consistent deposits" },
      employment_status: { weight: 0.15, score: 100, note: "Employed" },
      debt_to_income: { weight: 0.10, score: 30, note: "Low withdrawal-to-deposit ratio" },
    },
  },
  {
    id: "app-002",
    applicant: "Bob Smith",
    email: "bob.smith@example.com",
    loan_amount: 2000,
    stated_monthly_income: 1400,
    employment_status: "self-employed",
    documents: ["pay_stub_weak.pdf", "bank_statement_risky.pdf"],
    score: 31,
    decision: "denied",
    breakdown: {
      income_verification: { weight: 0.30, score: 40, note: "Documented income roughly matches but low confidence" },
      income_level: { weight: 0.25, score: 0, note: "Monthly income is 0.7x loan amount (below 3x threshold)" },
      account_stability: { weight: 0.20, score: 15, note: "Overdrafts present, inconsistent deposits, low balance" },
      employment_status: { weight: 0.15, score: 60, note: "Self-employed" },
      debt_to_income: { weight: 0.10, score: 80, note: "High withdrawal-to-deposit ratio" },
    },
  },
  {
    id: "app-003",
    applicant: "Bob Smith",
    email: "bob.smith@example.com",
    loan_amount: 300,
    stated_monthly_income: 1400,
    employment_status: "self-employed",
    documents: ["pay_stub_weak.pdf", "bank_statement_risky.pdf"],
    score: 58,
    decision: "flagged_for_review",
    breakdown: {
      income_verification: { weight: 0.30, score: 40, note: "Documented income roughly matches but low confidence" },
      income_level: { weight: 0.25, score: 90, note: "Monthly income is 4.7x loan amount" },
      account_stability: { weight: 0.20, score: 15, note: "Overdrafts present, inconsistent deposits, low balance" },
      employment_status: { weight: 0.15, score: 60, note: "Self-employed" },
      debt_to_income: { weight: 0.10, score: 80, note: "High withdrawal-to-deposit ratio" },
    },
  },
  {
    id: "app-004",
    applicant: "Jane Doe",
    email: "jane.doe@example.com",
    loan_amount: 4500,
    stated_monthly_income: 5000,
    employment_status: "employed",
    documents: ["pay_stub_strong.pdf", "bank_statement_healthy.pdf"],
    score: 68,
    decision: "flagged_for_review",
    breakdown: {
      income_verification: { weight: 0.30, score: 95, note: "Documented income matches stated income within tolerance" },
      income_level: { weight: 0.25, score: 45, note: "Monthly income is 1.1x loan amount (below 3x threshold)" },
      account_stability: { weight: 0.20, score: 85, note: "Positive balance, no overdrafts, consistent deposits" },
      employment_status: { weight: 0.15, score: 100, note: "Employed" },
      debt_to_income: { weight: 0.10, score: 30, note: "Low withdrawal-to-deposit ratio" },
    },
  },
  {
    id: "app-005",
    applicant: "Carol Tester",
    email: "carol.tester@example.com",
    loan_amount: 1000,
    stated_monthly_income: 8000,
    employment_status: "employed",
    documents: [],
    score: 55,
    decision: "flagged_for_review",
    extraction_error: "no_documents_provided",
    breakdown: {
      income_verification: { weight: 0.30, score: 0, note: "No documents to verify" },
      income_level: { weight: 0.25, score: 95, note: "Stated income is 8x loan amount (unverified)" },
      account_stability: { weight: 0.20, score: 0, note: "No bank statement provided" },
      employment_status: { weight: 0.15, score: 100, note: "Employed" },
      debt_to_income: { weight: 0.10, score: 0, note: "Cannot assess without bank statement" },
    },
  },
  {
    id: "app-006",
    applicant: "Dave Liar",
    email: "dave.liar@example.com",
    loan_amount: 2000,
    stated_monthly_income: 10000,
    employment_status: "employed",
    documents: ["pay_stub_weak.pdf"],
    score: 28,
    decision: "denied",
    breakdown: {
      income_verification: { weight: 0.30, score: 0, note: "MISMATCH: Stated $10,000/mo, documented $1,400/mo (86% discrepancy)" },
      income_level: { weight: 0.25, score: 0, note: "Documented income is 0.7x loan amount" },
      account_stability: { weight: 0.20, score: 15, note: "Overdrafts present, inconsistent deposits" },
      employment_status: { weight: 0.15, score: 100, note: "Employed" },
      debt_to_income: { weight: 0.10, score: 80, note: "High withdrawal-to-deposit ratio" },
    },
  },
];

export const initialReviewerNotes: ReviewerNote[] = [
  {
    id: "note-001",
    appId: "app-003",
    author: "Sarah Chen",
    text: "Account stability is a concern. Requested additional bank statements from the last 3 months.",
    timestamp: "2025-01-15T10:30:00Z",
  },
  {
    id: "note-002",
    appId: "app-005",
    author: "Sarah Chen",
    text: "No documents provided at all. Reached out to applicant via email requesting pay stubs and bank statements.",
    timestamp: "2025-01-15T11:15:00Z",
  },
];

export const aiRecommendations: Record<string, AIRecommendationData> = {
  "app-003": {
    action: "approve",
    confidence: 68,
    reasoning: "Loan amount is very small relative to income (4.7x coverage). While account stability is concerning, the low dollar amount limits exposure. Similar profiles with small loan amounts have a 4% default rate.",
    risk_flags: [
      "Account instability: overdrafts and inconsistent deposits",
      "Self-employed with low income verification confidence",
      "Previous application (app-002) was denied for a larger amount",
    ],
  },
  "app-004": {
    action: "approve",
    confidence: 78,
    reasoning: "Strong income verification and account stability. The only concern is the loan-to-income ratio (1.1x, below the 3x threshold), but documented income and banking history are solid. This applicant was previously auto-approved for a smaller amount.",
    risk_flags: [
      "Loan amount is 90% of monthly income",
      "Below 3x income-to-loan threshold that triggers auto-approval",
    ],
  },
  "app-005": {
    action: "request_more_info",
    confidence: 85,
    reasoning: "Cannot make a reliable assessment without documents. Stated income ($8,000/mo) is high and employment is confirmed, but zero verification was possible. Requesting bank statement and pay stub would likely resolve this quickly.",
    risk_flags: [
      "No documents uploaded \u2014 income and stability entirely unverified",
      "Score relies solely on stated (unverified) information",
      "Extraction error: no_documents_provided",
    ],
  },
  "app-006": {
    action: "deny",
    confidence: 95,
    reasoning: "Severe income discrepancy \u2014 stated income is 7x higher than documented income. This pattern is consistent with misrepresentation. Auto-denied by the system.",
    risk_flags: [
      "86% income discrepancy between stated and documented",
      "Documented income ($1,400/mo) is only 0.7x loan amount",
      "Pattern consistent with intentional misrepresentation",
    ],
  },
};

export function getApplicationById(id: string): Application | undefined {
  return applications.find((app) => app.id === id);
}

const defaultFlaggedTemplate: Application = {
  id: "app-new",
  applicant: "Applicant",
  email: "applicant@example.com",
  loan_amount: 0,
  stated_monthly_income: 0,
  employment_status: "employed",
  documents: [],
  score: 55,
  decision: "flagged_for_review",
  breakdown: {
    income_verification: { weight: 0.30, score: 40, note: "Unable to fully verify income" },
    income_level: { weight: 0.25, score: 60, note: "Income assessment pending review" },
    account_stability: { weight: 0.20, score: 50, note: "Account stability pending review" },
    employment_status: { weight: 0.15, score: 80, note: "Employment status noted" },
    debt_to_income: { weight: 0.10, score: 50, note: "Debt-to-income pending review" },
  },
};

export function getApplicationResult(
  loanAmount: number,
  monthlyIncome: number,
  name: string,
  email: string,
): Application {
  let matched: Application | undefined;

  if (loanAmount === 1500 && monthlyIncome === 5000) {
    matched = applications.find((app) => app.id === "app-001");
  } else if (loanAmount === 2000 && monthlyIncome === 1400) {
    matched = applications.find((app) => app.id === "app-002");
  } else if (loanAmount === 300 && monthlyIncome === 1400) {
    matched = applications.find((app) => app.id === "app-003");
  } else if (loanAmount === 4500 && monthlyIncome === 5000) {
    matched = applications.find((app) => app.id === "app-004");
  } else if (loanAmount === 1000 && monthlyIncome === 8000) {
    matched = applications.find((app) => app.id === "app-005");
  } else if (loanAmount === 2000 && monthlyIncome === 10000) {
    matched = applications.find((app) => app.id === "app-006");
  }

  if (matched) {
    return { ...matched, applicant: name, email };
  }

  return {
    ...defaultFlaggedTemplate,
    applicant: name,
    email,
    loan_amount: loanAmount,
    stated_monthly_income: monthlyIncome,
  };
}

export function getAIRecommendation(id: string): AIRecommendationData | undefined {
  return aiRecommendations[id];
}
