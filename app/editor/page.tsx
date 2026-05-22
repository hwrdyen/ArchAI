import { EditorHomeClient } from "@/components/editor/editor-home-client";
import { getProjectLists } from "@/lib/project-data";

export default async function EditorPage() {
  const { owned, shared } = await getProjectLists();

  return <EditorHomeClient ownedProjects={owned} sharedProjects={shared} />;
}
