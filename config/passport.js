const LocalStrategy = require('passport-local').Strategy
const { Employee } = require('../model/user')
const validPassword = require('../lib/passwordUtils').validPassword
//strategy 
exports.initializePassport = (passport) => {
     passport.use(
          new LocalStrategy(
               {
                    usernameField: 'email',
                    passwordField: 'password',
               },
               async (email, password, done) => {
                    try {
                         const employee = await Employee.findOne({
                              where: { email: email },
                              row: true
                         });
                         if (!employee) {
                              return done(null, false, {
                                   message: ' Incorrect Email.',
                              })
                         }
                         const isValid = validPassword(
                              password,
                              employee.hash,
                              employee.salt,
                         );
                         if (isValid) {
                              const data = employee.toJSON()
                              return done(null, data)
                         } else {
                              return done(null, false, {
                                   message: 'Incorrect password.',
                              })
                         }
                    } catch (err) {
                         console.log('Error', err)
                         return done(err)
                    }
               },
          ),
     )

     //after stately we need to serialize and deserialize it 
     passport.serializeUser((user, done) => {
          done(null, user);
     });

     passport.deserializeUser(async (id, done) => {
          try {
               const user = await Employee.findOne({ where: { id: id } });
               done(null, user);
          } catch (error) {
               done(error);
          }
     });

};




