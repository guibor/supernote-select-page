# Supernote Select All — Engineering Playbook

> Single source of truth for how this project is built.

## Architecture

- Main components: `index.js` registers a headless NOTE toolbar button and
  performs selection; `App.tsx` is a fallback explanatory screen.
- Runtime(s): Supernote PluginHost, React Native 0.79.2, Android.
- External dependencies: `sn-plugin-lib@0.1.34`.

## Repository map

- Primary app or package: root React Native Supernote plugin project.
- Supporting tools: `buildPlugin.sh` creates `.snplg` packages; `npx tsc
  --noEmit` performs TypeScript checks.
- Generated artifacts to avoid editing directly: `build/`, `node_modules/`,
  Android Gradle outputs, Metro bundles.

## Conventions

- Preferred languages and frameworks: TypeScript/JavaScript on React Native;
  Supernote SDK calls through `sn-plugin-lib`.
- Testing approach: run `npm run typecheck` and `npm run build:plugin`; final
  behavior requires physical Supernote testing.
- Deployment or release path: build `build/outputs/supernote_select_all.snplg`
  and upload it to `MyStyle/` on the Supernote.
- Rules for agents: keep the plugin headless for the main action; do not add
  file mutations unless the playbook scope changes.

## Open technical questions

- Whether `PluginCommAPI.lassoElements` behaves consistently across Manta,
  Nomad, and older X-series devices for a full-page rectangle.
