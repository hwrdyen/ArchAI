import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  });

  return Response.json({ projects });
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const name = typeof body?.name === "string" && body.name.trim()
    ? body.name.trim()
    : "Untitled Project";
  const roomId = typeof body?.roomId === "string" && body.roomId.trim()
    ? body.roomId.trim()
    : null;

  if (!roomId) {
    return Response.json({ error: "roomId is required" }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: { ownerId: userId, name, roomId },
  });

  return Response.json({ project }, { status: 201 });
}
