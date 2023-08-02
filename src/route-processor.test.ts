import { test, expect } from 'vitest';
import {RouteTarget} from './route-target.ts';
import {RouteRecordRaw} from 'vue-router';
import {processRoutes} from './route-processor.ts';

function getMockComponent() {
  return new Promise((resolve) => {
    resolve('mock component');
  });
}

test('test route processing', () => {
  // Setup routes
  const routes = {
    home: new RouteTarget(),
    about: new RouteTarget(),
  };

  // Make sure route IDs are unique
  expect(routes.home.id).not.toBe(routes.about.id);

  // Setup routing tree
  const routingTree: RouteRecordRaw[] = [
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

  // Process routes
  processRoutes(routingTree, Object.values(routes));

  // Check paths
  expect(routes.home.path).toBe('/');
  expect(routes.about.path).toBe('/about/hello');
});