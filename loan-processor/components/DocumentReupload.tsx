"use client";

import { useState, useRef } from "react";
import { Application } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle, FileText, Loader2, Mail, X } from "lucide-react";

interface DocumentReuploadProps {
  app: Application;
  onUploadComplete?: () => void;
}

export function DocumentReupload({ app, onUploadComplete }: DocumentReuploadProps) {
  const [files, setFiles] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const names = Array.from(fileList).map((f) => f.name);
    setFiles((prev) => [...prev, ...names]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit() {
    if (files.length === 0) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
      onUploadComplete?.();
    }, 1500);
  }

  if (uploaded) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 shrink-0">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="font-semibold text-success">Documents Received</p>
              <p className="text-sm text-muted-foreground">
                Your documents have been submitted and your review has been updated.
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-white/70 p-3 space-y-1.5">
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-3.5 w-3.5 shrink-0" />
                {f}
              </div>
            ))}
          </div>
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Mail className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span>We&apos;ll email you at <strong className="text-foreground">{app.email}</strong> once the updated review is complete.</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (uploading) {
    return (
      <Card>
        <CardContent className="p-8 flex flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-3" />
          <p className="font-medium text-sm">Uploading your documents...</p>
          <p className="text-xs text-muted-foreground mt-1">
            {files.length} file{files.length !== 1 ? "s" : ""} being submitted
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Missing Documents?</CardTitle>
        <p className="text-sm text-muted-foreground">
          Upload your documents here to speed up your review.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
            dragOver
              ? "border-primary bg-accent"
              : "border-border hover:border-primary/50"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
        >
          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-1">
            Drag and drop your files here, or
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
          >
            Browse Files
          </Button>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => {
              handleFiles(e.target.files);
              if (inputRef.current) inputRef.current.value = "";
            }}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Accepted: PDF, JPG, PNG (pay stubs, bank statements)
          </p>
        </div>

        {files.length > 0 && (
          <div className="space-y-1.5">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground min-w-0">
                  <FileText className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{f}</span>
                </div>
                <button
                  onClick={() => removeFile(i)}
                  className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0"
                  aria-label={`Remove ${f}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <Button
          className="w-full min-h-[44px]"
          onClick={handleSubmit}
          disabled={files.length === 0}
        >
          Submit Documents
        </Button>
      </CardContent>
    </Card>
  );
}
