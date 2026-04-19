import React from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {PluginManager} from 'sn-plugin-lib';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const foreground = isDarkMode ? '#f7f7f2' : '#141414';
  const muted = isDarkMode ? '#c7c7bd' : '#454545';
  const background = isDarkMode ? '#11110f' : '#fbfaf4';

  const handleClose = () => {
    PluginManager.closePluginView();
  };

  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <Pressable style={styles.closeButton} onPress={handleClose}>
        <Text style={[styles.closeText, {color: foreground}]}>x</Text>
      </Pressable>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={background}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, {color: foreground}]}>Select All</Text>
        <Text style={[styles.body, {color: foreground}]}>
          This plugin adds a NOTE toolbar button that selects every element on
          the current page.
        </Text>
        <Text style={[styles.subtitle, {color: foreground}]}>How it works</Text>
        <Text style={[styles.body, {color: muted}]}>
          It reads the current note path, current page number, and page size,
          then calls PluginCommAPI.lassoElements with a full-page rectangle. It
          does not move, delete, rewrite, or export page content.
        </Text>
        <Text style={[styles.subtitle, {color: foreground}]}>Use</Text>
        <Text style={[styles.body, {color: muted}]}>
          Open a note page and tap Select All in the NOTE toolbar. The normal
          Supernote lasso selection should appear around all elements on that
          page.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    zIndex: 2,
  },
  closeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 14,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 22,
    marginBottom: 6,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
  },
});

export default App;
