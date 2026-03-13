# BreeFlow - AI-Powered Loan Application Processor

A React + Next.js (App Router) prototype for Bree's AI-powered loan application processor. Front-end only with hard-coded data. Features Bree's blue brand palette, mobile-first applicant flows, and an AI recommendation panel for reviewers.

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Key Routes

| Route | Description |
|-------|-------------|
| `/apply` | Multi-step loan application form |
| `/status/app-001` | Approved application (Jane Doe) |
| `/status/app-002` | Denied application (Bob Smith) |
| `/status/app-003` | Flagged application (Bob Smith, small loan) |
| `/status/app-004` | Flagged application (Jane Doe, big loan) |
| `/status/app-005` | Flagged — no documents (Carol Tester) |
| `/status/app-006` | Denied — income mismatch edge case (Dave Liar) |
| `/admin` | Admin review dashboard |
| `/admin/app-006` | Admin detail — income mismatch fraud alert |
| `/admin/app-005` | Admin detail — missing documents |

## Design Decisions

### Why These 3 Features (A, B, C)

1. **Real-Time Status Tracker (Feature A):** The most fundamental applicant-facing need — after submitting, people need to know where they stand. The step-by-step tracker (Received → Under Review → Decision) reduces support inquiries and builds trust.

2. **Document Re-Upload (Feature B):** Directly addresses the Carol Tester scenario where missing documents cause flagging. Instead of requiring a whole new application, applicants can upload missing docs in-place, which speeds up the review cycle.

3. **Reviewer Notes (Feature C):** Reviewers need institutional memory on each application. Notes persist within the session, enabling team collaboration and audit trail for compliance.

### Features Cut (D & E)

- **Appeal Flow (D):** Cut because it adds significant complexity (legal/compliance review needed for appeal criteria, creates expectation of reversal). Risks of fraud were also considered, it's most likely that during first submission ideal documents will be submitted.
- **Batch Approve/Deny (E):** Cut because with ~50 flagged apps/day, individual review is manageable, and batch actions risk rubber-stamping. Ethically, each flagged app should get genuine human review. Revisit if volume exceeds 100+/day.

## What I'd Do With More Time

- **Real Document Processing:** Some form of scraping pipeline for pay stubs and bank statements
- **Fraud Escalation Workflow:** Dedicated fraud review queue with case management
- **A/B Test Denial Messaging:** Test different tones and CTAs on the denial screen to optimize reapplication rates
- **Analytics Dashboard:** With real data, have the admin analytics dashboard update in real time (currently uses fake data)
- **Authentication:** Role-based access (applicant vs. reviewer vs. admin)
- **Email Notifications:** Actual notification pipeline for status changes

## Scoring Model Critique

The `debt_to_income` factor (10% weight) uses **withdrawal-to-deposit ratio** as a proxy for debt-to-income, which has several problems:

1. **Penalizes normal spending:** Someone who uses their primary checking account for all expenses will have a high withdrawal-to-deposit ratio even if they have low debt
2. **Ignores savings accounts:** Deposits split across multiple accounts make the primary account look worse
3. **Doesn't capture actual debts:** Rent, car payments, student loans, and credit card balances aren't captured by bank flow analysis
4. **Recurring bills misread:** Automatic bill payments inflate the withdrawal ratio but represent fixed obligations, not discretionary spending

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui-style components** (custom-built)
- **Lucide React** (icons)
