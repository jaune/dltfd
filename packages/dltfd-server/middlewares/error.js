/* eslint no-console: "off" */

module.exports = function() {
  return function(error, req, res, next) {
    console.error(error.message);
    console.error(error.stack);

    res.format({
      'text/plain': function(){
        res.status(500).send('500 - Internal Server Error.');
      },

      'text/html': function(){
        res.status(500).send([
          '<!DOCTYPE html>',
          '<html><head><title>500 - Internal Server Error</title></head><body><h1>500 - Internal Server Error</h1><h2>' + error + '</h2><pre>' + error.stack + '</pre></body></html>'
        ].join('\n'));
      },

      'application/json': function(){
        res.status(500).json({ error: '500 - Internal Server Error', message: error });
      },

      'default': function() {
        res.status(500).send('500 - Internal Server Error.');
      }
    });
  };
}
