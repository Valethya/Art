export const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    return (token = req.cookies["authToken"]);
  }
  return token;
};
