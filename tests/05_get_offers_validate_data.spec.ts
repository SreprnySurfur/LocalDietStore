import { test as base, expect } from "@playwright/test";
import type { MyFixtures } from "../my-fixtures";
import { injectOffersService } from "../services/Offers";

const test = base.extend<MyFixtures>({
  offersService: injectOffersService,
});

test.describe("05 - Offers test cases", () => {
  test("test", async ({ offersService }) => {
    const test = await offersService.get();
    console.log(test);
  });
});
