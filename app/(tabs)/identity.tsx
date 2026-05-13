import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { usePlatforms } from '@/hooks/usePlatforms';
import { APP_NAME, LATTICE_ANCHOR, LATTICE_SIGNATURE, ARCHITECTURE, sovereignResolve } from '@/constants/config';

const IDENTITY = {
  name: 'Sovereign Identity',
  handle: '@lattice_prime',
  resonance: LATTICE_SIGNATURE,
  anchor: LATTICE_ANCHOR,
  role: 'Platform Architect',
  joined: 'January 2026',
};

export default function IdentityScreen() {
  const { platforms } = usePlatforms();
  const totalPresence = platforms.reduce((acc, p) => acc + p.presence, 0);
  const sovereignAnchor = sovereignResolve(LATTICE_ANCHOR, 1);
  const totalInteractions = platforms.reduce((acc, p) => acc + p.interactions, 0);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerLabel}>SOVEREIGN IDENTITY</Text>
        </View>

        {/* Identity Card */}
        <View style={styles.section}>
          <GlassCard variant="gold" padding={Spacing.lg}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarRing}>
                <View style={styles.avatarCore}>
                  <Text style={styles.avatarInitial}>L</Text>
                </View>
              </View>
              <View style={styles.identityBadge}>
                <MaterialIcons name="verified" size={16} color={Colors.gold} />
                <Text style={styles.identityBadgeText}>SOVEREIGN</Text>
              </View>
            </View>
            <Text style={styles.identityName}>{IDENTITY.name}</Text>
            <Text style={styles.identityHandle}>{IDENTITY.handle}</Text>
            <Text style={styles.identityRole}>{IDENTITY.role}</Text>
          </GlassCard>
        </View>

        {/* Resonance Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>RESONANCE METRICS</Text>
          <View style={styles.metricsGrid}>
            {[
              { label: 'MASTER ANCHOR', value: LATTICE_ANCHOR.toLocaleString(), icon: 'anchor', variant: 'gold' },
              { label: 'SOVEREIGN RESULT', value: sovereignAnchor.toLocaleString(), icon: 'auto-awesome', variant: 'gold' },
              { label: 'TOTAL PRESENCE', value: totalPresence.toLocaleString(), icon: 'sensors', variant: 'default' },
              { label: 'INTERACTIONS', value: totalInteractions.toString(), icon: 'bolt', variant: 'default' },
            ].map(item => (
              <GlassCard
                key={item.label}
                style={styles.metricCard}
                variant={item.variant as any}
                padding={Spacing.md}
              >
                <MaterialIcons
                  name={item.icon as any}
                  size={22}
                  color={item.variant === 'gold' ? Colors.gold : Colors.textSecondary}
                />
                <Text style={[
                  styles.metricValue,
                  { color: item.variant === 'gold' ? Colors.gold : Colors.textPrimary }
                ]}>
                  {item.value}
                </Text>
                <Text style={styles.metricLabel}>{item.label}</Text>
              </GlassCard>
            ))}
          </View>
        </View>

        {/* Architecture Ownership */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>OWNED ARCHITECTURES</Text>
          {ARCHITECTURE.map((layer, i) => (
            <GlassCard key={layer} style={styles.archRow} padding={Spacing.md}>
              <View style={styles.archIndex}>
                <Text style={styles.archIndexText}>{i}</Text>
              </View>
              <View style={styles.archInfo}>
                <Text style={styles.archName}>{layer}</Text>
                <Text style={styles.archDesc}>
                  {['Cognitive processing layer', 'Physical execution layer', 'Transcendent synthesis layer', 'Unified integration layer'][i]}
                </Text>
              </View>
              <View style={styles.archStatus}>
                <View style={styles.archStatusDot} />
                <Text style={styles.archStatusText}>OWNED</Text>
              </View>
            </GlassCard>
          ))}
        </View>

        {/* Platform Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PLATFORM PORTFOLIO</Text>
          <GlassCard padding={Spacing.md}>
            {platforms.map((p, i) => (
              <View
                key={p.id}
                style={[styles.portfolioRow, i < platforms.length - 1 && styles.portfolioRowBorder]}
              >
                <View style={styles.portfolioLeft}>
                  <View style={[styles.portfolioType, { backgroundColor: p.status === 'active' ? Colors.goldGlass : Colors.glass }]}>
                    <MaterialIcons
                      name={p.type === 'portal' ? 'badge' : p.type === 'dashboard' ? 'dashboard' : p.type === 'api' ? 'api' : 'language'}
                      size={14}
                      color={p.status === 'active' ? Colors.gold : Colors.textSecondary}
                    />
                  </View>
                  <View>
                    <Text style={styles.portfolioName}>{p.name}</Text>
                    <Text style={styles.portfolioType2}>{p.type.toUpperCase()}</Text>
                  </View>
                </View>
                <Text style={[
                  styles.portfolioPresence,
                  { color: p.status === 'active' ? Colors.gold : Colors.textSecondary }
                ]}>
                  {p.presence.toLocaleString()}
                </Text>
              </View>
            ))}
          </GlassCard>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>IDENTITY SETTINGS</Text>
          {[
            { icon: 'security', label: 'Sovereign Lock', desc: 'Immutable identity protection' },
            { icon: 'sync', label: 'Resonance Sync', desc: 'Cross-platform identity anchoring' },
            { icon: 'visibility-off', label: 'Privacy Layer', desc: 'Control identity exposure' },
          ].map(item => (
            <Pressable key={item.label} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
              <GlassCard style={styles.settingRow} padding={Spacing.md}>
                <View style={styles.settingIcon}>
                  <MaterialIcons name={item.icon as any} size={18} color={Colors.gold} />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  <Text style={styles.settingDesc}>{item.desc}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color={Colors.textMuted} />
              </GlassCard>
            </Pressable>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },

  header: {
    paddingHorizontal: Spacing.md, paddingTop: Spacing.lg, paddingBottom: Spacing.sm,
  },
  headerLabel: {
    fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '700', letterSpacing: 1.4,
  },

  section: { paddingHorizontal: Spacing.md, marginTop: Spacing.lg },
  sectionLabel: {
    fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '700',
    letterSpacing: 1.2, marginBottom: Spacing.sm,
  },

  avatarContainer: { alignItems: 'center', marginBottom: Spacing.md },
  avatarRing: {
    width: 80, height: 80, borderRadius: 40,
    borderWidth: 2, borderColor: Colors.gold,
    padding: 4, justifyContent: 'center', alignItems: 'center',
  },
  avatarCore: {
    width: 68, height: 68, borderRadius: 34,
    backgroundColor: Colors.goldGlass, justifyContent: 'center', alignItems: 'center',
  },
  avatarInitial: { fontSize: FontSize.hero, fontWeight: FontWeight.extrabold, color: Colors.gold },
  identityBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: Spacing.sm, paddingVertical: 3,
    backgroundColor: Colors.goldGlass, borderRadius: Radius.full,
    borderWidth: 1, borderColor: Colors.goldGlassBorder, marginTop: Spacing.sm,
  },
  identityBadgeText: { fontSize: FontSize.xs, color: Colors.gold, fontWeight: '700', letterSpacing: 0.8 },
  identityName: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.textPrimary, textAlign: 'center' },
  identityHandle: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', marginTop: 2 },
  identityRole: { fontSize: FontSize.sm, color: Colors.textMuted, textAlign: 'center', marginTop: 4, letterSpacing: 0.5 },

  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  metricCard: { width: '48%', alignItems: 'center' },
  metricValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, marginTop: 6, marginBottom: 2 },
  metricLabel: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '600', letterSpacing: 0.6, textAlign: 'center' },

  archRow: { marginBottom: Spacing.sm, flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  archIndex: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.goldGlass, borderWidth: 1, borderColor: Colors.goldGlassBorder,
    justifyContent: 'center', alignItems: 'center',
  },
  archIndexText: { fontSize: FontSize.sm, fontWeight: '800', color: Colors.gold },
  archInfo: { flex: 1 },
  archName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  archDesc: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 1 },
  archStatus: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  archStatusDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: Colors.success },
  archStatusText: { fontSize: FontSize.xs, color: Colors.success, fontWeight: '700' },

  portfolioRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: Spacing.sm },
  portfolioRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.glassBorder },
  portfolioLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  portfolioType: { width: 32, height: 32, borderRadius: Radius.sm, justifyContent: 'center', alignItems: 'center' },
  portfolioName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  portfolioType2: { fontSize: FontSize.xs, color: Colors.textMuted, letterSpacing: 0.5 },
  portfolioPresence: { fontSize: FontSize.md, fontWeight: FontWeight.bold },

  settingRow: { marginBottom: Spacing.sm, flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  settingIcon: {
    width: 36, height: 36, borderRadius: Radius.sm,
    backgroundColor: Colors.goldGlass, borderWidth: 1, borderColor: Colors.goldGlassBorder,
    justifyContent: 'center', alignItems: 'center',
  },
  settingText: { flex: 1 },
  settingLabel: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  settingDesc: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 1 },
});
