import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { Platform } from '@/contexts/PlatformContext';
import { PLATFORM_TYPES } from '@/constants/config';
import { sovereignResolve } from '@/constants/config';

interface PlatformCardProps {
  platform: Platform;
}

const TYPE_ICON: Record<string, string> = {
  website: 'language',
  mobile: 'smartphone',
  dashboard: 'dashboard',
  landing: 'web-asset',
  api: 'api',
  portal: 'badge',
};

export function PlatformCard({ platform }: PlatformCardProps) {
  const router = useRouter();
  const sovereignValue = sovereignResolve(platform.presence, platform.interactions);

  return (
    <Pressable
      onPress={() => router.push(`/platform/${platform.id}` as any)}
      style={({ pressed }) => [{ opacity: pressed ? 0.75 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }]}
    >
      <GlassCard style={styles.card} variant={platform.status === 'active' ? 'gold' : 'default'}>
        <View style={styles.header}>
          <View style={styles.iconWrap}>
            <MaterialIcons name={TYPE_ICON[platform.type] as any} size={20} color={Colors.gold} />
          </View>
          <StatusBadge status={platform.status} />
        </View>

        <Text style={styles.name} numberOfLines={1}>{platform.name}</Text>
        <Text style={styles.purpose} numberOfLines={2}>{platform.purpose}</Text>

        <View style={styles.footer}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>PRESENCE</Text>
            <Text style={styles.metaValue}>{platform.presence.toLocaleString()}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>SOVEREIGN</Text>
            <Text style={[styles.metaValue, { color: Colors.gold }]}>{sovereignValue.toLocaleString()}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>LAYERS</Text>
            <Text style={styles.metaValue}>{platform.architecture.length}</Text>
          </View>
        </View>

        {platform.tags.length > 0 && (
          <View style={styles.tags}>
            {platform.tags.slice(0, 3).map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.goldGlass,
    borderWidth: 1,
    borderColor: Colors.goldGlassBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  purpose: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.glassBorder,
    marginBottom: Spacing.sm,
  },
  metaItem: { flex: 1, alignItems: 'center' },
  metaLabel: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '600', letterSpacing: 0.6 },
  metaValue: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.textPrimary, marginTop: 2 },
  separator: { width: 1, height: 28, backgroundColor: Colors.glassBorder },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  tagText: { fontSize: FontSize.xs, color: Colors.textSecondary },
});
