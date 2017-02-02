const expect = require('chai').expect;
const flattenRoutes = require('../flattenRoutes.js');

describe('flattenRoutes', function () {

  it('should accept array.', function () {
    let input = [
      { path: '/', component: 1 },
      { path: '/test', component: 2 }
    ];

    let output = [
      { path: '/', component: 1 },
      { path: '/test', component: 2 }
    ];

    expect(flattenRoutes(input)).to.be.deep.equal(output);
  });

  it('should accept layout.', function () {
    let input = {
      component: 1,
      children: [
        { path: '/', component: 2 }
      ]
    };

    let output = [
      { path: '/', component: 2 }
    ];

    expect(flattenRoutes(input)).to.be.deep.equal(output);
  });

  it('should accept 2 levels.', function () {
    let input = {
      component: 1,
      path: '/users/:user_id',
      children: [
        { path: '/profile', component: 2 },
        { path: '/edit', component: 3 }
      ]
    };

    let output = [
      { path: '/users/:user_id', component: 1 },
      { path: '/users/:user_id/profile', component: 2 },
      { path: '/users/:user_id/edit', component: 3 }
    ];

    expect(flattenRoutes(input)).to.be.deep.equal(output);
  });

});
