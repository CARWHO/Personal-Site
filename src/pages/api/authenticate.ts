import { NextApiRequest, NextApiResponse } from "next";
import * as cookie from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { password } = req.body;
    const correctPassword = process.env.DAWN_AEROSPACE_PASSWORD;
    
    console.log('Authentication attempt:', {
      providedPassword: password,
      correctPassword: correctPassword || 'undefined',
      matches: password === correctPassword,
      envVars: process.env
    });

    if (password === correctPassword) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("authToken", "authenticated", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        }),
      );

      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ message: "Incorrect password" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
