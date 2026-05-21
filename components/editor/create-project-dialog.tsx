"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/slugify";

interface CreateProjectDialogProps {
  open: boolean;
  formValue: string;
  onFormChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export function CreateProjectDialog({
  open,
  formValue,
  onFormChange,
  onClose,
  onConfirm,
}: CreateProjectDialogProps) {
  const slug = slugify(formValue);

  return (
    <Dialog open={open} onOpenChange={(nextOpen: boolean) => { if (!nextOpen) onClose(); }}>
      <DialogContent showCloseButton={false} className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Give your new architecture workspace a name.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 py-1">
          <Input
            placeholder="Project name"
            value={formValue}
            onChange={(e) => onFormChange(e.target.value)}
            autoFocus
          />
          <p
            className={`text-xs font-mono transition-opacity ${
              slug ? "text-copy-muted opacity-100" : "opacity-0"
            }`}
          >
            {slug || "slug"}
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={!formValue.trim() || !slug}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
