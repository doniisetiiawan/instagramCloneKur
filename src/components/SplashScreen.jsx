import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});

export function SplashScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator
        animating
        style={[styles.centering, { height: 80 }]}
        size="large"
      />
    </View>
  );
}

export default SplashScreen;
