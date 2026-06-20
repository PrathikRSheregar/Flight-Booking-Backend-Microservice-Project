function isFlightCompany(req, res, next) {
    try {
        const userHeader = req.headers['x-user'];
        if (!userHeader) {
            return res.status(401).json({
                success: false,
                message: 'User information missing'
            });
        }
        req.user = JSON.parse(userHeader); 
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

function isAdmin(req, res, next) {
    try {
        const userHeader = req.headers['x-user'];

        if (!userHeader) {
            return res.status(401).json({
                success: false,
                message: 'User information missing'
            });
        }

        req.user = JSON.parse(userHeader);

        if (!req.user.roles.includes('admin')) {
            return res.status(403).json({
                success: false,
                message: 'Only admins can access this route'
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

function isFlightCompanyOrAdmin(req, res, next) {
    try {
        const userHeader = req.headers['x-user'];

        if (!userHeader) {
            return res.status(401).json({
                success: false,
                message: 'User information missing'
            });
        }

        req.user = JSON.parse(userHeader);

        const roles = req.user.roles;

        if (
            roles.includes('flight_company') ||
            roles.includes('admin')
        ) {
            return next();
        }

        return res.status(403).json({
            success: false,
            message: 'Only flight companies or admins can access this route'
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
}

/*
function checkRoles(allowedRoles) {
    return (req, res, next) => {
        const user = JSON.parse(req.headers['x-user']);

        const hasAccess = allowedRoles.some(role =>
            user.roles.includes(role)
        );

        if (!hasAccess) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden'
            });
        }

        req.user = user;
        next();
    };
}
*/
module.exports = {
    isFlightCompany,
    isAdmin,
    isFlightCompanyOrAdmin
};