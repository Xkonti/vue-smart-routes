import {expect, test} from 'vitest';
import {RouteTarget} from './route-target.ts';

test('test route target IDs', () => {
// Setup routes
  const routes = {
    home: new RouteTarget(),
    about: new RouteTarget(),
  };

  // Make sure route IDs are unique and not null
  expect(routes.home.id).not.toBeNull();
  expect(routes.about.id).not.toBeNull();
  expect(routes.home.id).not.toBe(routes.about.id);
});