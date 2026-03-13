"use client";

import { Application, ScoreFactor } from "@/lib/types";
import { formatFactorName, scoreBadgeClasses } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface BarProps {
  label: string;
  factor: ScoreFactor;
}

function ScoreBar({ label, factor }: BarProps) {
  const pct = Math.max(0, Math.min(100, factor.score));
  const barColor =
    factor.score >= 75
      ? "bg-success"
      : factor.score >= 50
        ? "bg-warning"
        : "bg-danger";
  const isLow = factor.score < 50;

  return (
    <div className={`rounded-lg border p-3 ${isLow ? "border-red-200 bg-red-50/50" : "border-border"}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{label}</span>
          {isLow && <AlertTriangle className="h-3.5 w-3.5 text-danger" />}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${scoreBadgeClasses(factor.score)} px-1.5 py-0.5 rounded`}>
            {factor.score}/100
          </span>
          <span className="text-xs text-muted-foreground">
            {Math.round(factor.weight * 100)}% weight
          </span>
        </div>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1.5">{factor.note}</p>
    </div>
  );
}

export function ScoreBreakdown({ app }: { app: Application }) {
  const factors = Object.entries(app.breakdown) as [string, ScoreFactor][];
  const weightedScore = factors.reduce(
    (sum, [, f]) => sum + f.score * f.weight,
    0
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Score Breakdown</h3>
        <Badge
          className={scoreBadgeClasses(app.score)}
        >
          Overall: {app.score} (weighted: {Math.round(weightedScore)})
        </Badge>
      </div>
      <div className="space-y-2">
        {factors.map(([key, factor]) => (
          <ScoreBar key={key} label={formatFactorName(key)} factor={factor} />
        ))}
      </div>
    </div>
  );
}
