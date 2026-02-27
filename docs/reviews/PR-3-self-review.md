# PR 3 Self Review
## What changed and why?
- Added frontend unit tests for the Post creation component.
- Verified that the Like API is called correctly when button is clicked.
- Verified that the Remove API and parent callback are called when deleting a post.
- Verified that only the owner of the post can see the delete button.

This will cover frontend test and this will help prevent regression in one of the core functionalities which is the posting function that has features such as liking/unliking, deleting post.

---

## Why is this the right test layer (unit/integration/UI)?
- These are unit tests because the post component is being tested in isolation.
- API calls are mocked, so that the tests do not depend on the backend or external factors.
- The tests focus on rendering, component logic, and conditional cases.

---

## What could still break / what’s not covered?
- The actual backend behavior is not tested since APIs are mocked.
- Unexpected API responses are not covered.
- The UI layout and styling are not covered.

---

## What risks or follow-ups remain?
- If the API changes the mocks can become outdated.
- Additional edge cases and integration tests could be added.
