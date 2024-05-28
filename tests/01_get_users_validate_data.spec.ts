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
    if (request[3]._debug === "duplicate ID") {
      throw new Error(`Test failed because ${request[3]._debug}'`);
    }
  });

  test("Check position", async ({}) => {
    const bilbo = {
      id: "2",
      name: "Bilbo Baggins",
      email: "frodo.baggins@dev.dietly.pl",
    };
    expect(request[1]).toStrictEqual(bilbo);
  });
});
