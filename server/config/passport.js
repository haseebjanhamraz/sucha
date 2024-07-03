// config/passport.js

const { Strategy, ExtractJwt } = require("passport-jwt");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Blacklist = mongoose.model("Blacklist");
const secretOrKey = "your_jwt_secret_key"; // Replace with your own secret key

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        // Check if token is blacklisted
        const token = jwt_payload.token; // Assuming you store token in payload
        const tokenInBlacklist = await Blacklist.findOne({ token });
        if (tokenInBlacklist) {
          return done(null, false); // Token found in blacklist, not authenticated
        }

        // Token not blacklisted, find user
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
