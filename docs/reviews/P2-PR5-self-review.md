# P2 PR 5 Self Review
# Does this change affect any behaviors?
- No, this change does not affect any authentication behavior. The signin and auth cookie still work.

---
# Does this affect app rendering?
- No, this change is limited to backend cookie exiration logic. No frontend changes were made.

--- 
# Does this PR stay within scope?
- Yes, this PR stays with the scope. It only replaces hard coded numbers in the signin cookie expiration logic.

---
# Decision
- Approved

---
# Approval Reason
- This PR is safe to merge because it improves readability and maintainability without having to change the logic.
- Manual verification confirmed that the logic still works and the auth cookie is still created.
