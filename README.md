# Supernote Select All

Select All is a small Supernote plugin that selects every element on the
current NOTE page with one toolbar button.

It uses the current `sn-plugin-lib` `PluginCommAPI.lassoElements(rect)` API, so
it does not require the user to draw a starter lasso first.

## What It Does

- Adds a `Select All` button to the NOTE toolbar.
- Reads the current file path, page number, and page size.
- Builds a full-page rectangle in pixel coordinates.
- Calls `PluginCommAPI.lassoElements(rect)` to create a normal Supernote lasso
  selection around page content.
- Leaves the note file unchanged.

## What It Does Not Do

- It does not delete, move, export, or rewrite elements.
- It does not select content across pages.
- It does not support DOC files yet.

## Build

```sh
npm install
npm run typecheck
npm run build:plugin
```

The package is written to:

```text
build/outputs/supernote_select_all.snplg
```

Copy the `.snplg` file to `MyStyle/` on the Supernote, then install it from
Settings -> Apps -> Plugins.

## Implementation Notes

The core path is in `index.js`:

```js
const rect = {
  left: 0,
  top: 0,
  right: pageSize.width,
  bottom: pageSize.height,
};

await PluginCommAPI.lassoElements(rect);
```

Supernote SDK details are tracked in `playbook/ENGINEERING.md`.
