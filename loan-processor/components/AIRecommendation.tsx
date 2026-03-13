"use client";

import { AIRecommendationData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Bot, CheckCircle, XCircle, MessageSquare } from "lucide-react";

function ActionBadge({ action, confidence }: { action: string; confidence: number }) {
  const config = {
    approve: { label: "Approve", variant: "success" as const, Icon: CheckCircle },
    deny: { label: "Deny", variant: "danger" as const, Icon: XCircle },
    request_more_info: { label: "Request More Info", variant: "warning" as const, Icon: MessageSquare },
  }[action] ?? { label: action, variant: "default" as const, Icon: Bot };

  return (
    <div className="flex items-center gap-2">
      <Badge variant={config.variant} className="text-sm px-3 py-1">
        <config.Icon className="h-3.5 w-3.5 mr-1.5" />
        {config.label}
      </Badge>
      <span className="text-sm text-muted-foreground font-medium">{confidence}% confidence</span>
    </div>
  );
}

export function AIRecommendation({ data }: { data: AIRecommendationData }) {
  return (
    <Card className="border-primary/30 bg-accent/50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-base">AI Recommendation</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ActionBadge action={data.action} confidence={data.confidence} />

        <div>
          <p className="text-sm font-medium mb-1">Reasoning</p>
          <p className="text-sm text-muted-foreground">{data.reasoning}</p>
        </div>

        {data.risk_flags.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Risk Flags</p>
            <ul className="space-y-1.5">
              {data.risk_flags.map((flag, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="h-3.5 w-3.5 mt-0.5 text-warning shrink-0" />
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="rounded-lg bg-muted/80 p-3 text-xs text-muted-foreground italic">
          AI suggestions are advisory only. Final decisions must be made by a human reviewer.
        </div>
      </CardContent>
    </Card>
  );
}
