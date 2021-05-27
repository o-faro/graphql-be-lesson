const jwt = require("jsonwebtoken");
const APP_SECRET = "Graph-ql-is-aw3some-and-this-is-so-secret--nobody-can-even-read-this";

const getTokenPayLoad = (token) => {
    return jwt.verify(token, APP_SECRET);
}

const getUserId = (req, authToken) => {
    if (req) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace("Bearer ", "");
            if (!token) {
                throw new Error("No token found");
            }
            const { userId } = getTokenPayLoad(token);

            // console.log("header userId", userId)
            return userId;
        }
    } else if (authToken) {
        const { userId } = getTokenPayLoad(token);

        // console.log("token userId", userId)
        return { userId }
    }
    throw new Error("Not authenticated");
}

module.exports = {
    APP_SECRET,
    getUserId,
}