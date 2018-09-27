const HttpError = require('./HttpError');
const Users = require('./models/Users');

module.exports.UserRoute = (req, res, next) => {
    const session = req.get('Session');
    const token = req.get('X-CSRF-Token');

    if( req.userId ) return next();

    Users.authenticateTokens(session, token)
        .then(({userId}) => {
            req.userId = userId;
            next();
        })
        .catch(() => {
            console.log('This is.');
            res.status(401).json({"Error Message": "You are unauthorized."});
        });
};