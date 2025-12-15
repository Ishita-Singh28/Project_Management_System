function requireRole(role) {
  return function(req, res, next) {
    const user = req.session && req.session.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    if (user.role !== role) return res.status(403).json({ error: 'Forbidden. Requires ' + role });
    next();
  };
}

module.exports = { requireRole };
