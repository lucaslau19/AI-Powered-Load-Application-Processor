"use client";

import { Application } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusTracker } from "./StatusTracker";
import { XCircle, RefreshCw, FileText, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StatusDenied({ app }: { app: Application }) {
  return (
    <div className="animate-fade-in space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-10 w-10 text-danger" />
          </div>
          <CardTitle className="text-xl sm:text-2xl">We Weren&apos;t Able to Approve This One</CardTitle>
          <p className="text-muted-foreground">
            We really appreciate you applying, {app.applicant.split(" ")[0]}. We know this isn&apos;t the news you were hoping for.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <StatusTracker decision="denied" />

          <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
            <p>
              This decision was based on a review of the information and documents you provided.
              We look at a number of things to make sure we&apos;re lending responsibly &mdash; and sometimes the timing just isn&apos;t right.
            </p>
          </div>

          <div className="space-y-3 rounded-lg border border-border p-4">
            <h3 className="font-semibold">What You Can Do</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <FileText className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>
                  <strong className="text-foreground">Gather updated documents.</strong> If things have
                  changed since you applied, updated pay stubs or bank statements could make a difference
                  next time around.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <RefreshCw className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>
                  <strong className="text-foreground">Try again later.</strong> You&apos;re always welcome to
                  reapply. Financial situations change, and we&apos;d love to take another look.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>
                  <strong className="text-foreground">Questions?</strong> Our team is here for you &mdash;
                  reach out anytime and we&apos;ll do our best to help.
                </span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => window.location.href = "mailto:support@breeflow.com"}>
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
