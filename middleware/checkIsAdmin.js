const checkIsAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else if (req.user && req.user.role === "user") {
    res.json(false);
  } else res.send("User is neither admin nor user");
};

export default checkIsAdmin;
