# DietStoreReadMe

This is repository which contains End-To-End tests written using [Playwright](https://playwright.dev/docs/intro) and TypeScript.

## How to run

### 1. Prepare your machine to run tests

### Installation

If you do not have node/yarn installed, the best is to install both using `brew`:

```bash
brew install node@18
```

```bash
brew install yarn
```

Use the package manager [yarn](https://yarnpkg.com/) and run the following command:

### Install yarn packages

```bash
yarn install
```

### Install playwright browsers

```bash
npx playwright install
```

### 2. Run tests

Open Playwright console an run

- To run all test at once using Webkit, Firefox, Chromium

  ```bash
  npx playwright test
  ```

- To open UI tool that will open Chromium

  ```bash
  npx playwright test --ui
  ```

  In this mode you can select which tests you want to run

  To open playwright HTML report from last tests run

  ```bash
  npx playwright show-report
  ```
### 3. After task thoughts

- Data should not be created if data is duplicated example:

```json
    {
        "id": "3",
        "name": "Grima",
        "email": "grima@dev.dietly.pl",
        "_debug": "duplicate ID"
    },
```
- Ids would be better if be as UUIDs
- Should be validation for 
  - Emails in users so email won't be used twice
  - Offers for not creating offer id DietId is non valid
  - Orders:
    - Creating order if DietId is non valid
    - from_date and to_date should fail if date is not possible
    ```json
    "to_date": "2022-06-31",
    ```
    - from_date should be day after datetime
    - datetime could have more specific name like "orderTime" "createdOrderTime" "createTime"
    - Consistent debug info about 7 days remaining 
    ```json
        {
        "id": "1",
        "datetime": "2022-03-12 12:43:37.000",
        "from_date": "2022-03-14",
        "to_date": "2022-03-20",
        "dietId": 1,
        "userId": 1,
        "_debug": "ok, 7 days diet"
    },
    {
        "id": "2",
        "datetime": "2022-03-15 10:12:23.123",
        "from_date": "2022-03-21",
        "to_date": "2022-03-27",
        "dietId": 1,
        "userId": 1,
        "_debug": "ok, another 7 days diet"
    },
    ```
    - Validation for datetime > to_date > from_date
    - from_date >=1 <= 30 from_date
    - Orders for more that 30 days
    all above should be not possible 
- Typos in _debug "_debug": "end date befre start date?"
    - Consistent debug info about start date;
    ```json
        {
        "id": "3",
        "datetime": "2022-03-15 03:45:23.123",
        "from_date": "2022-04-07",
        "to_date": "2022-04-06",
        "dietId": 1,
        "userId": 1,
        "_debug": "-1 days diet?"
    },
        {
        "id": "5",
        "datetime": "2022-03-03 11:13:24.000",
        "from_date": "2022-04-02",
        "to_date": "2022-03-03",
        "dietId": 2,
        "userId": 2,
        "_debug": "end date befre start date?"
    },
    ```