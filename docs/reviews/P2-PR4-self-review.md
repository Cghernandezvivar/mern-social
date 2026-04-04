# P2 PR 4 Self Review
# Does this change affect any behaviors?
- No, intended behavior was changed but the post creation still works and also being able to upload photos.

---
# Does this affect app rendering?
- No, this change is in the backend controller and does not affect the rendering.

---
# Does this PR stay within scope?
- Yes, all changes are within the scope.
- This is replacing blocking file I/O during post creation.
---
# Decision
- Approved

--- 
# Approval Reason
-  This PR is safe to merge becaues it improves backend performance without changing user behavior. Posting and uploading a photo still works.
