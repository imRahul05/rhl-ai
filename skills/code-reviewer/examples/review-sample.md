# Sample Code Review Output

### Example Finding 1: Unsafe Type Assertion

- **File**: `packages/scaffold/src/copier.ts:42`
- **Severity**: Blocking (Must Fix)
- **Problem**: Variable `data` is cast as `any` before accessing properties, bypassing compile-time safety and risking unhandled runtime exceptions if the JSON structure changes.
- **Suggested Fix**:

```typescript
// Before:
const config = JSON.parse(raw) as any;
const name = config.name;

// After:
interface ConfigData {
  readonly name: string;
}
const config = JSON.parse(raw) as ConfigData;
const name = config.name;
```

---

### Example Finding 2: Unhandled Promise Rejection

- **File**: `packages/utils/src/fs.ts:18`
- **Severity**: Blocking (Must Fix)
- **Problem**: `fs.access` promise failure triggers an untyped rejection that bubbles up without a clear user-facing error message.
- **Suggested Fix**: Catch the error specifically and return a boolean flag `false` for non-existent paths.
