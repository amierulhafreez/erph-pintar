# Security Specification (`security_spec.md`)

## 1. Authentication & Roles
- **Authentication Method**: Google Sign-In via Firebase Authentication (`signInWithPopup`).
- **Roles**:
  - `teacher`: Default role for all signed-in users. Must redeem a valid, unused individual access code (`access_codes/{codeId}`) to unlock full app functionality (`accessStatus == 'active'`).
  - `admin`: Bootstrapped to owner `AmierulHafreez@gmail.com` (`amierulhafreez@gmail.com`) or users with `role == 'admin'` in `/users/{uid}`. Has automatic full access, can create/revoke/delete `access_codes`, and can read/manage all `/users`, `/rphs`, and `/usage_logs`.

## 2. Collection Access Matrix
- `/users/{userId}`:
  - `get`, `list`: Allowed if `isOwner(userId)` or `isAdmin()`.
  - `create`: Allowed if `isOwner(userId)`, valid `UserProfile` schema, and (`role == 'teacher'` or `isAdmin()`).
  - `update`: Allowed if (`isOwner(userId)` or `isAdmin()`), valid `UserProfile` schema, `uid` and `createdAt` are immutable, `role` is unchanged unless `isAdmin()`, and if a non-admin user sets `accessStatus == 'active'`, they cannot un-revoke a `'revoked'` status without an admin or a newly redeemed valid access code.
  - `delete`: Allowed if `isAdmin()`.
- `/access_codes/{codeId}`:
  - `get`: Allowed for any authenticated user (so a signed-in user can look up the specific code they typed to redeem it) or `isAdmin()`.
  - `list`: Allowed ONLY if `isAdmin()` (prevents non-admin users from listing or scraping available access codes!).
  - `create`, `delete`: Allowed ONLY if `isAdmin()`.
  - `update`: Allowed if `isAdmin()`, OR if an authenticated user is redeeming an `'unused'` code (`resource.data.status == 'unused'`, `request.resource.data.status == 'active'`, `request.resource.data.redeemedByUid == request.auth.uid`, and immutable `code`, `note`, `createdAt`).
- `/rphs/{rphId}`:
  - `get`, `list`: Allowed if `resource.data.ownerId == request.auth.uid` or `isAdmin()`.
  - `create`, `update`, `delete`: Allowed if `ownerId == request.auth.uid` or `isAdmin()`.
- `/usage_logs/{logId}`:
  - `get`, `list`: Allowed if `resource.data.uid == request.auth.uid` or `isAdmin()`.
  - `create`: Allowed if authenticated, `request.resource.data.uid == request.auth.uid`, and valid `UsageLog` schema.
  - `update`, `delete`: Allowed only if `isAdmin()`.
