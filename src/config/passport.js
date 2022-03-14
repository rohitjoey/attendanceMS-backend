const path = require("path");
const fs = require("fs");
const passport = require("passport");
const { ExtractJwt } = require("passport-jwt/lib");
const JwtStrategy = require("passport-jwt/lib/strategy");
const { User } = require("../database/models");

const pathToKey = path.join(__dirname, "..", "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const strategy = new JwtStrategy(options, async (payload, done) => {
  //   console.log(payload);
  const user = await User.findOne({ where: { id: payload.sub } });
  //   console.log(user);

  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
