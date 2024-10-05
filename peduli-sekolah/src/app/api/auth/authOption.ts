// app/api/auth/authOptions.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import AzureADProvider from "next-auth/providers/azure-ad";
import DiscordProvider from "next-auth/providers/discord";
import LINEProvider from "next-auth/providers/line";
import { getUserByEmail, createUser, getUserByEmailAndType } from "@/db/models/user";
import { createTokenJose } from "@/utils/jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const scopes = ['identify'].join(' ')

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    AzureADProvider({
      clientId: `${process.env.AZURE_ADP_ID}` || "",
      clientSecret: `${process.env.AZURE_ADP_SECRET}` || "",
      tenantId: process.env.AZURE_ADP_TENANT_ID || "",
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
      authorization: {params: {scope: scopes}}
    }),
    LINEProvider({
      clientId: process.env.LINE_CLIENT_ID || "",
      clientSecret: process.env.LINE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Check if user exists in the database
        let dbUser = await getUserByEmailAndType(user.email, account?.provider);

        
        if (!dbUser) {
          dbUser = await createUser({
            email: user.email,
            username: user.name || profile?.name,
            type: account?.provider,
            password: "oauth",
            role: "Personal",
          });
        }

        // Create token payload with user details
        const payload = {
          id: dbUser._id, // Use the ID from the database
          email: dbUser.email,
          role: dbUser.role,
        };

        // Generate token using jose
        const token = await createTokenJose(payload);

        // Set token as a cookie
        cookies().set("token", token, {
          httpOnly: true,
          secure: false,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3-day expiration
          sameSite: "strict",
        });

        // Allow the sign-in process to proceed
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async session({ session, token }) {
      // Attach token info to the session
      session.user.id = token.sub;
      session.user.email = token.email;
      session.user.role = token.role || "user";
      return session;
    },

    async jwt({ token, user }) {
      // If there's a user object, attach their data to the token
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
};

export default authOptions;
