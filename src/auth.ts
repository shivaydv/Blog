import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Prisma from "../prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Github],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
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

        if (!user) {
          await Prisma.user.create({
            data: {
              name: profile.name,
              email: profile.email,
              image: profile.picture || profile.avatar_url,
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
    jwt: async ({ token, user, account, profile,trigger }) => {

      


       if (account && profile) {
        console.log(user);

        const dbUser = await Prisma.user.findUnique({
          where: { email: profile.email as string },
        });

        if (!dbUser) {
          return token;
        }
        return {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          image: dbUser.image,
          role: dbUser.role,
        };
      } else {
        return token;
      }
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
