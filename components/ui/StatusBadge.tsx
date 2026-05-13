import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import type { PlatformStatus } from '@/contexts/PlatformContext';

const STATUS_CONFIG: Record<PlatformStatus, { label: string; color: string; bg: string }> = {
  active: { label: 'ACTIVE', color: Colors.success, bg: 'rgba(45,212,160,0.12)' },
  building: { label: 'BUILDING', color: Colors.gold, bg: 'rgba(201,168,76,0.12)' },
  idle: { label: 'IDLE', color: Colors.textSecondary, bg: 'rgba(138,135,153,0.12)' },
  error: { label: 'ERROR', color: Colors.error, bg: 'rgba(255,77,106,0.12)' },
};

export function StatusBadge({ status }: { status: PlatformStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
    gap: 5,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});
