/**
 * @format
 */

import {AppRegistry, Image} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {
  NativeUIUtils,
  PluginCommAPI,
  PluginFileAPI,
  PluginManager,
} from 'sn-plugin-lib';

AppRegistry.registerComponent(appName, () => App);

PluginManager.init();

const SELECT_PAGE_BUTTON_ID = 100;
const ICON_URI = Image.resolveAssetSource(require('./assets/icon.png')).uri;

let isSelecting = false;

PluginManager.registerButton(1, ['NOTE'], {
  id: SELECT_PAGE_BUTTON_ID,
  name: 'Select Page',
  icon: ICON_URI,
  showType: 0,
});

PluginManager.registerButtonListener({
  onButtonPress: event => {
    if (event.id !== SELECT_PAGE_BUTTON_ID) {
      return;
    }

    selectCurrentPage().catch(error => {
      console.error('[select-page] unexpected selection failure', error);
    });
  },
});

async function selectCurrentPage() {
  if (isSelecting) {
    return;
  }

  isSelecting = true;
  try {
    if (typeof PluginCommAPI.lassoElements !== 'function') {
      throw new Error(
        'This plugin requires sn-plugin-lib with PluginCommAPI.lassoElements.',
      );
    }

    const [filePathRes, pageRes] = await Promise.all([
      PluginCommAPI.getCurrentFilePath(),
      PluginCommAPI.getCurrentPageNum(),
    ]);

    if (!filePathRes?.success || !filePathRes.result) {
      throw new Error(
        filePathRes?.error?.message ?? 'Unable to read current note path.',
      );
    }

    if (!pageRes?.success || typeof pageRes.result !== 'number') {
      throw new Error(
        pageRes?.error?.message ?? 'Unable to read current page number.',
      );
    }

    const filePath = filePathRes.result;
    const page = pageRes.result;

    const [pageSizeRes, elementCountRes] = await Promise.all([
      PluginFileAPI.getPageSize(filePath, page),
      PluginFileAPI.getElementCounts(page, filePath),
    ]);

    if (!pageSizeRes?.success || !pageSizeRes.result) {
      throw new Error(
        pageSizeRes?.error?.message ?? 'Unable to read current page size.',
      );
    }

    const elementCount = elementCountRes?.success ? elementCountRes.result : null;
    if (elementCount === 0) {
      await showDialog('This page has no selectable elements.');
      return;
    }

    const rect = fullPageRect(pageSizeRes.result);
    const lassoRes = await PluginCommAPI.lassoElements(rect);
    if (!lassoRes?.success || lassoRes.result === false) {
      throw new Error(
        lassoRes?.error?.message ?? 'Unable to create page-wide lasso selection.',
      );
    }

    const showRes = await PluginCommAPI.setLassoBoxState?.(0);
    if (showRes && !showRes.success) {
      console.warn('[select-page] lasso selected but show state failed', showRes.error);
    }

    console.log('[select-page] selected page', {
      filePath,
      page,
      rect,
      elementCount,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[select-page] selection failed', error);
    await showDialog(`Select Page failed:\n${message}`);
  } finally {
    isSelecting = false;
  }
}

function fullPageRect(pageSize) {
  const width = Math.max(1, Math.floor(pageSize.width ?? 0));
  const height = Math.max(1, Math.floor(pageSize.height ?? 0));
  return {
    left: 0,
    top: 0,
    right: width,
    bottom: height,
  };
}

async function showDialog(message) {
  if (typeof NativeUIUtils?.showRattaDialog !== 'function') {
    console.warn('[select-page]', message);
    return;
  }

  await NativeUIUtils.showRattaDialog(message, 'OK', '', false);
}
