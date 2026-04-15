import ApiError from "../../common/utils/ApiError.js";
import { db } from "../../db/index.js";
import { eq } from 'drizzle-orm'
import { users } from "../user/user.schema.js";
import { verifyAccessToken } from "../../common/utils/jwtUtils.js";

export const authenticate = async (req, res, next) => {
  let token;

  token = req.cookies?.accessToken;
    
  if (!token) {
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
     }
  }
  

  if (!token) throw ApiError.unauthorized("Not authenticated");

  const decoded = verifyAccessToken(token);

  if (!decoded?.id) {
    throw ApiError.unauthorized("Invalid token");
  }

  const [user] = await db.select().from(users).where(eq(users.id, decoded.id));

  if (!user) throw ApiError.unauthorized("User no longer exists");

  req.user = user;

  next();
};