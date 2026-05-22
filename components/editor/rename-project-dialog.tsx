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
import type { ProjectListItem } from "@/lib/project-data";

interface RenameProjectDialogProps {
  open: boolean;
  project: ProjectListItem | null;
  formValue: string;
  onFormChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export function RenameProjectDialog({
  open,
  project,
  formValue,
  onFormChange,
  onClose,
  onConfirm,
}: RenameProjectDialogProps) {
  const slug = slugify(formValue.trim());

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen: boolean) => {
        if (!nextOpen) onClose();
      }}
    >
      <DialogContent showCloseButton={false} className="rounded-3xl">
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
          {project && (
            <DialogDescription>
              Renaming{" "}
              <span className="text-copy-secondary">{project.name}</span>.
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="py-1">
          <Input
            placeholder="Project name"
            value={formValue}
            onChange={(e) => onFormChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && slug) {
                onConfirm();
              }
            }}
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={!slug}>
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
