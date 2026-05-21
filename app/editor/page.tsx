"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { CreateProjectDialog } from "@/components/editor/create-project-dialog";
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog";
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog";
import { Button } from "@/components/ui/button";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    projects,
    openDialog,
    targetProject,
    formValue,
    setFormValue,
    openCreate,
    openRename,
    openDelete,
    close,
    confirmCreate,
    confirmRename,
    confirmDelete,
  } = useProjectDialogs();

  return (
    <div className="h-screen bg-background overflow-hidden">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />
      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        projects={projects}
        onNewProject={openCreate}
        onRename={openRename}
        onDelete={openDelete}
      />
      <main className="h-full pt-12 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-4">
          <h1 className="text-xl font-semibold text-copy-primary">
            Create a project or open an existing one
          </h1>
          <p className="text-sm text-copy-muted max-w-sm">
            Start a new architecture workspace, or choose a project from the
            sidebar.
          </p>
          <Button className="gap-2" onClick={openCreate}>
            <Plus className="h-5 w-5" />
            New Project
          </Button>
        </div>
      </main>

      <CreateProjectDialog
        open={openDialog === "create"}
        formValue={formValue}
        onFormChange={setFormValue}
        onClose={close}
        onConfirm={confirmCreate}
      />
      <RenameProjectDialog
        open={openDialog === "rename"}
        project={targetProject}
        formValue={formValue}
        onFormChange={setFormValue}
        onClose={close}
        onConfirm={confirmRename}
      />
      <DeleteProjectDialog
        open={openDialog === "delete"}
        project={targetProject}
        onClose={close}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
