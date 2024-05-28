import { test as base, expect } from "@playwright/test";
import type { MyFixtures } from "../my-fixtures";
import { injectCateringService } from "../services/Caterings";

const test = base.extend<MyFixtures>({
  cateringService: injectCateringService,
});

test.describe("02 - Caterings test cases", () => {
  test("Check users length", async ({ cateringService }) => {
    const getCaterings = await cateringService.get();
    expect(getCaterings).toHaveLength(3);
  });
});
