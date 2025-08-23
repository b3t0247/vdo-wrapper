import { verifyPassword } from "@/utils/password";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password";

// Simulated user record (replace with DB lookup)
const user = {
  id: "1",
  name: "Admin",
  email: "admin@example.com",
  username: "admin",
  passwordHash: "$2b$12$Jr/mzoF9dcBiifEvrsanS.MNWnd.zCVnW8ZzNW3fK1juAXFX3nMqi", // bcrypt hash of real password
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // async authorize(credentials) {
      //   const { username, password } = credentials ?? {};
      //   if (username === "admin" && password === "password") {
      //     return { id: "1", name: "Admin", email: "admin@example.com" };
      //   }
      //   return null;
      // },
      async authorize(credentials) {
        const { username, password } = credentials ?? {};

        if (username !== user.username) return null;

        if (typeof password !== "string") return null;
        const isValid = await verifyPassword(password, user.passwordHash);
        if (!isValid) return null;

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  // pages: {
  //   signIn: "/login",
  // },
});
