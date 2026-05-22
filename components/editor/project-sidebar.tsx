"use client";

import { X, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { ProjectListItem } from "@/lib/project-data";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  ownedProjects: ProjectListItem[];
  sharedProjects: ProjectListItem[];
  onNewProject: () => void;
  onRename: (project: ProjectListItem) => void;
  onDelete: (project: ProjectListItem) => void;
}

export function ProjectSidebar({
  isOpen,
  onClose,
  ownedProjects,
  sharedProjects,
  onNewProject,
  onRename,
  onDelete,
}: ProjectSidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 sm:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed top-12 left-0 z-40 h-[calc(100vh-3rem)] w-72 bg-surface border-r border-surface-border flex flex-col transition-transform duration-200 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border">
          <span className="text-sm font-semibold text-copy-primary">
            Projects
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-7 w-7 text-copy-muted hover:text-copy-primary"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs
          defaultValue="my-projects"
          className="flex flex-col flex-1 min-h-0 pt-3"
        >
          <TabsList className="mx-4 w-auto">
            <TabsTrigger value="my-projects" className="flex-1">
              My Projects
            </TabsTrigger>
            <TabsTrigger value="shared" className="flex-1">
              Shared
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-projects" className="flex-1 min-h-0">
            {ownedProjects.length === 0 ? (
              <div className="flex items-center justify-center h-full px-4">
                <p className="text-sm text-copy-faint">No projects yet.</p>
              </div>
            ) : (
              <ScrollArea className="h-full">
                <div className="p-2 flex flex-col gap-0.5">
                  {ownedProjects.map((project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      showActions
                      onRename={() => onRename(project)}
                      onDelete={() => onDelete(project)}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="shared" className="flex-1 min-h-0">
            {sharedProjects.length === 0 ? (
              <div className="flex items-center justify-center h-full px-4">
                <p className="text-sm text-copy-faint">
                  No shared projects yet.
                </p>
              </div>
            ) : (
              <ScrollArea className="h-full">
                <div className="p-2 flex flex-col gap-0.5">
                  {sharedProjects.map((project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      showActions={false}
                      onRename={() => {}}
                      onDelete={() => {}}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>

        <div className="p-4 border-t border-surface-border">
          <Button className="w-full gap-2" onClick={onNewProject}>
            <Plus className="h-5 w-5" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}

interface ProjectItemProps {
  project: ProjectListItem;
  showActions: boolean;
  onRename: () => void;
  onDelete: () => void;
}

function ProjectItem({
  project,
  showActions,
  onRename,
  onDelete,
}: ProjectItemProps) {
  return (
    <div className="group flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-elevated cursor-pointer">
      <span className="flex-1 text-sm text-copy-secondary truncate">
        {project.name}
      </span>
      {showActions && (
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon-xs"
            className="text-copy-muted hover:text-copy-primary"
            onClick={(e) => {
              e.stopPropagation();
              onRename();
            }}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            className="text-copy-muted hover:text-error"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}
