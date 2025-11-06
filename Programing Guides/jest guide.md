# Jest Guide: Comprehensive Learning Outline

This guide provides a structured overview of Jest, a delightful JavaScript Testing Framework with a focus on simplicity. It covers core concepts, common matchers, setup and teardown, mocking, asynchronous testing, advanced features like snapshot testing, and best practices for writing effective tests.

---

## I. Getting Started and Core Concepts

### A. What is Jest?

Jest is a JavaScript testing framework developed by Meta (Facebook) with a focus on simplicity. It works with projects using Babel, TypeScript, Node, React, Angular, Vue, and more. Jest is an all-in-one testing solution, providing a test runner, assertion library, and mocking capabilities.

*   **All-in-one:** Includes a test runner, assertion library, and mocking framework.
*   **Zero Configuration:** Often works out of the box for many projects.
*   **Fast:** Designed for speed, especially with parallel test execution.
*   **Snapshot Testing:** Unique feature for testing UI components.

### B. Why Use Jest?

*   **Simplicity:** Easy to set up and use, with a clear and intuitive API.
*   **Performance:** Runs tests in parallel, making it fast for large codebases.
*   **Rich Features:** Built-in mocking, code coverage, and snapshot testing.
*   **Great Developer Experience:** Excellent error messages, interactive watch mode.
*   **Wide Adoption:** Popular in the React ecosystem and beyond.

### C. Installation and Setup

1.  **Initialize Project:**

    ```bash
    mkdir my-jest-project
    cd my-jest-project
    npm init -y # or yarn init -y
    ```

2.  **Install Jest:**

    ```bash
    npm install --save-dev jest # or yarn add --dev jest
    ```

3.  **Configure `package.json`:** Add a test script.

    ```json
    // package.json
    {
      "name": "my-jest-project",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "jest"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "jest": "^29.0.0"
      }
    }
    ```

### D. Basic Test Structure (`describe`, `test`/`it`, `expect`)

*   **`describe(name, fn)`:** Groups related tests together.
*   **`test(name, fn)` (or `it(name, fn)`):** Defines an individual test case.
*   **`expect(value)`:** Creates an assertion. It's used with "matchers" to test values.

    ```javascript
    // sum.js
    function sum(a, b) {
      return a + b;
    }
    module.exports = sum;

    // sum.test.js
    const sum = require('./sum');

    describe('sum function', () => {
      test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
      });

      it('adds positive numbers correctly', () => {
        expect(sum(5, 7)).toBe(12);
      });

      it('adds negative numbers correctly', () => {
        expect(sum(-1, -5)).toBe(-6);
      });
    });
    ```

### E. Running Tests (`jest` CLI)

```bash
npm test # or yarn test
# Or directly:
npx jest
```

---

## II. Matchers

Matchers are functions that let you test values in different ways.

### A. Common Matchers (`toBe`, `toEqual`, `not`)

*   **`toBe(value)`:** Checks for exact equality (uses `===`).
*   **`toEqual(value)`:** Checks for deep equality of objects or arrays.
*   **`not`:** Negates the next matcher.

    ```javascript
    test('object assignment', () => {
      const data = { one: 1 };
      data['two'] = 2;
      expect(data).toEqual({ one: 1, two: 2 }); // Deep equality
    });

    test('adding positive numbers is not zero', () => {
      for (let a = 1; a < 10; a++) {
        for (let b = 1; b < 10; b++) {
          expect(a + b).not.toBe(0);
        }
      }
    });
    ```

### B. Truthiness (`toBeNull`, `toBeUndefined`, `toBeDefined`, `toBeTruthy`, `toBeFalsy`)

*   **`toBeNull()`:** Matches only `null`.
*   **`toBeUndefined()`:** Matches only `undefined`.
*   **`toBeDefined()`:** Matches anything that is not `undefined`.
*   **`toBeTruthy()`:** Matches anything that `if` statement treats as true.
*   **`toBeFalsy()`:** Matches anything that `if` statement treats as false.

    ```javascript
    test('null', () => {
      const n = null;
      expect(n).toBeNull();
      expect(n).toBeFalsy();
      expect(n).not.toBeUndefined();
      expect(n).toBeDefined();
    });
    ```

