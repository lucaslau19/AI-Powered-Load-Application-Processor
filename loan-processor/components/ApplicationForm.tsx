"use client";

import { useState, useRef } from "react";
import { getApplicationResult } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, User, DollarSign, FileText, CheckCircle, Loader2, X } from "lucide-react";

const STEPS = ["Personal Info", "Loan Details", "Documents", "Review & Submit"];

interface FormData {
  name: string;
  email: string;
  loanAmount: string;
  monthlyIncome: string;
  employmentStatus: string;
  files: string[];
}

export function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    loanAmount: "",
    monthlyIncome: "",
    employmentStatus: "employed",
    files: [],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function canAdvance(): boolean {
    switch (step) {
      case 0:
        return form.name.trim().length > 0 && form.email.trim().length > 0;
      case 1:
        return form.loanAmount.trim().length > 0 && form.monthlyIncome.trim().length > 0;
      case 2:
        return true; // Documents optional
      case 3:
        return true;
      default:
        return false;
    }
  }

  function handleSubmit() {
    setSubmitting(true);
    setTimeout(() => {
      const loanAmount = Number(form.loanAmount);
      const monthlyIncome = Number(form.monthlyIncome);
      const result = getApplicationResult(loanAmount, monthlyIncome, form.name, form.email);
      const params = new URLSearchParams({
        name: form.name,
        email: form.email,
      });
      window.location.href = `/status/${result.id}?${params.toString()}`;
    }, 2000);
  }

  function handleFileChange(fileList: FileList | null) {
    if (!fileList) return;
    const names = Array.from(fileList).map((f) => f.name);
    setForm((prev) => ({ ...prev, files: [...prev.files, ...names] }));
  }

  if (submitting) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-semibold mb-2">Hang tight &mdash; we&apos;re on it!</h2>
        <p className="text-muted-foreground text-sm">
          Our system is reviewing your info and documents right now.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          {STEPS.map((s, i) => (
            <span key={s} className={i <= step ? "text-primary font-medium" : ""}>
              {s}
            </span>
          ))}
        </div>
        <Progress value={((step + 1) / STEPS.length) * 100} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {step === 0 && <User className="h-5 w-5 text-primary" />}
            {step === 1 && <DollarSign className="h-5 w-5 text-primary" />}
            {step === 2 && <FileText className="h-5 w-5 text-primary" />}
            {step === 3 && <CheckCircle className="h-5 w-5 text-primary" />}
            {STEPS[step]}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 && (
            <>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="name">
                  Full Name
                </label>
                <Input
                  id="name"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="email">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="loanAmount">
                  Loan Amount Requested ($)
                </label>
                <Input
                  id="loanAmount"
                  type="number"
                  placeholder="1500"
                  value={form.loanAmount}
                  onChange={(e) => update("loanAmount", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="monthlyIncome">
                  Stated Monthly Income ($)
                </label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  placeholder="5000"
                  value={form.monthlyIncome}
                  onChange={(e) => update("monthlyIncome", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium" htmlFor="employment">
                  Employment Status
                </label>
                <Select
                  id="employment"
                  value={form.employmentStatus}
                  onChange={(e) => update("employmentStatus", e.target.value)}
                >
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="unemployed">Unemployed</option>
                </Select>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm text-muted-foreground">
                Drop in your pay stubs and bank statements. This helps us move things along faster for you.
              </p>
              <div
                className="rounded-lg border-2 border-dashed border-border p-8 text-center hover:border-primary/50 transition-colors"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileChange(e.dataTransfer.files);
                }}
              >
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-1">
                  Drag and drop your files here, or
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Browse Files
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => handleFileChange(e.target.files)}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Accepted: PDF, JPG, PNG
                </p>
              </div>
              {form.files.length > 0 && (
                <div className="space-y-1.5">
                  {form.files.map((f, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground min-w-0">
                        <FileText className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                      <button
                        onClick={() => setForm((prev) => ({ ...prev, files: prev.files.filter((_, idx) => idx !== i) }))}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0"
                        aria-label={`Remove ${f}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Take a quick look and make sure everything&apos;s right before you submit.
              </p>
              <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{form.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{form.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Loan Amount</span>
                  <span className="font-medium">${form.loanAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Income</span>
                  <span className="font-medium">${form.monthlyIncome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Employment</span>
                  <span className="font-medium capitalize">{form.employmentStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Documents</span>
                  <span className="font-medium">
                    {form.files.length > 0 ? `${form.files.length} file(s)` : "None"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation — thumb-friendly at bottom */}
      <div className="flex gap-3">
        {step > 0 && (
          <Button
            variant="outline"
            className="flex-1 min-h-[44px]"
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </Button>
        )}
        {step < STEPS.length - 1 ? (
          <Button className="flex-1 min-h-[44px]" onClick={() => setStep((s) => s + 1)} disabled={!canAdvance()}>
            Continue
          </Button>
        ) : (
          <Button className="flex-1 min-h-[44px]" onClick={handleSubmit}>Submit Application</Button>
        )}
      </div>
    </div>
  );
}
