/* globals require */

export default [
  {
    component: require('./containers/DefaultLayout').default,
    children: [
      {
        path: '/',
        component: require('./containers/Home').default
      },
      {
        path: '/test',
        component: require('./containers/Test').default
      }
    ]
  }
];
