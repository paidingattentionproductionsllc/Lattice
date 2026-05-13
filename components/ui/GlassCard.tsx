import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing } from '@/constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  variant?: 'default' | 'gold' | 'blue';
  padding?: number;
}

export function GlassCard({ children, style, variant = 'default', padding = Spacing.md }: GlassCardProps) {
  const variantStyle = variant === 'gold'
    ? styles.goldVariant
    : variant === 'blue'
    ? styles.blueVariant
    : styles.defaultVariant;

  return (
    <View style={[styles.base, variantStyle, { padding }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  defaultVariant: {
    backgroundColor: Colors.glass,
    borderColor: Colors.glassBorder,
  },
  goldVariant: {
    backgroundColor: Colors.goldGlass,
    borderColor: Colors.goldGlassBorder,
  },
  blueVariant: {
    backgroundColor: Colors.blueGlass,
    borderColor: Colors.blueGlassBorder,
  },
});
