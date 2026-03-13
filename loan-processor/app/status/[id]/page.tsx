"use client";

import { use } from "react";
import { useSearchParams } from "next/navigation";
import { getApplicationById } from "@/lib/data";
import { Application } from "@/lib/types";
import { StatusApproved } from "@/components/StatusApproved";
import { StatusDenied } from "@/components/StatusDenied";
import { StatusFlagged } from "@/components/StatusFlagged";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function StatusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const baseApp = getApplicationById(id);

  if (!baseApp) {
    return (
      <div className="mx-auto max-w-xl px-4 py-10">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="mx-auto h-10 w-10 text-warning mb-3" />
            <h2 className="text-xl font-semibold mb-2">Application Not Found</h2>
            <p className="text-muted-foreground mb-4">
              We couldn&apos;t find an application with ID &quot;{id}&quot;.
            </p>
            <a href="/">
              <Button variant="outline">Return Home</Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Override name/email with query params from the application form
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const app: Application = {
    ...baseApp,
    ...(name ? { applicant: name } : {}),
    ...(email ? { email } : {}),
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      {app.decision === "approved" && <StatusApproved app={app} />}
      {app.decision === "denied" && <StatusDenied app={app} />}
      {app.decision === "flagged_for_review" && <StatusFlagged app={app} />}
    </div>
  );
}
