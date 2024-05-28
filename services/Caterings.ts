import { Page } from "@playwright/test";
import { APIRequestContext } from "playwright-core";

import { METHODS, STATUS_CODES } from "../constans/http";

import { CommonService } from "./Common";
import { GetCaterings } from "../models/Caterings";

declare module "../my-fixtures" {
  interface MyFixtures {
    cateringService: CateringService;
  }
}

export const injectCateringService = async ({ page, request }, use) =>
  await use(new CateringService(request, page));

class CateringService extends CommonService {
  private readonly routes = {
    getURL: () => "/caterings",
  };

  public constructor(request: APIRequestContext, page: Page) {
    super(request, page);
  }
  public async get(): Promise<GetCaterings> {
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
