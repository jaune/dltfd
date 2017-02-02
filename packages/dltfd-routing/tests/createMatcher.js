const expect = require('chai').expect;
const createMatcher = require('../createMatcher.js');

describe('createMatcher', function () {

  it('should accept simple routes.', function () {
    let routes = [
      { path: '/', component: 1 },
      { path: '/test', component: 2 }
    ];
    let matcher = createMatcher(routes);
    let match = matcher.match('/test');

    expect(match).to.be.an('object');
    expect(match).to.have.property('pattern').equal('/test');
    expect(match).to.have.property('params').deep.equal({});
  });

  it('should accept parametrable routes.', function () {
    let routes = [
      { path: '/', component: 1 },
      { path: '/users/:id', component: 2 }
    ];
    let matcher = createMatcher(routes);
    let match = matcher.match('/users/666');

    expect(match).to.be.an('object');
    expect(match).to.have.property('pattern').equal('/users/:id');
    expect(match).to.have.property('params').deep.equal({
      id: '666'
    });
  });

});
