"use client";

import { useState } from "react";
import { slugify } from "@/lib/slugify";
import { MOCK_PROJECTS, type MockProject } from "@/lib/mock-projects";

type DialogType = "create" | "rename" | "delete" | null;

export function useProjectDialogs() {
  const [projects, setProjects] = useState<MockProject[]>(MOCK_PROJECTS);
  const [openDialog, setOpenDialog] = useState<DialogType>(null);
  const [targetProject, setTargetProject] = useState<MockProject | null>(null);
  const [formValue, setFormValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function openCreate() {
    setFormValue("");
    setTargetProject(null);
    setOpenDialog("create");
  }

  function openRename(project: MockProject) {
    setFormValue(project.name);
    setTargetProject(project);
    setOpenDialog("rename");
  }

  function openDelete(project: MockProject) {
    setTargetProject(project);
    setOpenDialog("delete");
  }

  function close() {
    setOpenDialog(null);
    setTargetProject(null);
    setFormValue("");
  }

  function confirmCreate() {
    const trimmed = formValue.trim();
    if (!trimmed) return;
    setIsLoading(true);
    const newProject: MockProject = {
      id: Date.now().toString(),
      name: trimmed,
      slug: slugify(trimmed),
      owned: true,
    };
    setProjects((prev) => [...prev, newProject]);
    setIsLoading(false);
    close();
  }

  function confirmRename() {
    const trimmed = formValue.trim();
    const slug = slugify(trimmed);
    if (!targetProject || !trimmed || !slug) return;
    setIsLoading(true);
    setProjects((prev) =>
      prev.map((p) =>
        p.id === targetProject.id ? { ...p, name: trimmed, slug: slugify(trimmed) } : p
      )
    );
    setIsLoading(false);
    close();
  }

  function confirmDelete() {
    if (!targetProject) return;
    setIsLoading(true);
    setProjects((prev) => prev.filter((p) => p.id !== targetProject.id));
    setIsLoading(false);
    close();
  }

  return {
    projects,
    openDialog,
    targetProject,
    formValue,
    setFormValue,
    isLoading,
    openCreate,
    openRename,
    openDelete,
    close,
    confirmCreate,
    confirmRename,
    confirmDelete,
  };
}
