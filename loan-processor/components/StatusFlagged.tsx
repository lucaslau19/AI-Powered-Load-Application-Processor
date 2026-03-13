"use client";

import { useState } from "react";
import { Application } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusTracker } from "./StatusTracker";
import { DocumentReupload } from "./DocumentReupload";
import { Clock, Mail } from "lucide-react";

export function StatusFlagged({ app }: { app: Application }) {
  const hasMissingDocs = app.documents.length === 0 || app.extraction_error;
  const [docsUpdated, setDocsUpdated] = useState(false);

  return (
    <div className="animate-fade-in space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
            <Clock className="h-10 w-10 text-warning" />
          </div>
          <CardTitle className="text-xl sm:text-2xl">Hang Tight &mdash; We&apos;re Reviewing Your Application</CardTitle>
          <p className="text-muted-foreground">
            Thanks for your patience, {app.applicant.split(" ")[0]}. A real person on our team is taking a closer look.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <StatusTracker decision="flagged_for_review" docsUpdated={docsUpdated} />

          {/* Email notification card */}
          <div className="rounded-xl bg-accent border border-primary/20 p-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">We&apos;ll keep you posted</p>
                <p className="text-muted-foreground">
                  We&apos;ll send you an email at <strong className="text-foreground">{app.email}</strong> as
                  soon as your review is complete. Most reviews are finished within 1 business day.
                </p>
              </div>
            </div>
          </div>

          {hasMissingDocs && (
            <DocumentReupload app={app} onUploadComplete={() => setDocsUpdated(true)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
