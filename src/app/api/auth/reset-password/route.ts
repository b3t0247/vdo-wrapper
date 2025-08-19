import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { prisma } from "@/lib/db";

// export async function POST(req: Request) {
//   const { token, newPassword } = await req.json();

//   const resetRecord = await prisma.passwordResetToken.findUnique({
//     where: { token },
//   });

//   if (!resetRecord || resetRecord.expires < new Date()) {
//     return NextResponse.json(
//       { error: "Invalid or expired token" },
//       { status: 400 },
//     );
//   }

//   const hashedPassword = await bcrypt.hash(newPassword, 10);

//   await prisma.user.update({
//     where: { id: resetRecord.userId },
//     data: { password: hashedPassword },
//   });

//   await prisma.passwordResetToken.delete({ where: { token } });

//   return NextResponse.json({ message: "Password updated" });
// }

export async function POST(request: Request) {
  const body = await request.json();
  const { token } = body;

  // Placeholder logic for password reset
  console.log(`Resetting password with token: ${token}`);

  return NextResponse.json({
    message: "Password reset placeholder successful",
  });
}
