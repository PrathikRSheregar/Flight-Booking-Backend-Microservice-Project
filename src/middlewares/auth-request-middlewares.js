const jwt = require('jsonwebtoken');
const {serverconfig} = require('../config');
function isFlightCompany(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token missing'
            });
        }

        const decoded = jwt.verify(token, serverconfig.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;

        console.log(req.user.roles); // Debug

        if (!req.user.roles.includes('flight_company')) {
    return res.status(403).json({
        success: false,
        message: 'Only flight companies can access this route'
    });
}

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
}
module.exports={
    isFlightCompany
}