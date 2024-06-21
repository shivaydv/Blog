import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { Prisma } from "../prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ profile }) {
      try {
        if (!profile || !profile.name || !profile.email) return false;

        const user = await Prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });

        if (user) {
        } else {
          const newUser = await Prisma.user.create({
            data: {
              name: profile.name,
              email: profile.email,
              image: profile.picture,
              role:
                profile.email === process.env.ADMIN_EMAIL ? "ADMIN" : "USER",
            },
          });
        }

        return true;
      } catch (error) {
        console.log("ERROR IN SIGNIN ---------\n", error);
        return false;
      }
    },
    jwt: async ({ token, user }) => {
      const dbUser = await Prisma.user.findFirst({
        where: { email: user?.email as string },
      });
      if (!dbUser) {
        token.id = user.id as string;
        return token;
      }

      return {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        image: dbUser.image,
        role: dbUser.role,
      };
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.image as string;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
