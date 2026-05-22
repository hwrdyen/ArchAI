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

interface CreateProjectDialogProps {
  open: boolean;
  formValue: string;
  roomIdPreview: string;
  isLoading: boolean;
  onFormChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export function CreateProjectDialog({
  open,
  formValue,
  roomIdPreview,
  isLoading,
  onFormChange,
  onClose,
  onConfirm,
}: CreateProjectDialogProps) {
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
              roomIdPreview ? "text-copy-muted opacity-100" : "opacity-0"
            }`}
          >
            {roomIdPreview || "room-id"}
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={!roomIdPreview || isLoading}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
