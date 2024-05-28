import { APIRequestContext } from "@playwright/test";
import { Route } from "playwright-core";

import { ResponseStatusCodes } from "../constans/http";

export type UUID = string;
export type ObjectWithId = {
  id: UUID;
};

export type MakePropertiesOptional<
  ObjectToModify,
  Keys extends keyof ObjectToModify,
> = Omit<ObjectToModify, Keys> & Partial<Pick<ObjectToModify, Keys>>;

export type MakePropertiesRequired<
  ObjectToModify,
  Keys extends keyof ObjectToModify,
> = Pick<ObjectToModify, Keys> & Partial<Omit<ObjectToModify, Keys>>;

export type ObjectValuesAsType<T> = T[keyof T];

type GetRequestParameters = Parameters<APIRequestContext["get"]>;

export type GetRequestOptions = GetRequestParameters[1];

export type StubEndpointOptions = Parameters<Route["fulfill"]>[0] & {
  status: ResponseStatusCodes;
};
