const url = require('url');
const passport = require('passport');

module.exports = function (router, authorizeCallback) {
  const clientID = process.env.PASSPORT_GOOGLE_CLIENTID;
  const clientSecret = process.env.PASSPORT_GOOGLE_SECRET;
  const baseUrl = process.env.PUBLIC_BASE_URL;

  if ((typeof clientID !== 'string') || (clientID.length < 2)) {
    return;
  }

  if ((typeof clientSecret !== 'string') || (clientSecret.length < 2)) {
    return;
  }

  if ((typeof baseUrl !== 'string') || (baseUrl.length < 2)) {
    throw Error('Missing env `PUBLIC_BASE_URL`.');
  }

  var parts = url.parse(baseUrl);

  if (!parts.protocol || !parts.host) {
    throw Error('Invlaid env `PUBLIC_BASE_URL`. Must be an URL.');
  }

  const DiscordStrategy = require('passport-google-oauth').Strategy;
  passport.use(new DiscordStrategy({
      consumerKey: clientID,
      consumerSecret: clientSecret,
      callbackURL: parts.protocol + '//' + parts.host + '/authorize/google/callback'
  }, function(accessToken, refreshToken, profile, next) {
      process.nextTick(function () {
        return next(null, profile);
      });
  }));

  router.get('/authorize/google', passport.authorize('google'));
  router.get('/authorize/google/callback', passport.authorize('google'), authorizeCallback);

};
