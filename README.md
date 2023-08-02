# Smart routes for Vue Router

- Type-safe routes with auto-completion
- Quick and easy to use

Definition:

```ts
export const routes = {
  home: new RouteTarget(),
  about: new RouteTarget(),
};
```

Usage in and outside Vue components:

``ts
routes.home.go();
````

## Installation

```bash
npm install vue-smart-routes
```

## Usage

First configure your routes and the router:

```ts
import { processRoutes, RouteTarget } from 'vue-smart-routes';
import { createRouter } from 'vue-router';

// Create routes and export them for use in components
export const routes = {
  home: new RouteTarget(),
  about: new RouteTarget(),
};

// Setup routing tree and assign routes to specific paths
const routingTree = [
  {
    path: '/',
    component: () => import('layouts/main-layout.vue'),
    children: [
      {
        path: routes.home.assign(''), // Turns into '/'
        name: 'Home page',
        component: () => import('pages/home-page.vue'),
      },
    ],
  },
  {
    path: '/about',
    component: () => import('layouts/main-layout.vue'),
    children: [
      {
        path: routes.about.assign('me'), // Turns into '/about/me'
        name: 'About page',
        component: () => import('pages/about-page.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/error-404.vue'),
  },
];

// Process routes to fill in the blanks
processRoutes(routingTree, Object.values(routes))

// Create router
const router = createRouter({
  routes: routingTree,
  ...
});

// Assign the router to the router service
routerService.assignRouter(router);
```

Then use the routes in your components:

```ts
import { routes } from 'src/router';

// Navigate to the home page ('/')
routes.home.go();

// Navigate to the about page ('/about/me')
routes.about.go();
```

## Development

- This project is using [pnpm](https://pnpm.io/) as a package manager.
- Run `pnpm install` to install dependencies.
- Run `pnpm test` to run tests once.
- Run `pnpm test:watch` to run tests in watch mode.
- Run `pnpm build` to build the project - this will also run the linter (EsLint).