import * as authService from '../services/auth.services.js'

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
};


export const register = async (req, res, next) => {
  try {
    const {login, email, password, role } = req.body;

    if (!email || !password || !login) {
      return res.status(400).json({ message: "email, password,login required" });
    }
    const user = await authService.register({login, email, password, role });
    return res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    if (!login || !password)
      return res.status(400).json({ message: "login and password required" });

    const result = await authService.login({ login, password });
    if (!result) return res.status(401).json({ message: "Invalid credentials" });

    const cookieName = process.env.COOKIE_NAME || "access_token";
    res.cookie(cookieName, result.token, cookieOptions);

    res.json({ user: result.user });
  } catch (e) {
    next(e);
  }
};

export const logout = async (req, res) => {
  const cookieName = process.env.COOKIE_NAME || "access_token";
  res.clearCookie(cookieName, { path: "/" });
  res.status(204).send();
};

export const me = async (req, res, next) => {
  try {
    if (!req.user) return res.json({message: "Не вошли в систему"});

    const user = await authService.findPublicById(req.user.id);
    // if (!user) return res.status(401).json({ message: "Unauthorized" });
    res.json({ user });
  } catch (e) {
    next(e);
  }
};


export const getAllUsers = async (req, res, next) => {
  try {
    const users = await authService.getUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};