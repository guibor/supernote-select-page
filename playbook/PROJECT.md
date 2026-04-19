# Supernote Select Page — Project Playbook

> Single source of truth for what this project should do and for whom.

## Purpose

- Problem this project solves: Supernote has lasso actions for selected
  content, but selecting every element on a page by hand is slow and
  error-prone.
- Who it serves: Supernote users who frequently copy, move, convert, or export
  all content on a single note page.
- Desired outcome: one toolbar tap creates a normal lasso selection covering
  every element on the current page.

## Scope

- In scope: NOTE-page selection using `PluginCommAPI.lassoElements`; clean
  installable `.snplg` package; public-friendly README and playbook.
- Out of scope: DOC support, cross-page selection, element deletion, export,
  sync, or any mutation of note contents.
- Success criteria: tapping `Select Page` on a NOTE page creates a visible
  lasso selection around existing page elements without requiring a starter
  lasso.

## Milestones

- Near term: validate on-device with the current Supernote preview build.
- Next: decide whether DOC support is possible or should stay explicitly out of
  scope.
- Later: add a release artifact and short demo instructions after device
  validation.

## Open questions

- Does `lassoElements` select elements whose bounds touch the exact page edge,
  or does it require a small inset/outset rectangle on some devices?
