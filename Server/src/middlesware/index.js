const privateAccess = (req, res, next) => {
  if (!req.session.user) return res.redirect("/login");

  next();
};

const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect("/products");

  next();
};

const auth = (req, res, next) => {
  const { admin } = req.session;
  if (!admin) {
    return res.json({ error: "no tienes las credenciales necesarias" });
  }
  next();
};
export default { publicAccess, privateAccess, auth };
