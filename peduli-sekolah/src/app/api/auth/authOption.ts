// app/api/auth/authOptions.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import AzureADProvider from "next-auth/providers/azure-ad";
import DiscordProvider from "next-auth/providers/discord";
import LINEProvider from "next-auth/providers/line";
import { createUser, getUserByEmailAndType } from "@/db/models/user";
import { createTokenJose } from "@/utils/jose";
import { cookies } from "next/headers";

const scopes = ['identify'].join(' ');

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
      authorization: { params: { scope: scopes } },
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
        let dbUser = await getUserByEmailAndType(user.email || '', account?.provider || '');

        if (!dbUser) {
          dbUser = await createUser({
            username: user.name || profile?.name || 'Anonymous', // Fallback for username
            email: user.email || '', // Provide fallback for email
            password: "oauth", 
            phone_number: "",
            type: account?.provider || 'unknown',
            account_type: "Individual",
            role: "user",
            status: "active"
          });
        }

        // Create token payload with user details
        const payload = {
          id: dbUser._id.toString(), // Use the ID from the database, cast to string
          email: dbUser.email,
          role: dbUser.role,
        };

        // Generate token using jose
        const token = await createTokenJose(payload);

        // Set token as a cookie
        cookies().set("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // true in production
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
      if (session.user && token.sub) {
        session.user.id = token.sub;  // Use the sub (subject) field for user ID
      }

      session.user.email = token.email || session.user.email; // Fallback if token doesn't have email
      session.user.role = token.role || "user"; // Default role is user
      return session;
    },

    async jwt({ token, user }) {
      // If there's a user object, attach their data to the token
      if (user) {
        token.sub = (user as any).id; // Cast user to 'any' to access id
        token.email = user.email || '';
        token.role = (user as any).role || 'user'; // Cast user to 'any' to access role
      }
      return token;
    },
  },
};

export default authOptions;
