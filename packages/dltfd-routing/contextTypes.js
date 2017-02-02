const React = require('react');

module.exports = {
  'router': React.PropTypes.shape({
    resolve: React.PropTypes.func.isRequired,
    push: React.PropTypes.func.isRequired
  }).isRequired
};
