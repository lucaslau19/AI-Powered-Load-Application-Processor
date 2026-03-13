"use client";

import { useState } from "react";
import { ReviewerNote } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send } from "lucide-react";

interface ReviewerNotesProps {
  appId: string;
  notes: ReviewerNote[];
  onAddNote: (note: ReviewerNote) => void;
}

export function ReviewerNotes({ appId, notes, onAddNote }: ReviewerNotesProps) {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("Sarah Chen");

  function handleSubmit() {
    if (!text.trim()) return;
    const note: ReviewerNote = {
      id: `note-${Date.now()}`,
      appId,
      author: author.trim() || "Anonymous",
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };
    onAddNote(note);
    setText("");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-semibold">Reviewer Notes</h3>
        <span className="text-xs text-muted-foreground">({notes.length})</span>
      </div>

      {notes.length === 0 && (
        <p className="text-sm text-muted-foreground italic">No notes yet. Add a note below.</p>
      )}

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {notes.map((note) => (
          <div key={note.id} className="rounded-lg border border-border p-3 text-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">{note.author}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(note.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="text-muted-foreground">{note.text}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t border-border pt-3">
        <Input
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="text-sm"
        />
        <Textarea
          placeholder="Add a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
          }}
        />
        <div className="flex justify-end">
          <Button size="sm" onClick={handleSubmit} disabled={!text.trim()}>
            <Send className="h-3.5 w-3.5 mr-1.5" />
            Add Note
          </Button>
        </div>
      </div>
    </div>
  );
}
