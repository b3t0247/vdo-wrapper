import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

async function updateAdminPassword() {
  console.log("🔐 Update Admin Password");

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

  const updated = await prisma.user.update({
    where: { username: "admin" },
    data: { password: hashedPassword },
  });

  console.log(`✅ Password updated for user: ${updated.username}`);
}

updateAdminPassword().catch((err) => {
  console.error("❌ Error updating password:", err);
  process.exit(1);
});
