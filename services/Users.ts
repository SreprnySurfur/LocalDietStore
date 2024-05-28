import { Page } from "@playwright/test";
import { APIRequestContext } from "playwright-core";

import { METHODS, STATUS_CODES } from "../constans/http";

import { CommonService } from "./Common";
import { GetUsers } from "../models/Users";

declare module "../my-fixtures" {
  interface MyFixtures {
    userService: UsersService;
  }
}

export const injectUsersService = async ({ page, request }, use) =>
  await use(new UsersService(request, page));

class UsersService extends CommonService {
  private readonly routes = {
    getURL: () => "/users",
  };

  public constructor(request: APIRequestContext, page: Page) {
    super(request, page);
  }
  public async get(): Promise<GetUsers> {
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