### C. Numbers (`toBeGreaterThan`, `toBeLessThan`, `toBeGreaterThanOrEqual`, `toBeLessThanOrEqual`, `toBeCloseTo`)

*   **`toBeCloseTo(number, precision)`:** For floating-point numbers to avoid precision issues.

    ```javascript
    test('two plus two', () => {
      expect(2 + 2).toBeGreaterThan(3);
      expect(2 + 2).toBeLessThan(5);
      expect(0.1 + 0.2).toBeCloseTo(0.3);
    });
    ```

### D. Strings (`toMatch`)

*   **`toMatch(regexp)`:** Checks if a string matches a regular expression.

    ```javascript
    test('there is no I in team', () => {
      expect('team').not.toMatch(/I/);
    });
    ```

### E. Arrays and Iterables (`toContain`, `toHaveLength`)

*   **`toContain(item)`:** Checks if an array or iterable contains a specific item.
*   **`toHaveLength(number)`:** Checks the length of an array or string.

    ```javascript
    const shoppingList = [
      'diapers',
      'kleenex',
      'trash bags',
      'paper towels',
      'milk',
    ];

    test('the shopping list has milk on it', () => {
      expect(shoppingList).toContain('milk');
      expect(shoppingList).toHaveLength(5);
    });
    ```

### F. Objects (`toHaveProperty`)

*   **`toHaveProperty(keyPath, value)`:** Checks if an object has a property at a given key path.

    ```javascript
    test('object has a name property', () => {
      const user = { name: 'Alice', age: 30 };
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('age', 30);
    });
    ```

### G. Exceptions (`toThrow`)

*   **`toThrow(error)`:** Checks if a function throws an error.

    ```javascript
    function compileAndroidCode() {
      throw new Error('you are using the wrong JDK');
    }

    test('compiling android goes as expected', () => {
      expect(() => compileAndroidCode()).toThrow();
      expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
      expect(() => compileAndroidCode()).toThrow(/JDK/); // Regex
    });
    ```

---

## III. Setup and Teardown

Jest provides hooks to run code before and after tests.

### A. `beforeEach`, `afterEach`

Run before/after each test in a `describe` block.

```javascript
let cityDatabase = [];

function initializeCityDatabase() {
  cityDatabase.push('Vienna', 'San Juan');
}

function clearCityDatabase() {
  cityDatabase = [];
}

beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(cityDatabase).toContain('Vienna');
});

test('city database has San Juan', () => {
  expect(cityDatabase).toContain('San Juan');
});
```

### B. `beforeAll`, `afterAll`

Run once before/after all tests in a `describe` block.

```javascript
beforeAll(() => {
  // Connect to database once
});

afterAll(() => {
  // Disconnect from database once
});
```

### C. Scoping `describe` Blocks

`beforeEach`, `afterEach`, `beforeAll`, `afterAll` apply to the `describe` block they are in and its child `describe` blocks.

---

## IV. Mocking

Jest's mocking capabilities allow you to replace parts of your code with mock implementations.

### A. Mock Functions (`jest.fn()`)

Create a mock function to track calls, arguments, and return values.

```javascript
test('mock function is called', () => {
  const mockCallback = jest.fn(x => 42 + x); // Mock function with implementation
  mockCallback(0);
  mockCallback(1);

  expect(mockCallback.mock.calls.length).toBe(2); // Called twice
  expect(mockCallback.mock.calls[0][0]).toBe(0); // First call, first arg
  expect(mockCallback.mock.results[1].value).toBe(43); // Second call, return value
});
```

### B. Mocking Modules (`jest.mock()`)

Replace entire modules with mock implementations.

```javascript
// api.js
export function fetchData() {
  return Promise.resolve({ data: 'real data' });
}

// api.test.js
import { fetchData } from './api';
jest.mock('./api'); // Mock the entire module

test('fetchData returns mock data', async () => {
  fetchData.mockResolvedValueOnce({ data: 'mocked data' }); // Mock implementation
  const data = await fetchData();
  expect(data).toEqual({ data: 'mocked data' });
});
```

### C. Mocking ES6 Classes

