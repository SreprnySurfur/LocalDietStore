import { test as base, expect } from "@playwright/test";
import type { MyFixtures } from "../my-fixtures";
import { injectDietService } from "../services/Diets";

const test = base.extend<MyFixtures>({
  dietService: injectDietService,
});

test.describe("03 - Diets test cases", () => {
  test("test", async ({ dietService }) => {
    const test = await dietService.get();
    console.log(test);
  });
});
