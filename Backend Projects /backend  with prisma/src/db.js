import { PrismaClient } from "@prisma/client/index.js";

const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") globalForPrisma.prims = db