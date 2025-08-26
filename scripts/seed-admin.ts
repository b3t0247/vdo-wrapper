import { prisma } from "../src/lib/prisma";

import bcrypt from "bcryptjs";

async function seedAdmin() {
  const existing = await prisma.user.findUnique({
    where: { username: "admin" },
  });
  if (existing) {
    console.log("Admin user already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("password", 10);

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
  console.error("❌ Error seeding admin:", err);
  process.exit(1);
});
