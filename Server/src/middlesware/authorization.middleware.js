const authorization = (rol) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    if (req.user.rol == rol.user) return next();

    if (req.user.rol == rol.admin) return next();

    return res.status(403).json({ error: "Forbidden!!!!!" });
  };
};
export const publicAccess = (req, res, next) => {
  console.log(req.cookies?.authToken);
  if (req.cookies?.authToken) return res.redirect("/");

  next();
};

export default authorization;
