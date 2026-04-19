# 2026-04-20 Initial Implementation

## Decision

Use the new `PluginCommAPI.lassoElements(rect)` API instead of the older
experiment that tried to resize an already-active lasso rectangle.

## Rationale

`lassoElements` directly creates a lasso selection from a pixel-coordinate
rectangle. That matches the product goal: select everything on the current page
without requiring the user to draw a starter lasso first.

## Implementation

- Register one NOTE toolbar button named `Select All`.
- Read the current file path with `PluginCommAPI.getCurrentFilePath()`.
- Read the current page with `PluginCommAPI.getCurrentPageNum()`.
- Read page dimensions with `PluginFileAPI.getPageSize(filePath, page)`.
- Call `PluginCommAPI.lassoElements({left: 0, top: 0, right: width, bottom: height})`.
- Call `PluginCommAPI.setLassoBoxState(0)` after selection as a best-effort
  visibility nudge.

## Validation Needed

Physical-device testing is still required to confirm full-page boundary
behavior and whether edge-touching elements are included on all devices.
