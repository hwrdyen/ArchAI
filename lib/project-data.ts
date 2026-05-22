import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export interface ProjectListItem {
  id: string;
  name: string;
  owned: boolean;
}

export async function getProjectLists(): Promise<{
  owned: ProjectListItem[];
  shared: ProjectListItem[];
}> {
  const user = await currentUser();
  if (!user) return { owned: [], shared: [] };

  const primaryEmail = user.emailAddresses.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress;

  const [ownedProjects, collaborations] = await Promise.all([
    prisma.project.findMany({
      where: { ownerId: user.id },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true },
    }),
    primaryEmail
      ? prisma.projectCollaborator.findMany({
          where: { collaboratorEmail: primaryEmail },
          include: { project: { select: { id: true, name: true } } },
          orderBy: { createdAt: "desc" },
        })
      : Promise.resolve([]),
  ]);

  return {
    owned: ownedProjects.map((p) => ({ ...p, owned: true })),
    shared: collaborations.map((c) => ({
      id: c.project.id,
      name: c.project.name,
      owned: false,
    })),
  };
}
