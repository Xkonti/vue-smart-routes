import { routerService } from "./router-service";

let routeTargetIdCounter = 0;
function routeTargetGetNextId (): number{
    return routeTargetIdCounter++;
}

export class RouteTarget {
  id = routeTargetGetNextId().toString()
  path = ''

  public assign (route: string): string {
    this.path = route
    return this.id
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public go () {
    return routerService.go(this)
  }
}
