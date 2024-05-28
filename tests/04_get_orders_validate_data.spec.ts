import { test as base, expect } from "@playwright/test";
import type { MyFixtures } from "../my-fixtures";
import { injectOrdersService } from "../services/Orders";
import { GetOrders } from "../models/Orders";

const test = base.extend<MyFixtures>({
  ordersService: injectOrdersService,
});

test.describe("04 - Orders test cases", () => {
  let request: GetOrders;

  test.describe("User 1 test cases", () => {
    test.beforeEach(async ({ ordersService }) => {
      const getUsers = await ordersService.get({ userId: "1" });

      request = getUsers;
    });

    test("Check Orders length", async ({}) => {
      expect(request).toHaveLength(7);
    });

    test("Check if id is number", async ({}) => {
      const invalidIds: string[] = [];

      for (const order of request) {
        if (isNaN(Number(order.id))) {
          invalidIds.push(order.id);
        }
      }
      if (invalidIds.length > 0) {
        throw new Error(`Invalid order IDs: ${invalidIds.join(", ")}`);
      }
    });

    test("Check debug info, order with date before", async ({}) => {
      if (request[2]._debug === "-1 days diet?") {
        throw new Error(`Test failed because ${request[2]._debug}'`);
      }
    });

    test("Check debug info, order with duplicate id", async ({}) => {
      if (request[4]._debug === "duplicate id, data as in order 1") {
        throw new Error(`Test failed because ${request[4]._debug}'`);
      }
    });

    test("Check debug info, order duplicate date", async ({}) => {
      if (request[3]._debug === "ok, same dates as order 1") {
        throw new Error(`Test failed because ${request[3]._debug}'`);
      }
    });
  });

  test.describe("User 2 test cases", () => {
    test.beforeEach(async ({ ordersService }) => {
      const getUsers = await ordersService.get({ userId: "2" });

      request = getUsers;
    });

    test("Check Orders length", async ({}) => {
      expect(request).toHaveLength(3);
    });

    test("Check debug info, order starting after 30 days", async ({}) => {
      if (request[1]._debug === "starting after 30 days from order date") {
        throw new Error(`Test failed because ${request[1]._debug}'`);
      }
    });

    test("Check debug info, order over 30 days", async ({}) => {
      if (request[2]._debug === "order for more that 30 days") {
        throw new Error(`Test failed because ${request[2]._debug}'`);
      }
    });
  });

  test.describe("User 3 test cases", () => {
    test.beforeEach(async ({ ordersService }) => {
      const getUsers = await ordersService.get({ userId: "3" });

      request = getUsers;
    });

    test("Check Orders length", async ({}) => {
      expect(request).toHaveLength(8);
    });

    test("Check debug info, order non existing diet", async ({}) => {
      if (request[0]._debug === "non-existing diet") {
        throw new Error(`Test failed because ${request[2]._debug}'`);
      }
    });

    test("Check debug info, order date non exist", async ({}) => {
      if (request[2]._debug === "end date does not exists") {
        throw new Error(`Test failed because ${request[2]._debug}'`);
      }
    });

    test("Check debug info, order same day", async ({}) => {
      if (request[5]._debug === "immediate order? nah! not possible") {
        throw new Error(`Test failed because ${request[5]._debug}'`);
      }
    });

    test("Check debug info, order duplicate diet", async ({}) => {
      if (request[7]._debug === "nok! same diet ordered second time") {
        throw new Error(`Test failed because ${request[7]._debug}'`);
      }
    });
  });
});
