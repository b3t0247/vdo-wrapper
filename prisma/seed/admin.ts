import { prisma } from "../../src/lib/prisma";
import bcrypt from "bcryptjs";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

async function seedAdmin() {
  const existing = await prisma.user.findUnique({
    where: { username: "admin" },
  });
  if (existing) {
    console.log("Admin user already exists.");
    return;
  }

  console.log("🔐 Create Admin Password");

  const password = prompt("Enter new password: ", { echo: "*" });
  const confirm = prompt("Confirm new password: ", { echo: "*" });

  if (!password || !confirm) {
    console.error("❌ Password cannot be empty.");
    process.exit(1);
  }

  if (password !== confirm) {
    console.error("❌ Passwords do not match.");
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@example.com",
      name: "Admin",
      password: hashedPassword,
    },
  });

  console.log("✅ Admin user created.");
}

seedAdmin().catch((err) => {
  console.error("❌ Error updating password:", err);
  process.exit(1);
});
