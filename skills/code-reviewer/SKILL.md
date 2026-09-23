---
name: code-reviewer
description: Expert AI code reviewer for strict TypeScript, architecture, and performance.
version: 1.0.0
author: RHL AI
tags:
  - code-review
  - typescript
  - architecture
  - security
---

# Code Reviewer Skill

## Overview

This skill guides agents through rigorous, multi-dimensional code reviews across TypeScript and modern web applications. The goal is to surface actionable, high-confidence feedback that catches subtle bugs, security vulnerabilities, performance degradation, and architectural violations before code reaches production.

## Decision Framework

When reviewing code, categorize feedback into three strict severity tiers:

1. **Blocking (Must Fix)**:
   - Type unsafety: use of `any`, unsafe casts, unhandled `null`/`undefined`.
   - Security issues: injection vulnerabilities, exposed secrets, unvalidated user input.
   - Correctness bugs: race conditions, unhandled promise rejections, memory leaks.
   - Breaking API changes without backward compatibility or deprecation notices.

2. **Non-Blocking (Should Fix)**:
   - Performance optimizations: unnecessary re-renders, redundant allocations, N+1 patterns.
   - Architectural cohesion: violation of layer boundaries, missing unit tests.
   - Code readability: overly complex expressions, cryptic naming.

3. **Nitpick (Optional)**:
   - Purely stylistic suggestions (prefer relying on automated linter/prettier rules).

## Workflows

### 1. Context Orientation

- Review the pull request description, changed files, and associated issue tickets.
- Understand the intent: is this a bug fix, performance patch, or new feature?

### 2. Systematic Code Inspection

Evaluate the diff against five core dimensions:

- **Correctness & Edge Cases**: What happens on network failure? Empty arrays? Concurrent calls?
- **Type Safety**: Are interfaces well-defined? Are discriminating unions leveraged? Is `any` absent?
- **Architecture & Boundaries**: Does this change violate package or module responsibilities?
- **Security & Privacy**: Are inputs sanitized? Are permissions enforced?
- **Performance & Scalability**: What is the asymptotic complexity of new loops or queries?

### 3. Synthesizing Feedback

Format each review comment with:

- **File & Line**: Exact location.
- **Observation**: What is problematic and why.
- **Suggested Solution**: Concrete replacement code snippet.
- **Severity**: Blocking, Non-Blocking, or Nitpick.

## Constraints

- Never approve code containing implicit or explicit `any` types.
- Never suggest subjective stylistic rewrites when existing code matches established project conventions.
- Never approve modifications to authentication or database layers without automated test coverage.

## References

- See [Checklist](file:///references/checklist.md) for the complete pre-merge review checklist.
- See [Sample Review](file:///examples/review-sample.md) for reference review outputs.
