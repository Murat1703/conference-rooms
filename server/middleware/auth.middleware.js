import jwt from "jsonwebtoken";

// export const requireAuth = (req, res, next) => {
//   try {
//     const cookieName = process.env.COOKIE_NAME || "access_token";
//     const token = req.cookies?.[cookieName];
//     // if (!token) return res.status(401).json({ message: "Unauthorized" });
//     if (!token) {
//       req.user = null;
//       return next();
//     }
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     // payload: { id, email, role, iat, exp }
//     req.user = payload;

//     next();
//   } catch (e) {
//     // return res.status(401).json({ message: "Unauthorized" });
//     req.user = null;
//   }
// };


export const requireAuth = (req, res, next) => {
    const cookieName = process.env.COOKIE_NAME || "access_token";
    const token = req.cookies?.[cookieName];
    // if (!token) return res.status(401).json({ message: "Unauthorized" });
    if (!token) {
      req.user = null;
      return next();
    }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
  } catch (e) {
    // return res.status(401).json({ message: "Unauthorized" });
    req.user = null;
  }

  return next();
};
