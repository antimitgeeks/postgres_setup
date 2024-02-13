const { sendError } = require('../utils/responseHandler')
const passport = require('../config/passport');

const auth = (req, res, next) => {
     if (req.body.age >= 18) {
          next()
     } else {
          res.send(401)
     }
}

const isadmin = (req, res, next) => {
     if (req.body.isadmin == 1) {
          next()
     } else {
          sendError(res, 401, 'user not allowed to add User ')
     }
}

const verifyToken = async (req, res, next) => {
     await passport.authenticate('local', function (error, user, info) {
          // this will execute in any case, even if a passport strategy will find an error
          // log everything to console
          console.log(error, "error ");
          console.log(user, "user");
          console.log(info, 'info');
          console.log(req.session)
          if (error) {
               res.status(401).send(error);
          } else if (!user) {
               res.status(401).send(info);
          } else {
               next();
          }

          res.status(401).send(info);
     })(req, res);


}






module.exports = { auth, isadmin, verifyToken }
