# Reddit Announcement Draft

Subreddit: `r/Supernote_dev`

Title:

```text
Select All: a one-tap full-page lasso plugin for Supernote notes
```

Body:

```markdown
Hi everyone,

I made a small Supernote plugin called **Select All**:

https://github.com/guibor/supernote-select-all

It does one thing: adds a **Select All** button to the NOTE toolbar. Tap it, and it creates a normal Supernote lasso selection around the entire current note page.

Why I built it:

- Selecting a full page by hand is slow and imprecise.
- A lot of follow-up actions become easier once the whole page is selected.
- The newer `sn-plugin-lib` now has `PluginCommAPI.lassoElements(rect)`, which makes this much cleaner than the older workaround of resizing an existing lasso box.

What it does:

- NOTE toolbar button only.
- Selects all elements on the current page with one tap.
- Uses the current page size to build a full-page lasso rectangle.
- Leaves the note contents unchanged.

What it does *not* do:

- It does not delete, move, export, or rewrite anything.
- It does not select across multiple pages.
- It does not currently support DOC files.

The implementation is intentionally small so other plugin developers can inspect it or adapt the pattern. The core flow is:

1. `PluginCommAPI.getCurrentFilePath()`
2. `PluginCommAPI.getCurrentPageNum()`
3. `PluginFileAPI.getPageSize(filePath, page)`
4. `PluginCommAPI.lassoElements({ left: 0, top: 0, right: width, bottom: height })`

I have it working on my device. If anyone tests it on other devices or firmware versions, I would be interested to hear whether edge-touching elements are consistently included in the full-page lasso.
```
