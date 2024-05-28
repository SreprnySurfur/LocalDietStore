import { test as base, expect } from "@playwright/test";
import type { MyFixtures } from "../my-fixtures";
import { injectCateringService } from "../services/Caterings";

const test = base.extend<MyFixtures>({
  cateringService: injectCateringService,
});

test.describe("02 - Caterings test cases", () => {
  test("test", async ({ cateringService }) => {
    const test = await cateringService.get();
    console.log(test);
  });
});