```javascript
// SoundPlayer.js
class SoundPlayer {
  constructor() {
    this.foo = 'bar';
  }

  playSoundFile(fileName) {
    console.log('Playing sound: ' + fileName);
  }
}
export default SoundPlayer;

// SoundPlayer.test.js
import SoundPlayer from './SoundPlayer';
jest.mock('./SoundPlayer'); // Mock the class

test('We can check if the consumer called the class constructor', () => {
  const soundPlayer = new SoundPlayer();
  expect(SoundPlayer).toHaveBeenCalledTimes(1);
});
```

### D. Mocking Timers (`jest.useFakeTimers()`)

Control `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval` in tests.

```javascript
jest.useFakeTimers();

test('calls the callback after 1 second', () => {
  const callback = jest.fn();
  setTimeout(callback, 1000);

  expect(callback).not.toHaveBeenCalled();
  jest.advanceTimersByTime(1000); // Advance timers by 1 second
  expect(callback).toHaveBeenCalledTimes(1);
});
```

---

## V. Asynchronous Testing

Jest supports various ways to test asynchronous code.

### A. Callbacks (`done()`)

For traditional callback-based asynchronous code.

```javascript
function fetchData(callback) {
  setTimeout(() => callback('peanut butter'), 1000);
}

test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done(); // Call done() when async operation completes
    } catch (error) {
      done(error); // Pass error to done() if assertion fails
    }
  }
  fetchData(callback);
});
```

### B. Promises (`.resolves`, `.rejects`)

For Promise-based asynchronous code.

```javascript
function fetchDataPromise() {
  return Promise.resolve('peanut butter');
}

test('the data is peanut butter', () => {
  return expect(fetchDataPromise()).resolves.toBe('peanut butter');
});

function fetchErrorPromise() {
  return Promise.reject('error');
}

test('the fetch fails with an error', () => {
  return expect(fetchErrorPromise()).rejects.toMatch('error');
});
```

### C. Async/Await

For `async`/`await` based asynchronous code.

```javascript
async function fetchDataAsync() {
  return 'peanut butter';
}

test('the data is peanut butter', async () => {
  const data = await fetchDataAsync();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  await expect(fetchErrorPromise()).rejects.toMatch('error');
});
```

---

## VI. Advanced Features

### A. Snapshot Testing (`toMatchSnapshot()`)

Records the output of a component or data structure and compares it to a previously saved snapshot. Useful for UI components.

```javascript
// Link.react.js
import React from 'react';

const Link = ({ children, page }) => (
  <a href={page}>
    {children}
  </a>
);

export default Link;

// Link.react.test.js
import renderer from 'react-test-renderer';
import Link from '../Link.react';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot(); // Creates/updates a snapshot file
});
```

### B. Code Coverage (`--coverage`)

Measures how much of your code is covered by tests.

```bash
npx jest --coverage
```

### C. Watch Mode (`--watch`, `--watchAll`)

Runs tests in an interactive watch mode, re-running only relevant tests when files change.

```bash
npx jest --watch # Watches for changes and runs affected tests
npx jest --watchAll # Watches for changes and runs all tests
```

### D. Filtering Tests (`.only`, `.skip`, `test.only`, `test.skip`)

*   **`.only`:** Runs only specific tests or `describe` blocks.
*   **`.skip`:** Skips specific tests or `describe` blocks.

    ```javascript
describe.only('focused group', () => { /* ... */ });
    test.skip('skipped test', () => { /* ... */ });
    ```

### E. Custom Matchers

You can extend Jest with your own custom matchers.

---

## VII. Best Practices and Tools

### A. Clear Test Names

Write descriptive test names that explain what the test is doing.

### B. Arrange-Act-Assert Pattern

Organize your tests into three distinct sections:
*   **Arrange:** Set up the test data and environment.
*   **Act:** Perform the action being tested.
*   **Assert:** Verify the outcome.

### C. Test Organization

*   Place test files in a `__tests__` directory or next to the code they are testing (e.g., `component.test.js`).
*   Group related tests with `describe`.

### D. Integration with CI/CD

Integrate Jest into your Continuous Integration/Continuous Deployment pipelines to ensure code quality.
