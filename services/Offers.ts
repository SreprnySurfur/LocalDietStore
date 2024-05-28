import { Page } from "@playwright/test";
import { APIRequestContext } from "playwright-core";

import { METHODS, STATUS_CODES } from "../constans/http";

import { CommonService } from "./Common";
import { GetOffers } from "../models/Offers";

declare module "../my-fixtures" {
  interface MyFixtures {
    offersService: OffersService;
  }
}

export const injectOffersService = async ({ page, request }, use) =>
  await use(new OffersService(request, page));

class OffersService extends CommonService {
  private readonly routes = {
    getURL: () => "/offers",
  };

  public constructor(request: APIRequestContext, page: Page) {
    super(request, page);
  }
  public async get(): Promise<GetOffers> {
    const response = await super.requestToLocalhostEndpoint(
      this.routes.getURL(),
      {
        expectedStatusCode: STATUS_CODES.OK,
        method: METHODS.GET,
      }
    );

    return response.json();
  }
}
