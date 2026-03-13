"use client";

import { useState } from "react";
import { applications } from "@/lib/data";
import { Application, Decision } from "@/lib/types";
import { formatCurrency, scoreBadgeClasses, decisionLabel, decisionBadgeClasses } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, Users, Clock, CheckCircle, XCircle } from "lucide-react";

function getKeyFlag(app: Application): string {
  if (app.extraction_error === "no_documents_provided") return "No documents";
  if (app.breakdown.income_verification.note.includes("MISMATCH")) return "Income mismatch";
  if (app.breakdown.account_stability.score < 30) return "Account instability";
  if (app.breakdown.income_level.score < 50) return "Low income ratio";
  return "Multiple factors";
}

function AppTable({ apps }: { apps: Application[] }) {
  // Sort by score ascending (worst first)
  const sorted = [...apps].sort((a, b) => a.score - b.score);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="py-3 px-3 font-medium text-muted-foreground">Applicant</th>
            <th className="py-3 px-3 font-medium text-muted-foreground">Loan Amount</th>
            <th className="py-3 px-3 font-medium text-muted-foreground">Score</th>
            <th className="py-3 px-3 font-medium text-muted-foreground">Decision</th>
            <th className="py-3 px-3 font-medium text-muted-foreground">Key Flag</th>
            <th className="py-3 px-3 font-medium text-muted-foreground">Action</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((app) => (
            <tr
              key={app.id}
              className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => (window.location.href = `/admin/${app.id}`)}
            >
              <td className="py-3 px-3">
                <div>
                  <p className="font-medium">{app.applicant}</p>
                  <p className="text-xs text-muted-foreground">{app.id}</p>
                </div>
              </td>
              <td className="py-3 px-3">{formatCurrency(app.loan_amount)}</td>
              <td className="py-3 px-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${scoreBadgeClasses(app.score)}`}>
                  {app.score}
                </span>
              </td>
              <td className="py-3 px-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${decisionBadgeClasses(app.decision)}`}>
                  {decisionLabel(app.decision)}
                </span>
              </td>
              <td className="py-3 px-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {(app.extraction_error || app.breakdown.income_verification.note.includes("MISMATCH")) && (
                    <AlertTriangle className="h-3.5 w-3.5 text-danger" />
                  )}
                  {getKeyFlag(app)}
                </div>
              </td>
              <td className="py-3 px-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `/admin/${app.id}`;
                  }}
                >
                  Review <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {sorted.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No applications in this category.</p>
      )}
    </div>
  );
}

export function AdminDashboard() {
  const flagged = applications.filter((a) => a.decision === "flagged_for_review");
  const all = applications;
  const approved = applications.filter((a) => a.decision === "approved");
  const denied = applications.filter((a) => a.decision === "denied");

  return (
    <div className="animate-fade-in space-y-6">
      {/* Analytics Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">50</p>
            <p className="text-xs text-muted-foreground">Total Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">31</p>
            <p className="text-xs text-muted-foreground">Approved (62%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-danger">8</p>
            <p className="text-xs text-muted-foreground">Denied (16%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">11</p>
            <p className="text-xs text-muted-foreground">Flagged (22%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="text-2xl font-bold">3:42</p>
            </div>
            <p className="text-xs text-muted-foreground">Avg Review Time</p>
          </CardContent>
        </Card>
        <Card className="border-warning/40">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">3 of 11</p>
            <p className="text-xs text-muted-foreground">Queue Remaining</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="flagged">
        <TabsList>
          <TabsTrigger value="flagged">
            Flagged ({flagged.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            All ({all.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approved.length})
          </TabsTrigger>
          <TabsTrigger value="denied">
            Denied ({denied.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="flagged">
          <Card>
            <CardContent className="p-0">
              <AppTable apps={flagged} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <AppTable apps={all} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="approved">
          <Card>
            <CardContent className="p-0">
              <AppTable apps={approved} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="denied">
          <Card>
            <CardContent className="p-0">
              <AppTable apps={denied} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
