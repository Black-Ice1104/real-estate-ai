import jwt from 'jsonwebtoken';

const secret = '1234556';

export const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }
};

export const checkRole = roles => (req, res, next) => {
    console.log('Required Roles:', roles);
    if(!roles.includes(req.userData.role)) {
        console.log('User\'s role: ' + req.userData.role);
        return res.status(403).json({
            message: 'Access denied'
        });
    }
    next();
};