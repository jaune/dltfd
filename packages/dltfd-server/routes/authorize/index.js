const express = require('express');
const uuidv4 = require('uuid').v4;

const router = express.Router();

function authorizeCallback(req, res, next) {
  const app = req.app;
  const authorization_uuid = uuidv4();
  const data = {
    uuid: authorization_uuid,
    session_id: req.session.id,
    authorization: req.account
  };
  const authorization_key = 'authorization/' + authorization_uuid;

  app.services.redis.set(authorization_key, JSON.stringify(data), function (error) {
    if (error) {
      return next(error);
    }

    var query = {
      authorizations: {
        $elemMatch: {
          id: data.authorization.id
        }
      }
    };

    app.services.mongodb.collection('accounts').findOne(query, function(error, account) {
      if (error) {
        return next(error);
      }

      if (req.session.user) {
        if (account) {
          if (account.uuid === req.session.user.account_uuid) {
            res.redirect('/authorization/' + authorization_uuid + '/message/already-attach-to-this-account.html');
            return next();
          } else {
            res.redirect('/authorization/' + authorization_uuid + '/message/already-attach-to-an-other-account.html');
            return next();
          }
        } else {
          res.redirect('/authorization/' + authorization_uuid + '/form/add-authorization-to-account.html');
          return next();
        }
      } else {
        if (account) {
          // Create session.
          req.session.user = {
            account_uuid: account.uuid
          };

          req.session.save(function(error) {
            if (error) {
              app.services.redis.delete(authorization_key); // async
              return next(error);
            }
            res.redirect('/account/@me.html');
            return next();
          });
        } else {
          res.redirect('/authorization/' + authorization_uuid + '/form/create-account.html');
          return next();
        }
      }
    });
  });
}

require('./steam.js')(router, authorizeCallback);
require('./twitchtv.js')(router, authorizeCallback);
require('./bnet.js')(router, authorizeCallback);
require('./discord.js')(router, authorizeCallback);
require('./google.js')(router, authorizeCallback);

module.exports = router;
