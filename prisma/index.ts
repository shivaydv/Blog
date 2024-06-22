// import { PrismaClient } from "@prisma/client";

// const Prisma = new PrismaClient();
// export default Prisma;
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const Prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default Prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = Prisma