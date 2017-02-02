const React = require('react');

module.exports = React.createClass({
  displayName: 'router/Link',
  contextTypes: require('../contextTypes.js'),
  propTypes: {
    name: React.PropTypes.string.isRequired,
    params: React.PropTypes.object,
    children: React.PropTypes.any
  },

  getInitialState: function () {
    const route = this.context.router.resolve(this.props.name, this.props.params || {});

    if (!route) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Warning: Missing route for name `' + this.props.name + '`');
      }
      return { route: null };
    }

    return {
      route: route
    }
  },
  onClick: function (event) {
    if ((event.button === 0) && !event.ctrlKey) {
      event.preventDefault();
      this.context.router.push(this.state.route);
    }
  },
  render: function() {
    const route = this.state.route;

    if (!route) {
      return React.createElement('a', { href: "#no-where" }, this.props.children);
    }

    if (!route.virtual) {
      return React.createElement('a', { href: route.url } ,this.props.children);
    }
    return React.createElement('a', { href: route.url, onClick: this.onClick }, {this.props.children);
  }
});
