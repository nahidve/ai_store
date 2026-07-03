import { userRepository } from "@/repositories/user.repository";
import { sessionRepository } from "@/repositories/session.repository";
import { LoginInput, RegisterInput } from "@/validations/auth.schema";
import { comparePassword, hashPassword } from "@/lib/password";
import { signJwt, verifyJwt } from "@/lib/jwt";
import { getAuthCookie, removeAuthCookie, setAuthCookie } from "@/lib/cookies";
import { toSafeUser } from "@/lib/auth";

export const authService = {
  async register(input: RegisterInput) {
    const existingUser = await userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const passwordHash = await hashPassword(input.password);
    const user = await userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
    });
    return user;
  },

  async login(
    input: LoginInput,
    meta?: {
      ipAddress?: string;
      userAgent?: string;
    },
  ) {
    const user = await userRepository.findByEmail(input.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const passwordMatches = await comparePassword(
      input.password,
      user.passwordHash,
    );
    if (!passwordMatches) {
      throw new Error("Invalid credentials");
    }
    const session = await sessionRepository.create({
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      ipAddress: meta?.ipAddress,
      userAgent: meta?.userAgent,
    });
    const token = signJwt({
      userId: user.id,
      sessionId: session.id,
      role: user.role,
    });
    await setAuthCookie(token);
    return {
      user: toSafeUser(user),
    };
  },

  async logout() {
    const token = await getAuthCookie();
    if (!token) {
      return;
    }
    try {
      const payload = verifyJwt(token);

      await sessionRepository.deactivate(payload.sessionId);
    } catch {}

    await removeAuthCookie();
  },

  async getCurrentUser() {
    const token = await getAuthCookie();

    if (!token) {
      return null;
    }

    try {
      const payload = verifyJwt(token);

      const session = await sessionRepository.findById(payload.sessionId);

      if (!session) {
        return null;
      }

      if (!session.isActive) {
        return null;
      }

      if (session.expiresAt < new Date()) {
        return null;
      }

      const user = await userRepository.findById(payload.userId);

      return toSafeUser(user!);
    } catch {
      return null;
    }
  },
};
