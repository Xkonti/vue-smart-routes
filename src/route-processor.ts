import { RouteRecordRaw } from 'vue-router';
import { RouteTarget } from './route-target';

function concatRoutePath (path: string | null, extension: string): string {
  if (path == null || path.length === 0) {
    return extension;
  }
  if (path.endsWith('/')) {
    return path + extension;
  }
  return path + '/' + extension;
}

export function processRoutes (
  routesTree: RouteRecordRaw[],
  routeTargets: RouteTarget[] | {[key: string]: RouteTarget},
  prefix: string | null = null
) {
  for (const route of routesTree) {
    // Extract route targets if passed as an object
    if (!(routeTargets instanceof Array)) {
      routeTargets = Object.values(routeTargets);
    }

    // Update route path and route target path
    const matchingTarget = routeTargets.find(target => target.id === route.path);
    if (matchingTarget) {
      route.path = matchingTarget.path;
      matchingTarget.path = concatRoutePath(prefix, matchingTarget.path);
    }

    // Recursively process children
    if (route.children) {
      processRoutes(route.children, routeTargets, concatRoutePath(prefix, route.path));
    }
  }
}
