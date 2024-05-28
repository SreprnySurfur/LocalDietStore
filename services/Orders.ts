import { Page } from "@playwright/test";
import { APIRequestContext } from "playwright-core";

import { METHODS, STATUS_CODES } from "../constans/http";

import { CommonService } from "./Common";
import { GetOrders } from "../models/Orders";

declare module "../my-fixtures" {
  interface MyFixtures {
    ordersService: OrdersService;
  }
}

export const injectOrdersService = async ({ page, request }, use) =>
  await use(new OrdersService(request, page));

class OrdersService extends CommonService {
  private readonly routes = {
    getURL: () => "/orders",
  };

  public constructor(request: APIRequestContext, page: Page) {
    super(request, page);
  }
  public async get(params?: any): Promise<GetOrders> {
    const response = await super.requestToLocalhostEndpoint(
      this.routes.getURL(),
      {
        expectedStatusCode: STATUS_CODES.OK,
        method: METHODS.GET,
        options: { params },
      }
    );

    return response.json();
  }
}
