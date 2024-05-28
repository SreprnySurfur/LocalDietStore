import { test as base, chromium, expect } from "@playwright/test";
import type { MyFixtures } from "../my-fixtures";
import { injectUsersService } from "../services/Users";
import { GetUsers } from "../models/Users";

const test = base.extend<MyFixtures>({
  userService: injectUsersService,
});

test.describe("01 - Users test cases", () => {
  let request: GetUsers;

  test.beforeEach(async ({ userService }) => {
    const getUsers = await userService.get();

    request = getUsers;
  });

  test("Check users length", async ({}) => {
    expect(request).toHaveLength(5);
  });

  test("Check duplicate message", async ({}) => {
    expect(request[3]._debug).toEqual("duplicate ID");
  });
});
