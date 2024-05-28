import { Page } from "@playwright/test";
import { APIRequestContext } from "playwright-core";

import { METHODS, STATUS_CODES } from "../constans/http";

import { CommonService } from "./Common";
import { GetDiets } from "../models/Diets";

declare module "../my-fixtures" {
  interface MyFixtures {
    dietService: DietService;
  }
}

export const injectDietService = async ({ page, request }, use) =>
  await use(new DietService(request, page));

class DietService extends CommonService {
  private readonly routes = {
    getURL: () => "/diets",
  };

  public constructor(request: APIRequestContext, page: Page) {
    super(request, page);
  }
  public async get(): Promise<GetDiets> {
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
