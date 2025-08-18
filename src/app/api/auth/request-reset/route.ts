// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/db";
// import crypto from "crypto";

// export async function POST(req: Request) {
//   const { email } = await req.json();

//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }

//   const token = crypto.randomBytes(32).toString("hex");
//   const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 min

//   await prisma.passwordResetToken.create({
//     data: {
//       token,
//       userId: user.id,
//       expires,
//     },
//   });

//   // TODO: Send email with link
//   console.log(
//     `Reset link: https://yourdomain.com/reset-password?token=${token}`,
//   );

//   return NextResponse.json({ message: "Reset link sent" });
// }
