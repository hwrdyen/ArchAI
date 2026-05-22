import "dotenv/config";
import { prisma } from "../lib/prisma";

async function run() {
  const count = await prisma.$executeRaw`
    UPDATE "Project" SET "roomId" = id WHERE "roomId" IS NULL
  `;
  console.log(`Backfilled ${count} row(s).`);
  await prisma.$disconnect();
}

run();
