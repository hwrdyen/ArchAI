"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";
import type { ProjectListItem } from "@/lib/project-data";

type DialogType = "create" | "rename" | "delete" | null;

function generateSuffix(): string {
  return Math.random().toString(36).slice(2, 7);
}

export function useProjectActions(activeProjectId?: string) {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<DialogType>(null);
  const [targetProject, setTargetProject] = useState<ProjectListItem | null>(null);
  const [formValue, setFormValue] = useState("");
  const [suffix, setSuffix] = useState(() => generateSuffix());
  const [isLoading, setIsLoading] = useState(false);

  function openCreate() {
    setSuffix(generateSuffix());
    setFormValue("");
    setTargetProject(null);
    setOpenDialog("create");
  }

  function openRename(project: ProjectListItem) {
    setFormValue(project.name);
    setTargetProject(project);
    setOpenDialog("rename");
  }

  function openDelete(project: ProjectListItem) {
    setTargetProject(project);
    setOpenDialog("delete");
  }

  function close() {
    setOpenDialog(null);
    setTargetProject(null);
    setFormValue("");
  }

  async function confirmCreate() {
    if (isLoading) return;
    const trimmed = formValue.trim();
    const slug = slugify(trimmed);
    if (!trimmed || !slug) return;
    // Capture roomId before close() clears formValue
    const roomId = `${slug}-${suffix}`;
    setIsLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed, roomId }),
      });
      if (!res.ok) return;
      const { project } = await res.json();
      close();
      router.push(`/editor/${project.roomId}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function confirmRename() {
    if (isLoading) return;
    const trimmed = formValue.trim();
    if (!targetProject || !trimmed || !slugify(trimmed)) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/projects/${targetProject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      if (!res.ok) return;
      close();
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  async function confirmDelete() {
    if (isLoading) return;
    if (!targetProject) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/projects/${targetProject.id}`, {
        method: "DELETE",
      });
      if (!res.ok) return;
      close();
      if (activeProjectId === targetProject.id) {
        router.push("/editor");
      } else {
        router.refresh();
      }
    } finally {
      setIsLoading(false);
    }
  }

  const roomIdPreview = formValue.trim()
    ? `${slugify(formValue.trim())}-${suffix}`
    : "";

  return {
    openDialog,
    targetProject,
    formValue,
    setFormValue,
    isLoading,
    roomIdPreview,
    openCreate,
    openRename,
    openDelete,
    close,
    confirmCreate,
    confirmRename,
    confirmDelete,
  };
}
