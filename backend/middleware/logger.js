module.exports = function logger(req, res, next) {
  const user = req.session && req.session.user ? req.session.user.username : 'guest';
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} by ${user}`);
  next();
};
