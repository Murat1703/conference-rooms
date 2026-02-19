import * as authRepo from "../repositories/auth.repository.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const register = async ({login, email, password, role }) => {
  const existing = await authRepo.findByLogin(login);
  if (existing) {
    const e = new Error("Login already exists");
    e.status = 409;
    throw e;
  }

  const password_hash = await bcrypt.hash(password, 10);
  const created = await authRepo.createUser({
    login,
    email,
    password_hash,
    role: role || "user",
  });

  return { id: created.id, login: created.login, email: created.email, role: created.role };
};

export const login = async ({ login, password }) => {
  const user = await authRepo.findByLogin(login);
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;

  const token = jwt.sign(
    { id: user.id, login: user.login, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );

  return { token, user: { id: user.id, login: user.login, email: user.email, role: user.role } };
};

export const findPublicById = async (id) => {
  const user = await authRepo.findPublicById(id);
  if (!user) return null;

  return {
    id: user.id,
    login: user.login,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
  };
};

export const getUsers = () => {
  return authRepo.getUsers();
};

