# Code Review Checklist

Use this checklist during step 2 of the code review workflow:

### 1. TypeScript & Type Safety

- [ ] No explicit or implicit `any` types present.
- [ ] Generics use proper type constraints (`<T extends Record<string, unknown>>`).
- [ ] Discriminated unions are used for variant states instead of optional bags of fields.
- [ ] Optional parameters handled with proper default values or nullish coalescing.

### 2. Logic & Error Handling

- [ ] Asynchronous calls wrapped in try/catch or typed Result patterns.
- [ ] Errors logged with helpful context rather than swallowed silently.
- [ ] Edge cases (empty strings, empty lists, negative numbers) tested and handled.

### 3. Architecture & Modularization

- [ ] Package exports match intended public API.
- [ ] Circular dependencies avoided.
- [ ] Business logic decoupled from transport/presentation layers.

### 4. Security & Compliance

- [ ] SQL/NoSQL queries use parameterized statements.
- [ ] No tokens, credentials, or secrets committed in code.
- [ ] User permissions checked before executing sensitive operations.
