const React = require('react');
const ReactRedux = require('react-redux');
const indexRoutes = require('../indexRoutes.js');

const pushHistoryState = require('../actions/pushHistoryState.js');

module.exports = React.createClass({
  displayName: 'router/Provider',
  childContextTypes: require('../contextTypes.js'),
  propTypes: {
    currentRouteKey: React.PropTypes.string.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    routes: React.PropTypes.object.isRequired
  },

  getChildContext() {
    return {
      router: {
        resolve: () => {
          return this.resolve.apply(this, arguments);
        },
        push: (route) => {
          this.props.dispatch(pushHistoryState(route));
        }
      }
    };
  },

  getIndexedRoutes: function () {
    if (this.indexedRoutes) {
      return this.indexedRoutes;
    }
    return this.indexedRoutes = indexRoutes(this.props.routes);
  },

  getComponents: function (routeKey) {
    const routes = this.getIndexedRoutes();

    if (routes[routeKey]) {
      return [ routes[routeKey].component ];
    }
    return [];
  },

  getLayout: function (routeKey) {
    return function (props) { return React.createElement('div', props); };
  },

  createElements: function (routeKey) {
    const routes = this.getIndexedRoutes();

    if (routes[routeKey]) {
      return { children: React.createElement(routes[routeKey].component) };
    }

    return { children: [] };
  },

  fetchData: function (routeKey) {
    for (let comp of this.getComponents(routeKey)) {
      if (typeof comp.fetchData === 'function') {
        this.props.dispatch(comp.fetchData());
      }
    }
  },

  componentWillReceiveProps: function (props) {
    if (props.currentRouteKey !== this.props.currentRouteKey) {
      this.fetchData(props.currentRouteKey);
    }
  },

  componentDidMount: function () {
    this.fetchData(this.props.currentRouteKey);
  },

  render: function() {
    const routeKey = this.props.currentRouteKey;
    const Layout = this.getLayout(routeKey);
    const elements = this.createElements(routeKey);

    return React.createElement(Layout, elements);
  }
});

module.exports = ReactRedux.connect(
  function mapStateToProps (state, ownProps) {
    return Object.assign({}, ownProps, {
      currentRouteKey: state.routing.pattern
    });
  },
  function mapDispatchToProps (dispatch, ownProps) {
    return Object.assign({}, ownProps, {
      dispatch: dispatch
    });
  }
)(module.exports);
