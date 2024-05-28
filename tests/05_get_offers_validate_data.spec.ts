import { test as base, expect } from "@playwright/test";
import type { MyFixtures } from "../my-fixtures";
import { injectOffersService } from "../services/Offers";
import { GetOffers } from "../models/Offers";

const test = base.extend<MyFixtures>({
  offersService: injectOffersService,
});

test.describe("05 - Offers test cases", () => {
  let request: GetOffers;

  test.beforeEach(async ({ offersService }) => {
    const getUsers = await offersService.get();

    request = getUsers;
  });

  test("Check users length", async ({}) => {
    expect(request).toHaveLength(9);
  });

  test("Check duplicate message", async ({}) => {
    if (request[7]._debug === "non existing diet") {
      throw new Error(`Test failed because ${request[7]._debug}'`);
    }
  });
});
