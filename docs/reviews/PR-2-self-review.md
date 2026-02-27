# PR 2 Self Review
## What changed and why?
- Added unit tests for the Signup creation component.
- Covers many edge cases
  - Duplicate emails
  - Invalid email format
  - Missing fields
  - Short passwords

This will cover the users input is vaild and that the API responses correctly. This will help with regression in the Signup component.

---

## Why is this the right test layer (unit/integration/UI)?
- These are unit tests because the Signup component is being tested in isolation.
- API calls are mocked, so that the tests do not depend on the backend or external factors.
- The tests simulate user actions such as typing and clicking buttons.

---

## What could still break / what’s not covered?
- The actual backend behavior is not tested since APIs are mocked.
- Unexpected API responses are not covered.
- Not all the edge cases are covered some on the edge cases are special characters in passwords and lower cases and upper cases letters being used.

---

## What risks or follow-ups remain?
- If the API changes the mocks can become outdated.
- If the button labels or text are changed test will require to be updated.
- Additional edge cases and integration tests could be added.

