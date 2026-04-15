import { users } from "../user/user.schema.js";
import { db } from "../../db/index.js";
import { eq } from 'drizzle-orm'
import ApiError from '../../common/utils/ApiError.js'
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../../common/utils/jwtUtils.js";

const register = async ({ name, email, password }) => {

  
  const userEmailResult = await db.select().from(users).where(eq(users.email, email))

  if (userEmailResult.length > 0) throw ApiError.conflict("Email already registered");

  const hashedPass = await bcrypt.hash(password, 10)

  const [result] = await db.insert(users).values({
            name,
            email,
            password: hashedPass,
        }).returning({ id: users.id })

  // Don't let email failure crash registration — user is already created
//   try {
//     await sendVerificationEmail(email, rawToken);
//   } catch (err) {
//     console.error("Failed to send verification email:", err.message);
//   }

  
  return result;
};



const login = async ({ email, password }) => {
    const [user] = await db.select().from(users).where(eq(users.email, email))

    if (!user) throw ApiError.unauthorized("Invalid credentials")

    const validPass = await bcrypt.compare(password, user.password)

    if (!validPass) throw ApiError.unauthorized("Invalid credentials")

    if (!user.emailVerified) {
        throw ApiError.forbidden("Please verify your email before logging in")
    }

    const accessToken = generateAccessToken({ id: user.id })
    const refreshToken = generateRefreshToken({ id: user.id })

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)

    await db.update(users)
        .set({ refresh_token: hashedRefreshToken })
        .where(eq(users.id, user.id))

    return accessToken 
}






export{
    register,
    login
}