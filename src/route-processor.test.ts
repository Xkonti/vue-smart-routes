import { test, expect } from 'vitest';
import {RouteTarget} from './route-target.ts';
import {processRoutes} from './route-processor.ts';

function getMockComponent() {
  return new Promise((resolve) => {
    resolve('mock component');
  });
}

function getMockRoutes() {
  // Setup routes
  const routes = {
    home: new RouteTarget(),
    about: new RouteTarget(),
  };

  // Setup routing tree
  const routingTree = [
    {
      path: '/',
      component: () => getMockComponent(),
      children: [
        {
          path: routes.home.assign(''),
          name: 'Home page',
          component: () => getMockComponent(),
        },
      ],
    },
    {
      path: '/about',
      component: () => getMockComponent(),
      children: [
        {
          path: routes.about.assign('hello'),
          name: 'About page',
          component: () => getMockComponent(),
        },
      ],
    }
  ];

  return {routes, routingTree};
}

test('test route processing using routes as a list', () => {
  const {routes, routingTree} = getMockRoutes();
  const routesList = [routes.home, routes.about];
  
  // Process routes
  processRoutes(routingTree, routesList);

  // Check paths
  expect(routes.home.path).toBe('/');
  expect(routes.about.path).toBe('/about/hello');
});

test('test route processing using routes as an object', () => {
  const {routes, routingTree} = getMockRoutes();

  // Process routes
  processRoutes(routingTree, routes);

  // Check paths
  expect(routes.home.path).toBe('/');
  expect(routes.about.path).toBe('/about/hello');
});