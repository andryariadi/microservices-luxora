import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import { CustomJwtSessionClaims } from "@repo/types";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req);

  if (!auth.userId) {
    return res.status(401).json({ message: "User not authenticated!" });
  }

  req.userId = auth.userId;

  return next();
};

export const authAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req);

  if (!auth.userId) {
    return res.status(401).json({ message: "User not authenticated!" });
  }

  const claims = auth.sessionClaims as CustomJwtSessionClaims;

  console.log({ claims }, "<---authMiddlewareExpress");

  if (claims.metadata?.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized, you are not an admin!" });
  }

  req.userId = auth.userId;

  return next();
};
