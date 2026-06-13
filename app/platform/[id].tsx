import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { usePlatforms } from '@/hooks/usePlatforms';
import { sovereignResolve, ARCHITECTURE } from '@/constants/config';
import { useAlert } from '@/template';
import type { PlatformStatus } from '@/contexts/PlatformContext';

const TYPE_ICON: Record<string, string> = {
  website: 'language', mobile: 'smartphone', dashboard: 'dashboard',
  landing: 'web-asset', api: 'api', portal: 'badge',
};

export default function PlatformDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { platforms, updatePlatformStatus, deletePlatform } = usePlatforms();
  const { showAlert } = useAlert();

  const platform = platforms.find(p => p.id === id);

  if (!platform) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.notFound}>
          <MaterialIcons name="error-outline" size={48} color={Colors.textMuted} />
          <Text style={styles.notFoundText}>Platform not found</Text>
          <Pressable onPress={() => router.back()} style={styles.backLink}>
            <Text style={styles.backLinkText}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const sovereignValue = sovereignResolve(platform.presence, platform.interactions);

  const handleStatusChange = (status: PlatformStatus) => {
    updatePlatformStatus(platform.id, status);
  };

  const handleDelete = () => {
    showAlert('Delete Platform', `Remove "${platform.name}" from the lattice? This cannot be undone.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: () => {
          deletePlatform(platform.id);
          router.back();
        }
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Nav */}
      <View style={styles.nav}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.navBtn, { opacity: pressed ? 0.6 : 1 }]}
        >
          <MaterialIcons name="arrow-back" size={22} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.navTitle} numberOfLines={1}>{platform.name}</Text>
        <Pressable
          onPress={handleDelete}
          style={({ pressed }) => [styles.navBtn, { opacity: pressed ? 0.6 : 1 }]}
        >
          <MaterialIcons name="delete-outline" size={22} color={Colors.error} />
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Identity Block */}
        <View style={styles.section}>
          <GlassCard variant="gold" padding={Spacing.lg}>
            <View style={styles.identityHeader}>
              <View style={styles.typeIconWrap}>
                <MaterialIcons name={TYPE_ICON[platform.type] as any} size={28} color={Colors.gold} />
              </View>
              <StatusBadge status={platform.status} />
            </View>
            <Text style={styles.platformName}>{platform.name}</Text>
            <Text style={styles.platformType}>{platform.type.toUpperCase()} PLATFORM</Text>
            <Text style={styles.platformPurpose}>{platform.purpose}</Text>

            {platform.tags.length > 0 && (
              <View style={styles.tags}>
                {platform.tags.map(tag => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </GlassCard>
        </View>

        {/* Sovereign Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SOVEREIGN METRICS</Text>
          <View style={styles.metricsRow}>
            <GlassCard style={{ flex: 1 }} variant="gold" padding={Spacing.md}>
              <Text style={styles.metricValue}>{platform.presence.toLocaleString()}</Text>
              <Text style={styles.metricLabel}>PRESENCE</Text>
            </GlassCard>
            <GlassCard style={{ flex: 1 }} padding={Spacing.md}>
              <Text style={styles.metricValue}>{platform.interactions}</Text>
              <Text style={styles.metricLabel}>INTERACTIONS</Text>
            </GlassCard>
            <GlassCard style={{ flex: 1 }} variant="blue" padding={Spacing.md}>
              <Text style={[styles.metricValue, { color: Colors.cyan }]}>{sovereignValue.toLocaleString()}</Text>
              <Text style={styles.metricLabel}>SOVEREIGN</Text>
            </GlassCard>
          </View>
        </View>

        {/* Absolute Number Framework Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>FRAMEWORK RESOLUTION</Text>
          <GlassCard variant="blue" padding={Spacing.md}>
            <View style={styles.formulaRow}>
              <View style={styles.formulaBlock}>
                <Text style={styles.formulaNumber}>{platform.presence.toLocaleString()}</Text>
                <Text style={styles.formulaLabel}>PRESENCE</Text>
              </View>
              <Text style={styles.formulaOp}>×</Text>
              <View style={styles.formulaBlock}>
                <Text style={styles.formulaNumber}>{platform.interactions}</Text>
                <Text style={styles.formulaLabel}>INTERACT</Text>
              </View>
              <Text style={styles.formulaOp}>=</Text>
              <View style={styles.formulaBlock}>
                <Text style={[styles.formulaNumber, { color: Colors.gold }]}>{sovereignValue.toLocaleString()}</Text>
                <Text style={styles.formulaLabel}>SOVEREIGN</Text>
              </View>
            </View>
            <Text style={styles.formulaRule}>
              {platform.interactions === 0
                ? 'Rule: n × 0 = n (Persistence — state preserved)'
                : platform.interactions === 1
                ? 'Rule: 1 × n = n+1 (Identification — state elevated)'
                : `Rule: n × m = nm (Stabilization — state amplified)`}
            </Text>
          </GlassCard>
        </View>

        {/* Architecture Layers */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ARCHITECTURE LAYERS</Text>
          {ARCHITECTURE.map((layer, i) => {
            const owned = platform.architecture.includes(layer);
            return (
              <GlassCard
                key={layer}
                style={styles.archCard}
                variant={owned ? 'gold' : 'default'}
                padding={Spacing.md}
              >
                <View style={[styles.archIndex, { backgroundColor: owned ? Colors.goldGlass : Colors.glass }]}>
                  <Text style={[styles.archIndexText, { color: owned ? Colors.gold : Colors.textMuted }]}>{i}</Text>
                </View>
                <View style={styles.archInfo}>
                  <Text style={[styles.archName, { color: owned ? Colors.textPrimary : Colors.textMuted }]}>{layer}</Text>
                  <Text style={styles.archStatus}>{owned ? 'ACTIVE IN STACK' : 'NOT ASSIGNED'}</Text>
                </View>
                <MaterialIcons
                  name={owned ? 'check-circle' : 'radio-button-unchecked'}
                  size={20}
                  color={owned ? Colors.gold : Colors.textMuted}
                />
              </GlassCard>
            );
          })}
        </View>

        {/* Status Control */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>STATUS CONTROL</Text>
          <View style={styles.statusGrid}>
            {(['active', 'building', 'idle', 'error'] as PlatformStatus[]).map(status => (
              <Pressable
                key={status}
                onPress={() => handleStatusChange(status)}
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
              >
                <GlassCard
                  style={platform.status === status ? [styles.statusBtn, styles.statusBtnActive] : styles.statusBtn}
                  padding={Spacing.sm}
                >
                  <Text style={[styles.statusBtnText, platform.status === status && { color: Colors.gold }]}>
                    {status.toUpperCase()}
                  </Text>
                </GlassCard>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Meta */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>META</Text>
          <GlassCard padding={Spacing.md}>
            <View style={styles.metaRow}>
              <Text style={styles.metaKey}>PLATFORM ID</Text>
              <Text style={styles.metaVal}>{platform.id}</Text>
            </View>
            <View style={[styles.metaRow, styles.metaRowBorder]}>
              <Text style={styles.metaKey}>CREATED</Text>
              <Text style={styles.metaVal}>{platform.createdAt.toLocaleDateString()}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaKey}>RESONANCE</Text>
              <Text style={styles.metaVal} numberOfLines={1}>{platform.resonance.toExponential(2)}</Text>
            </View>
          </GlassCard>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  nav: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.sm, paddingVertical: Spacing.sm,
    borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder,
  },
  navBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  navTitle: { flex: 1, fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.textPrimary, textAlign: 'center', letterSpacing: 0.5 },

  scroll: { flex: 1 },
  section: { paddingHorizontal: Spacing.md, marginTop: Spacing.lg },
  sectionLabel: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '700', letterSpacing: 1.2, marginBottom: Spacing.sm },

  identityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  typeIconWrap: {
    width: 52, height: 52, borderRadius: Radius.md,
    backgroundColor: Colors.goldGlass, borderWidth: 1, borderColor: Colors.goldGlassBorder,
    justifyContent: 'center', alignItems: 'center',
  },
  platformName: { fontSize: FontSize.xxl, fontWeight: FontWeight.extrabold, color: Colors.textPrimary },
  platformType: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '700', letterSpacing: 1, marginTop: 2 },
  platformPurpose: { fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 24, marginTop: Spacing.sm, marginBottom: Spacing.md },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: Radius.full, backgroundColor: Colors.glass, borderWidth: 1, borderColor: Colors.glassBorder },
  tagText: { fontSize: FontSize.xs, color: Colors.textSecondary },

  metricsRow: { flexDirection: 'row', gap: Spacing.sm },
  metricValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.textPrimary, textAlign: 'center' },
  metricLabel: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '600', letterSpacing: 0.8, textAlign: 'center', marginTop: 2 },

  formulaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: Spacing.md },
  formulaBlock: { alignItems: 'center' },
  formulaNumber: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.cyan },
  formulaLabel: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '600', marginTop: 2 },
  formulaOp: { fontSize: FontSize.xxl, color: Colors.textMuted, fontWeight: '300' },
  formulaRule: { fontSize: FontSize.sm, color: Colors.textSecondary, fontStyle: 'italic', textAlign: 'center', borderTopWidth: 1, borderTopColor: Colors.glassBorder, paddingTop: Spacing.sm },

  archCard: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.sm },
  archIndex: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  archIndexText: { fontSize: FontSize.sm, fontWeight: '800' },
  archInfo: { flex: 1 },
  archName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold },
  archStatus: { fontSize: FontSize.xs, color: Colors.textMuted, letterSpacing: 0.5, marginTop: 1 },

  statusGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  statusBtn: { minWidth: '46%', alignItems: 'center' },
  statusBtnActive: { backgroundColor: Colors.goldGlass, borderColor: Colors.goldGlassBorder },
  statusBtnText: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.textSecondary, letterSpacing: 1 },

  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing.sm },
  metaRowBorder: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: Colors.glassBorder },
  metaKey: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '700', letterSpacing: 0.8 },
  metaVal: { fontSize: FontSize.sm, color: Colors.textPrimary, fontWeight: '500', maxWidth: '60%', textAlign: 'right', fontFamily: 'monospace' },

  notFound: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.md },
  notFoundText: { fontSize: FontSize.lg, color: Colors.textSecondary },
  backLink: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, backgroundColor: Colors.glass, borderRadius: Radius.md },
  backLinkText: { fontSize: FontSize.md, color: Colors.gold, fontWeight: '600' },
});
