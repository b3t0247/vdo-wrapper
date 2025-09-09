import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import type { EmailConfig } from "next-auth/providers/email";

// Define a custom user type for JWT and session payloads
type AuthUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
};

// Initialize Resend with your API key
const resend = new Resend(process.env.AUTH_RESEND_API_KEY);

// Custom email provider using Resend for magic link login
const ResendEmailProvider: EmailConfig = {
  id: "email",
  name: "Resend",
  type: "email",
  async sendVerificationRequest({ identifier, url }) {
    const fromAddress = process.env.EMAIL_FROM;
    if (!fromAddress) {
      throw new Error("EMAIL_FROM is not set in environment variables");
    }

    await resend.emails.send({
      from: fromAddress,
      to: identifier,
      subject: "Your Magic Login Link",
      html: `<p>Click <a href="${url}">here</a> to log in to your account.</p>`,
    });
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prisma),

  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username =
          typeof credentials?.username === "string"
            ? credentials.username
            : undefined;
        const password =
          typeof credentials?.password === "string"
            ? credentials.password
            : undefined;

        if (!username || !password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({ where: { username } });

        // Ensure user exists and password is a string
        if (!user || typeof user.password !== "string") {
          throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        // Return full user object with required fields
        return {
          id: user.id ?? "",
          name: user.name ?? user.username ?? "",
          email: user.email ?? "",
          emailVerified: user.emailVerified ?? null,
        } satisfies AuthUser;
      },
    }),

    ResendEmailProvider,
  ],

  session: {
    strategy: "jwt", // Stateless sessions for serverless environments
  },

  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  callbacks: {
    // Attach user data to the JWT token
    async jwt({ token, user }) {
      if (user) {
        // Defensive fallback for required fields
        const id = typeof user.id === "string" ? user.id : "";
        const name = typeof user.name === "string" ? user.name : "";
        const email = typeof user.email === "string" ? user.email : "";

        // Optional field: emailVerified may not exist on all user types
        const emailVerified =
          "emailVerified" in user && user.emailVerified instanceof Date
            ? user.emailVerified
            : null;

        token.user = {
          id,
          name,
          email,
          emailVerified,
        } satisfies AuthUser;
      }
      return token;
    },

    // Populate session.user from token.user
    async session({ session, token }) {
      const user = token.user as AuthUser;

      session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
      };

      return session;
    },
  },

  logger: {
    error(error) {
      console.error("[NextAuth][ERROR]", error);
    },
    warn(message) {
      console.warn("[NextAuth][WARN]", message);
    },
    debug(message) {
      console.debug("[NextAuth][DEBUG]", message);
    },
  },

  // Enable verbose logging in development
  debug: process.env.NODE_ENV !== "production",
});
