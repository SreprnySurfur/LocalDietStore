import { APIRequestContext, expect, Page } from "@playwright/test";

import {
  METHODS,
  RequestMethods,
  ResponseStatusCodes,
  STATUS_CODES,
} from "../constans/http";
import { GetRequestOptions } from "../models/common";

const ANTI_THROTTLING_ONE_MINUTE_WAIT_IN_MS = 60000;

export abstract class CommonService {
  protected constructor(
    protected request: APIRequestContext,
    protected page: Page
  ) {}

  protected async requestToLocalhostEndpoint(
    endpoint: string,
    requestParams: RequestToEndpointParams
  ) {
    return this.requestToEndpoint(
      `http://localhost:3000${endpoint}`,
      requestParams
    );
  }

  private async requestToEndpoint(
    endpoint: string,
    { expectedStatusCode, method, options = {} }: RequestToEndpointParams
  ) {
    const methodFunction = MAP_METHOD_TO_FUNCTION[method];
    const response = await this.request[methodFunction](endpoint, {
      ...options,
      headers: {
        ...options.headers,
      },
    });

    const status = response.status();

    if (status === STATUS_CODES.TOO_MANY_REQUESTS) {
      await this.page.waitForTimeout(ANTI_THROTTLING_ONE_MINUTE_WAIT_IN_MS);

      return this.requestToEndpoint(endpoint, {
        expectedStatusCode,
        method,
        options,
      });
    }

    if (expectedStatusCode) {
      expect(response.status()).toBe(expectedStatusCode);
    }

    return response;
  }
}

const MAP_METHOD_TO_FUNCTION = {
  [METHODS.GET]: "get",
} as const;

type BaseRequestToEndpointParams = {
  expectedStatusCode?: ResponseStatusCodes;
  method: RequestMethods;
};

type MethodRequestToEndpointOptions = {
  method: typeof METHODS.GET;
  options?: GetRequestOptions;
};

type RequestToEndpointParams = BaseRequestToEndpointParams &
  MethodRequestToEndpointOptions;
