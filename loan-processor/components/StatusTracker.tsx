"use client";

import { Decision } from "@/lib/types";
import { CheckCircle, Circle, Loader } from "lucide-react";

interface Step {
  label: string;
  description: string;
}

const steps: Step[] = [
  { label: "Application Received", description: "We have your application" },
  { label: "Documents Under Review", description: "Analyzing your documents" },
  { label: "Decision Made", description: "Your application has been processed" },
];

function stepStatus(decision: Decision, stepIndex: number): "complete" | "active" | "pending" {
  if (decision === "approved" || decision === "denied") {
    return "complete";
  }
  // flagged_for_review
  if (stepIndex === 0) return "complete";
  if (stepIndex === 1) return "active";
  return "pending";
}

export function StatusTracker({ decision, docsUpdated = false }: { decision: Decision; docsUpdated?: boolean }) {
  const displaySteps = docsUpdated
    ? steps.map((s, i) =>
        i === 1
          ? { label: "Updated Documents Received", description: "Your new documents are being reviewed" }
          : s
      )
    : steps;

  return (
    <div className="space-y-0">
      {displaySteps.map((step, i) => {
        const status = stepStatus(decision, i);
        const isLast = i === displaySteps.length - 1;
        return (
          <div key={step.label} className="flex gap-3">
            <div className="flex flex-col items-center">
              {status === "complete" ? (
                <CheckCircle className="h-6 w-6 text-success shrink-0" />
              ) : status === "active" ? (
                <Loader className="h-6 w-6 text-primary shrink-0 animate-pulse-dot" />
              ) : (
                <Circle className="h-6 w-6 text-muted-foreground/40 shrink-0" />
              )}
              {!isLast && (
                <div
                  className={`w-0.5 h-8 ${
                    status === "complete" ? "bg-success" : "bg-muted"
                  }`}
                />
              )}
            </div>
            <div className="pb-8">
              <p
                className={`text-sm font-medium ${
                  status === "pending" ? "text-muted-foreground" : "text-foreground"
                }`}
              >
                {step.label}
              </p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
