import { test as base, expect } from "@playwright/test";
import type { MyFixtures } from "../my-fixtures";
import { injectDietService } from "../services/Diets";
import { GetDiets } from "../models/Diets";

const test = base.extend<MyFixtures>({
  dietService: injectDietService,
});

test.describe("03 - Diets test cases", () => {
  test("Check users length", async ({ dietService }) => {
    const getDiets = await dietService.get();
    expect(getDiets).toHaveLength(8);
  });
});
