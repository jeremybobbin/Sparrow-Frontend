const HttpError = require('./HttpError');
const Users = require('./models/Users');

module.exports.UserRoute = (req, res, next) => {
    const session = req.get('Session');
    const token = req.get('X-CSRF-Token');

    if( req.userId ) return next();

    Users.authenticateTokens(session, token)
        .then(({ userId }) => {
            console.log('Loggin from "authenticateTokens()".');
            req.userId = parseInt(userId);
            next();
        })
        .catch((err) => {
            console.log('JerWear error.', err);
            res.status(401).json({"Error Message": "You are unauthorized."});
        });
};