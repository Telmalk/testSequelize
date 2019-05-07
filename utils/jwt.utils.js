const jwt = require("jsonwebtoken");

const JWT_SIGN_SECRET = "AzDqsd43341243dfsz43245323qsdzqsdzdq";

module.exports = {
    generateToken: (userData) => {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
            JWT_SIGN_SECRET,
            {
                expiresIn: '1h'
            })
    },
    parseAuthorization: (authorization) => {
        return (authorization != null) ? authorization.replace("Bearer ", "") : null;
    },
    getUserId: (authorization) => {
        let userId = -1;
        let token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null)
                    userId = jwtToken.userId
            } catch (e) {
                throw e;
            }
            return userId;
        }
    }
};