const checkRole = (role) => (req, res, next) => {
    console.log('req.user at the start of checkRole:', req.user);
    if (req.user && req.user.role === role) {
        console.log("User object:", req.user);
        next();
    } else if (!req.user) {
        console.log('req.user is undefined');
        res.status(401).send('Unauthorized - no user object');
    } else {
        console.log(`Access denied - user role is ${req.user.role}, required role is ${role}`);
        res.status(403).send(`Zabranjen pristup - vaša uloga je ${req.user.role}`);
    }
};

export default checkRole;