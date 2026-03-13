"use client";

import { Application } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusTracker } from "./StatusTracker";
import { CheckCircle, Mail } from "lucide-react";

export function StatusApproved({ app }: { app: Application }) {
  return (
    <div className="animate-fade-in space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <CardTitle className="text-xl sm:text-2xl text-success">Great News &mdash; You&apos;re Approved!</CardTitle>
          <p className="text-muted-foreground">
            Congrats, {app.applicant.split(" ")[0]}! We&apos;ve reviewed everything and you&apos;re good to go.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-green-50 p-4 text-center">
            <p className="text-sm text-muted-foreground">Approved Loan Amount</p>
            <p className="text-3xl font-bold text-success">{formatCurrency(app.loan_amount)}</p>
          </div>

          <StatusTracker decision="approved" />

          <div className="space-y-3 rounded-lg border border-border p-4">
            <h3 className="font-semibold">Next Steps</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-success shrink-0" />
                Funds will be deposited within 1-2 business days.
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                Check your email ({app.email}) for your loan agreement and details.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-success shrink-0" />
                Review your repayment schedule in your loan agreement.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
