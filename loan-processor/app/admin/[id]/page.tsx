"use client";

import { use } from "react";
import { getApplicationById } from "@/lib/data";
import { AdminAppDetail } from "@/components/AdminAppDetail";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function AdminDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const app = getApplicationById(id);

  if (!app) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="mx-auto h-10 w-10 text-warning mb-3" />
            <h2 className="text-xl font-semibold mb-2">Application Not Found</h2>
            <p className="text-muted-foreground mb-4">
              No application found with ID &quot;{id}&quot;.
            </p>
            <a href="/admin">
              <Button variant="outline">Back to Dashboard</Button>
            </a>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <AdminAppDetail app={app} />
    </div>
  );
}
