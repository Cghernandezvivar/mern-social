# PR 1 Self Review
## What changed and why?
- Added unit tests for the Signin component.
- Verified that the component render correctly.
- Verified that the component handles successful logins. 
- Verified that the component displays errors when logins fail.

This will cover Signin unit test to help prevent regression in the authentication. This also validated the interaction with the mocked API. 

---

## Why is this the right test layer (unit/integration/UI)?
- These are unit tests because the signin component is being tested in isolation.
- API calls are mocked, so that the tests do not depend on the backend or external factors.
- The tests focus on rendering, component logic.

---

## What could still break / what’s not covered?
- The actual backend behavior is not tested since APIs are mocked.
- Unexpected API responses are not covered.
- Edge cases for emails and passwords are not all covered.

---

## What risks or follow-ups remain?
- If the API changes the mocks can become outdated.
- Additional tests could be added such as password visibility.
