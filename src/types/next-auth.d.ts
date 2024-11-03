import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    id: string;
    image: string;
    role: UserRole;
  }

  interface User {
    id: string;

    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;

    role: UserRole;
  }
}
