"use client";

import { useState, useEffect } from "react";
import { Application, ReviewerNote, AIRecommendationData } from "@/lib/types";
import { initialReviewerNotes, applications, getAIRecommendation } from "@/lib/data";
import { formatCurrency, decisionLabel, decisionBadgeClasses, scoreBadgeClasses } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScoreBreakdown } from "./ScoreBreakdown";
import { ReviewerNotes } from "./ReviewerNotes";
import { AIRecommendation } from "./AIRecommendation";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  XCircle,
  MessageSquare,
  FileText,
  User,
  Mail,
  Briefcase,
  DollarSign,
  Shield,
  Flag,
} from "lucide-react";

export function AdminAppDetail({ app }: { app: Application }) {
  const [notes, setNotes] = useState<ReviewerNote[]>(
    initialReviewerNotes.filter((n) => n.appId === app.id)
  );
  const [status, setStatus] = useState(app.decision);
  const [dialogAction, setDialogAction] = useState<"approve" | "deny" | "request_info" | "escalate" | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [fraudEscalated, setFraudEscalated] = useState(false);

  const hasIncomeMismatch = app.breakdown.income_verification.note.includes("MISMATCH");
  const hasNoDocuments = app.extraction_error === "no_documents_provided";
  const aiRec = getAIRecommendation(app.id);

  // Get next flagged app in queue for auto-advance
  const flaggedApps = applications.filter((a) => a.decision === "flagged_for_review").sort((a, b) => a.score - b.score);
  const currentIndex = flaggedApps.findIndex((a) => a.id === app.id);
  const nextFlagged = currentIndex >= 0 && currentIndex < flaggedApps.length - 1
    ? flaggedApps[currentIndex + 1]
    : null;

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  function handleAction() {
    if (!dialogAction) return;
    const actionLabel = dialogAction === "approve" ? "approved" : dialogAction === "deny" ? "denied" : "updated";

    if (dialogAction === "approve") setStatus("approved");
    else if (dialogAction === "deny") setStatus("denied");

    if (dialogAction === "escalate") {
      setFraudEscalated(true);
      setToast("Escalated to fraud review team.");
      setDialogAction(null);
      return;
    }

    setDialogAction(null);

    if (nextFlagged && (dialogAction === "approve" || dialogAction === "deny" || dialogAction === "request_info")) {
      setToast(`Application ${actionLabel}. Moving to next...`);
      setTimeout(() => {
        window.location.href = `/admin/${nextFlagged.id}`;
      }, 1500);
    } else if (!nextFlagged && (dialogAction === "approve" || dialogAction === "deny" || dialogAction === "request_info")) {
      setToast("Queue cleared! All flagged applications have been reviewed.");
    } else {
      setToast(`Application ${actionLabel}.`);
    }
  }

  function handleFraudEscalate() {
    setFraudEscalated(true);
    setToast("Escalated to fraud review team.");
  }

  const actionLabels = {
    approve: { title: "Approve Application", desc: `Are you sure you want to approve ${app.applicant}'s application for ${formatCurrency(app.loan_amount)}?`, color: "text-success" },
    deny: { title: "Deny Application", desc: `Are you sure you want to deny ${app.applicant}'s application for ${formatCurrency(app.loan_amount)}? They will see a compliance-safe denial message.`, color: "text-danger" },
    request_info: { title: "Request More Information", desc: `Are you sure you want to request more info from ${app.applicant} for their ${formatCurrency(app.loan_amount)} application?`, color: "text-primary" },
    escalate: { title: "Escalate to Fraud Review", desc: `Flag ${app.applicant}'s application for the fraud review team? This will be added to the priority fraud queue.`, color: "text-danger" },
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 rounded-xl bg-nav text-white px-4 py-3 shadow-lg animate-fade-in text-sm max-w-sm">
          {toast}
        </div>
      )}

      {/* Back link */}
      <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/admin")}>
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
      </Button>

      {/* Income mismatch alert — POTENTIAL MISREPRESENTATION */}
      {hasIncomeMismatch && (
        <div className="rounded-2xl border-2 border-red-300 bg-red-50 p-5">
          <div className="flex items-start gap-3">
            <Shield className="h-7 w-7 text-danger shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-danger text-lg">POTENTIAL MISREPRESENTATION</p>
              <p className="text-sm text-red-700 mt-1">
                Stated income $10,000/mo vs. documented $1,400/mo (86% discrepancy)
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="danger">Income Mismatch</Badge>
                {fraudEscalated ? (
                  <Badge variant="warning">Escalated to Fraud Team</Badge>
                ) : (
                  <Button variant="destructive" size="sm" onClick={handleFraudEscalate}>
                    <Flag className="h-3.5 w-3.5 mr-1.5" />
                    Flag for Fraud Review
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No documents alert */}
      {hasNoDocuments && (
        <div className="rounded-2xl border-2 border-yellow-300 bg-yellow-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-yellow-800">No Documents Provided</p>
              <p className="text-sm text-yellow-700 mt-1">
                Income and account stability could not be verified. The applicant did not upload any documents.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header with status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{app.applicant}</h1>
          <p className="text-muted-foreground text-sm">{app.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${decisionBadgeClasses(status)}`}>
            {decisionLabel(status)}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${scoreBadgeClasses(app.score)}`}>
            Score: {app.score}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: App info + Score breakdown */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Recommendation */}
          {aiRec && <AIRecommendation data={aiRec} />}

          {/* Applicant Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Applicant Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium">{app.applicant}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{app.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Loan Amount</p>
                    <p className="font-medium">{formatCurrency(app.loan_amount)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Stated Monthly Income</p>
                    <p className="font-medium">{formatCurrency(app.stated_monthly_income)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Employment</p>
                    <p className="font-medium capitalize">{app.employment_status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Documents</p>
                    {app.documents.length > 0 ? (
                      app.documents.map((d) => (
                        <p key={d} className="font-medium">{d}</p>
                      ))
                    ) : (
                      <p className="font-medium text-danger">None provided</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Score Breakdown */}
          <Card>
            <CardContent className="pt-6">
              <ScoreBreakdown app={app} />
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="success" onClick={() => setDialogAction("approve")} disabled={status === "approved"}>
                  <CheckCircle className="h-4 w-4 mr-1.5" />
                  Approve
                </Button>
                <Button variant="destructive" onClick={() => setDialogAction("deny")} disabled={status === "denied"}>
                  <XCircle className="h-4 w-4 mr-1.5" />
                  Deny
                </Button>
                <Button variant="outline" onClick={() => setDialogAction("request_info")}>
                  <MessageSquare className="h-4 w-4 mr-1.5" />
                  Request More Info
                </Button>
                {hasIncomeMismatch && !fraudEscalated && (
                  <Button variant="destructive" onClick={() => setDialogAction("escalate")}>
                    <Shield className="h-4 w-4 mr-1.5" />
                    Escalate to Fraud Review
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Reviewer Notes */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <ReviewerNotes
                appId={app.id}
                notes={notes}
                onAddNote={(note) => setNotes((prev) => [...prev, note])}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {dialogAction && (
        <Dialog open={!!dialogAction} onClose={() => setDialogAction(null)}>
          <DialogTitle className={actionLabels[dialogAction].color}>
            {actionLabels[dialogAction].title}
          </DialogTitle>
          <DialogDescription>
            {actionLabels[dialogAction].desc}
          </DialogDescription>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setDialogAction(null)}>
              Cancel
            </Button>
            <Button
              variant={dialogAction === "approve" ? "success" : dialogAction === "deny" || dialogAction === "escalate" ? "destructive" : "default"}
              onClick={handleAction}
            >
              Confirm
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
