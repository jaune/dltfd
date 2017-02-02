```js
{
  component: require('./MyLayoutComponent'),
  children: [
    {
      name: 'myroot',
      path: '/',
      component: require('./MyRootComponent'),
    },
    {
      name: 'myroute',
      path: '/route',
      component: require('./MyRouteComponent'),
    },
    {
      name: 'myroute_clone',
      path: '/route/clone',
      components: {
        children: require('./MyRouteComponent')
      }
    }
  ]
}
```
