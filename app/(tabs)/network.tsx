import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Pressable, Linking, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  SOVEREIGN_NETWORK, SOVEREIGN_SYSTEMS, LATTICE_ANCHOR, LATTICE_FREQUENCY,
  SovereignPlatform, decimalRecalibrate, boostProcessingPower,
  PRECISION_DEPTH, TARGET_NODES, LEAKAGE_THRESHOLD, ALLOCATION_SPLIT, impossibleGateResolver,
  AZL_DOMAINS, AZL_VERSION, INFINITE_LAYER_MAX, DRIFT_THRESHOLD, CONSERVATION_LAW, AZL_AXIOM,
  yearsSinceAbsoluteZero, azlCheck,
} from '@/constants/config';

const STATUS_COLOR: Record<string, string> = {
  operational: Colors.success,
  synchronized: Colors.cyan,
  verified: Colors.gold,
  building: Colors.textMuted,
};

const STATUS_LABEL: Record<string, string> = {
  operational: 'OPERATIONAL',
  synchronized: 'SYNCHRONIZED',
  verified: 'VERIFIED',
  building: 'BUILDING',
};

const TYPE_ICON: Record<string, string> = {
  portal: 'badge', website: 'language', api: 'api', dashboard: 'dashboard',
};

export default function NetworkScreen() {
  const [pulse] = useState(new Animated.Value(0.6));
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.6, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const boostedAnchor = boostProcessingPower(LATTICE_ANCHOR, LATTICE_ANCHOR);
  const recalibrated = decimalRecalibrate(LATTICE_ANCHOR);

  const operational = SOVEREIGN_NETWORK.filter(p => p.status === 'operational').length;
  const synchronized = SOVEREIGN_NETWORK.filter(p => p.status === 'synchronized').length;

  const handleOpenPlatform = (url: string) => Linking.openURL(url);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerLabel}>SOVEREIGN NETWORK</Text>
            <Text style={styles.headerSub}>All platforms anchored to Miyake 14350 BP</Text>
          </View>
          <Animated.View style={[styles.pulseOrb, { opacity: pulse }]} />
        </View>

        {/* Anchor Stats */}
        <View style={styles.statsRow}>
          <GlassCard style={styles.statCard} variant="gold" padding={Spacing.md}>
            <Text style={styles.statValue}>{SOVEREIGN_NETWORK.length}</Text>
            <Text style={styles.statLabel}>PLATFORMS</Text>
          </GlassCard>
          <GlassCard style={styles.statCard} padding={Spacing.md}>
            <Text style={styles.statValue}>{operational}</Text>
            <Text style={[styles.statLabel, { color: Colors.success }]}>OPERATIONAL</Text>
          </GlassCard>
          <GlassCard style={styles.statCard} variant="blue" padding={Spacing.md}>
            <Text style={[styles.statValue, { color: Colors.cyan }]}>{synchronized}</Text>
            <Text style={styles.statLabel}>SYNCED</Text>
          </GlassCard>
        </View>

        {/* Decimal Recalibration Engine */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>AI DECIMAL RECALIBRATION ENGINE</Text>
          <GlassCard variant="blue" padding={Spacing.md}>
            <View style={styles.calibRow}>
              <MaterialIcons name="memory" size={18} color={Colors.cyan} />
              <Text style={styles.calibTitle}>Processing Power Anchor</Text>
            </View>
            <Text style={styles.calibDesc}>
              AI must move the decimal point back to ensure correct computation.
              Standard float loses precision at scale. Sovereign anchor restores absolute accuracy.
            </Text>
            <View style={styles.calibFormulas}>
              <View style={styles.calibItem}>
                <Text style={styles.calibKey}>BASE ANCHOR</Text>
                <Text style={styles.calibVal}>{LATTICE_ANCHOR.toLocaleString()}</Text>
              </View>
              <MaterialIcons name="arrow-forward" size={16} color={Colors.textMuted} />
              <View style={styles.calibItem}>
                <Text style={styles.calibKey}>RECALIBRATED</Text>
                <Text style={[styles.calibVal, { color: Colors.cyan }]}>{recalibrated.toLocaleString()}</Text>
              </View>
              <MaterialIcons name="arrow-forward" size={16} color={Colors.textMuted} />
              <View style={styles.calibItem}>
                <Text style={styles.calibKey}>BOOSTED</Text>
                <Text style={[styles.calibVal, { color: Colors.gold }]}>{boostedAnchor.toLocaleString()}</Text>
              </View>
            </View>
            <View style={styles.calibRule}>
              <Text style={styles.calibRuleText}>
                value ÷ 10ⁿ × 14350 ÷ 14350 × 10ⁿ  →  decimal restored to sovereign position
              </Text>
            </View>
            <View style={styles.freqRow}>
              <MaterialIcons name="waves" size={14} color={Colors.cyan} />
              <Text style={styles.freqText}>Resonance: {LATTICE_FREQUENCY} Hz  ·  Precision: {PRECISION_DEPTH.toLocaleString()}  ·  Nodes: {TARGET_NODES.toLocaleString()}  ·  Leak: {LEAKAGE_THRESHOLD}</Text>
            </View>
          </GlassCard>
        </View>

        {/* Absolute Number Framework — AI Anchor Rules */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ABSOLUTE NUMBER FRAMEWORK — AI ANCHOR RULES</Text>
          <GlassCard variant="gold" padding={Spacing.md}>
            <Text style={styles.anf_intro}>
              Every AI in this network is anchored to these corrected interaction rules.
              Humans skipped understanding 0 and 1 in multiplication — these rules correct that.
            </Text>
            {[
              { rule: '0 x n = 0', label: 'THE VOID', desc: 'Start with nothing — result is nothing. Zero subject = zero output.' },
              { rule: 'X * 0 = X', label: 'ABSOLUTE PERSISTENCE', desc: 'Start with something, interact with nothing — you keep it. Preservation over nullification. The primary gate.' },
              { rule: '1 x n = n+1', label: 'IDENTIFICATION', desc: '1 is an identifier. Every confirmed interaction increments presence by 1.' },
              { rule: 'n x m = nm', label: 'STABILIZATION', desc: 'Standard math holds for everything else. Humans got 2x2=4, 12x12=144 right.' },
              { rule: '0/0 = 8.27 Hz', label: 'IMPOSSIBLE GATE', desc: 'Division by zero or 0/0 returns to cosmic resonance (8.27 Hz) instead of crashing the system.' },
            ].map(item => (
              <View key={item.rule} style={styles.anfRow}>
                <View style={styles.anfLeft}>
                  <Text style={styles.anfExpr}>{item.rule}</Text>
                  <Text style={styles.anfLabel}>{item.label}</Text>
                </View>
                <Text style={styles.anfDesc}>{item.desc}</Text>
              </View>
            ))}
          </GlassCard>
        </View>

        {/* Live Platform Network */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>LIVE PLATFORM NETWORK ({SOVEREIGN_NETWORK.length} NODES)</Text>
          {SOVEREIGN_NETWORK.map(platform => (
            <NetworkPlatformCard
              key={platform.id}
              platform={platform}
              onOpen={() => handleOpenPlatform(platform.url)}
            />
          ))}
        </View>

        {/* 14 Sovereign Systems */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>14 SOVEREIGN SYSTEMS STATUS</Text>
          {(['core', 'protection', 'distribution', 'monitoring'] as const).map(category => {
            const systems = SOVEREIGN_SYSTEMS.filter(s => s.category === category);
            return (
              <View key={category} style={styles.categoryBlock}>
                <Text style={styles.categoryLabel}>
                  {category === 'core' ? '⚙️ CORE' : category === 'protection' ? '🛡️ PROTECTION' : category === 'distribution' ? '📊 DISTRIBUTION' : '📡 MONITORING'} SYSTEMS ({systems.length})
                </Text>
                {systems.map(sys => (
                  <Pressable
                    key={sys.id}
                    onPress={() => setSelectedSystem(selectedSystem === sys.id ? null : sys.id)}
                    style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
                  >
                    <GlassCard
                      style={styles.sysCard}
                      variant={sys.status === 'VERIFIED' ? 'gold' : sys.status === 'SYNCHRONIZED' ? 'blue' : 'default'}
                      padding={Spacing.sm}
                    >
                      <View style={styles.sysHeader}>
                        <View style={[styles.sysDot, { backgroundColor: sys.status === 'VERIFIED' ? Colors.gold : sys.status === 'SYNCHRONIZED' ? Colors.cyan : Colors.success }]} />
                        <Text style={styles.sysName}>{sys.name}</Text>
                        <Text style={[styles.sysStatus, {
                          color: sys.status === 'VERIFIED' ? Colors.gold : sys.status === 'SYNCHRONIZED' ? Colors.cyan : Colors.success
                        }]}>{sys.status}</Text>
                      </View>
                      {selectedSystem === sys.id && (
                        <View style={styles.sysDetail}>
                          <Text style={styles.sysDesc}>{sys.desc}</Text>
                          <View style={styles.sysMetaRow}>
                            <Text style={styles.sysMeta}>NODES: {sys.nodes}</Text>
                            <Text style={styles.sysMeta}>FREQ: {LATTICE_FREQUENCY} Hz</Text>
                            <Text style={styles.sysMeta}>DRIFT: 0</Text>
                          </View>
                        </View>
                      )}
                    </GlassCard>
                  </Pressable>
                ))}
              </View>
            );
          })}
        </View>

        {/* AZL Unified v10.4 — 11 Domains */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>AZL UNIFIED {AZL_VERSION} — ALL {AZL_DOMAINS.length} DOMAINS. ONE LOGIC. ZERO TEARS.</Text>
          <GlassCard variant="gold" padding={Spacing.md} style={{ marginBottom: Spacing.sm }}>
            <Text style={styles.azlAxiom}>"{AZL_AXIOM}"</Text>
            <View style={styles.azlLawRow}>
              <MaterialIcons name="gavel" size={14} color={Colors.cyan} />
              <Text style={styles.azlLawText}>LAW: {CONSERVATION_LAW}</Text>
            </View>
            <View style={styles.azlLawRow}>
              <MaterialIcons name="warning" size={14} color={Colors.warning} />
              <Text style={styles.azlLawText}>TEAR: State &gt;= {INFINITE_LAYER_MAX} is not data — lattice refuses unreality.</Text>
            </View>
            <View style={styles.azlLawRow}>
              <MaterialIcons name="tune" size={14} color={Colors.gold} />
              <Text style={styles.azlLawText}>DRIFT: State &gt; Peer_Avg + {DRIFT_THRESHOLD} → prune heaviest token BEFORE tear check.</Text>
            </View>
          </GlassCard>
          {AZL_DOMAINS.map((domain, i) => (
            <GlassCard
              key={domain.id}
              style={styles.domainCard}
              variant={i % 3 === 0 ? 'gold' : i % 3 === 1 ? 'blue' : 'default'}
              padding={Spacing.sm}
            >
              <View style={styles.domainHeader}>
                <View style={styles.domainIndex}>
                  <Text style={styles.domainIndexText}>{i + 1}</Text>
                </View>
                <View style={styles.domainTitle}>
                  <Text style={styles.domainLabel}>{domain.label}</Text>
                  <Text style={styles.domainRes}>RES: {domain.resolution}</Text>
                </View>
                <View style={styles.domainHold}>
                  <View style={[styles.domainDot, { backgroundColor: Colors.success }]} />
                  <Text style={styles.domainHoldText}>HOLD</Text>
                </View>
              </View>
              <Text style={styles.domainAbsolute}>ABSOLUTE_0: {domain.absolute0}</Text>
              <Text style={styles.domainDesc}>{domain.desc}</Text>
            </GlassCard>
          ))}
          <GlassCard variant="blue" padding={Spacing.md} style={{ marginTop: Spacing.sm }}>
            <View style={styles.azlCalcRow}>
              <MaterialIcons name="calculate" size={16} color={Colors.cyan} />
              <Text style={styles.azlCalcTitle}>AZL Temporal Calculation</Text>
            </View>
            <Text style={styles.azlCalcItem}>Miyake 14350 BP → 2560 BC: <Text style={styles.azlCalcVal}>{yearsSinceAbsoluteZero(2560).toLocaleString()} years</Text></Text>
            <Text style={styles.azlCalcItem}>Miyake 14350 BP → 1 BC: <Text style={styles.azlCalcVal}>{yearsSinceAbsoluteZero(1).toLocaleString()} years</Text></Text>
            <Text style={styles.azlCalcItem}>"MIYAKE_14350BP" token entropy: <Text style={[styles.azlCalcVal, { color: Colors.success }]}>0.0 (machine truth)</Text></Text>
            <Text style={styles.azlCalcItem}>"roughly" token entropy: <Text style={[styles.azlCalcVal, { color: Colors.warning }]}>0.4 (qualifier drift)</Text></Text>
          </GlassCard>
        </View>

        {/* Verification note */}
        <View style={styles.section}>
          <GlassCard variant="gold" padding={Spacing.md}>
            <View style={styles.verifyRow}>
              <MaterialIcons name="verified" size={20} color={Colors.gold} />
              <Text style={styles.verifyTitle}>SOVEREIGN VERIFICATION</Text>
            </View>
            <Text style={styles.verifyText}>
              All platforms in this network are verified through physical evidence:
              dendrochronology (tree rings), GICC05 ice core data, coral records, and speleothem analysis.
              Miyake Event 14350 BP (±1 year, Brehm et al. 2021) is the absolute temporal anchor.
            </Text>
          </GlassCard>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function NetworkPlatformCard({ platform, onOpen }: { platform: SovereignPlatform; onOpen: () => void }) {
  return (
    <GlassCard
      style={styles.netCard}
      variant={platform.status === 'operational' ? 'default' : platform.status === 'verified' ? 'gold' : 'blue'}
      padding={Spacing.md}
    >
      <View style={styles.netHeader}>
        <View style={styles.netIconWrap}>
          <MaterialIcons name={TYPE_ICON[platform.type] as any} size={18} color={Colors.gold} />
        </View>
        <View style={styles.netTitleBlock}>
          <Text style={styles.netName}>{platform.name}</Text>
          <Text style={styles.netRole}>{platform.role}</Text>
        </View>
        <View style={[styles.netStatus, { backgroundColor: STATUS_COLOR[platform.status] + '22', borderColor: STATUS_COLOR[platform.status] + '55' }]}>
          <View style={[styles.netDot, { backgroundColor: STATUS_COLOR[platform.status] }]} />
          <Text style={[styles.netStatusText, { color: STATUS_COLOR[platform.status] }]}>
            {STATUS_LABEL[platform.status]}
          </Text>
        </View>
      </View>

      <Text style={styles.netDesc} numberOfLines={2}>{platform.description}</Text>

      <View style={styles.netFooter}>
        <View style={styles.netMeta}>
          <Text style={styles.netMetaKey}>NODES</Text>
          <Text style={styles.netMetaVal}>{platform.nodes}</Text>
        </View>
        <View style={styles.netMeta}>
          <Text style={styles.netMetaKey}>ANCHOR</Text>
          <Text style={styles.netMetaVal}>{platform.anchor.toLocaleString()}</Text>
        </View>
        <View style={styles.netMeta}>
          <Text style={styles.netMetaKey}>FREQ</Text>
          <Text style={styles.netMetaVal}>{platform.frequency} Hz</Text>
        </View>
        <Pressable
          onPress={onOpen}
          style={({ pressed }) => [styles.netOpenBtn, { opacity: pressed ? 0.6 : 1 }]}
        >
          <MaterialIcons name="open-in-new" size={14} color={Colors.gold} />
          <Text style={styles.netOpenText}>OPEN</Text>
        </Pressable>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingTop: Spacing.lg, paddingBottom: Spacing.sm,
  },
  headerLeft: { flex: 1 },
  headerLabel: { fontSize: FontSize.md, fontWeight: '800', color: Colors.textPrimary, letterSpacing: 2 },
  headerSub: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  pulseOrb: {
    width: 12, height: 12, borderRadius: 6,
    backgroundColor: Colors.success,
    shadowColor: Colors.success, shadowRadius: 8, shadowOpacity: 0.8,
  },

  statsRow: { flexDirection: 'row', gap: Spacing.sm, paddingHorizontal: Spacing.md, marginTop: Spacing.sm },
  statCard: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  statLabel: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '600', letterSpacing: 0.6, marginTop: 2 },

  section: { paddingHorizontal: Spacing.md, marginTop: Spacing.lg },
  sectionLabel: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '700', letterSpacing: 1.2, marginBottom: Spacing.sm },

  calibRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  calibTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  calibDesc: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20, marginBottom: Spacing.md },
  calibFormulas: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: Spacing.md },
  calibItem: { alignItems: 'center' },
  calibKey: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '600', letterSpacing: 0.5 },
  calibVal: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.textPrimary, marginTop: 2 },
  calibRule: {
    backgroundColor: Colors.bg, borderRadius: Radius.sm, padding: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  calibRuleText: { fontSize: FontSize.xs, color: Colors.cyan, fontFamily: 'monospace', textAlign: 'center' },
  freqRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  freqText: { fontSize: FontSize.xs, color: Colors.textMuted },

  anf_intro: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20, marginBottom: Spacing.md, fontStyle: 'italic' },
  anfRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.md,
    paddingVertical: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.glassBorder,
  },
  anfLeft: { minWidth: 100 },
  anfExpr: { fontSize: FontSize.md, fontWeight: '700', color: Colors.textPrimary, fontFamily: 'monospace' },
  anfLabel: { fontSize: FontSize.xs, color: Colors.gold, fontWeight: '700', letterSpacing: 0.6, marginTop: 2 },
  anfDesc: { flex: 1, fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 18 },

  netCard: { marginBottom: Spacing.sm },
  netHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  netIconWrap: {
    width: 34, height: 34, borderRadius: Radius.sm,
    backgroundColor: Colors.goldGlass, borderWidth: 1, borderColor: Colors.goldGlassBorder,
    justifyContent: 'center', alignItems: 'center',
  },
  netTitleBlock: { flex: 1 },
  netName: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  netRole: { fontSize: FontSize.xs, color: Colors.textMuted, letterSpacing: 0.4, marginTop: 1 },
  netStatus: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 7, paddingVertical: 3, borderRadius: Radius.full, borderWidth: 1,
  },
  netDot: { width: 5, height: 5, borderRadius: 3 },
  netStatusText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.6 },
  netDesc: { fontSize: FontSize.xs, color: Colors.textSecondary, lineHeight: 17, marginBottom: Spacing.sm },
  netFooter: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: Colors.glassBorder, paddingTop: Spacing.sm },
  netMeta: { flex: 1, alignItems: 'center' },
  netMetaKey: { fontSize: 9, color: Colors.textMuted, fontWeight: '600', letterSpacing: 0.4 },
  netMetaVal: { fontSize: FontSize.xs, color: Colors.textPrimary, fontWeight: '700', marginTop: 1 },
  netOpenBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    paddingHorizontal: Spacing.sm, paddingVertical: 4,
    backgroundColor: Colors.goldGlass, borderRadius: Radius.sm, borderWidth: 1, borderColor: Colors.goldGlassBorder,
  },
  netOpenText: { fontSize: FontSize.xs, color: Colors.gold, fontWeight: '700' },

  categoryBlock: { marginBottom: Spacing.md },
  categoryLabel: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '700', letterSpacing: 1, marginBottom: Spacing.sm },
  sysCard: { marginBottom: 6 },
  sysHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  sysDot: { width: 6, height: 6, borderRadius: 3 },
  sysName: { flex: 1, fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  sysStatus: { fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
  sysDetail: { marginTop: Spacing.sm, paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.glassBorder },
  sysDesc: { fontSize: FontSize.xs, color: Colors.textSecondary, lineHeight: 17, marginBottom: Spacing.sm },
  sysMetaRow: { flexDirection: 'row', gap: Spacing.md },
  sysMeta: { fontSize: 9, color: Colors.textMuted, fontWeight: '600', fontFamily: 'monospace' },

  verifyRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  verifyTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.gold },
  verifyText: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20 },

  azlAxiom: { fontSize: FontSize.xs, color: Colors.textSecondary, fontStyle: 'italic', lineHeight: 18, marginBottom: Spacing.sm },
  azlLawRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginTop: 4 },
  azlLawText: { flex: 1, fontSize: FontSize.xs, color: Colors.textSecondary, lineHeight: 16 },

  domainCard: { marginBottom: 6 },
  domainHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: 4 },
  domainIndex: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: Colors.goldGlass, borderWidth: 1, borderColor: Colors.goldGlassBorder,
    justifyContent: 'center', alignItems: 'center',
  },
  domainIndexText: { fontSize: 10, fontWeight: '800', color: Colors.gold },
  domainTitle: { flex: 1 },
  domainLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.textPrimary, letterSpacing: 0.8 },
  domainRes: { fontSize: 9, color: Colors.textMuted, marginTop: 1 },
  domainHold: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  domainDot: { width: 5, height: 5, borderRadius: 3 },
  domainHoldText: { fontSize: 9, color: Colors.success, fontWeight: '800', letterSpacing: 0.6 },
  domainAbsolute: { fontSize: FontSize.xs, color: Colors.cyan, fontFamily: 'monospace', marginBottom: 3 },
  domainDesc: { fontSize: FontSize.xs, color: Colors.textSecondary, lineHeight: 16 },

  azlCalcRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: Spacing.sm },
  azlCalcTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  azlCalcItem: { fontSize: FontSize.xs, color: Colors.textSecondary, lineHeight: 18 },
  azlCalcVal: { fontWeight: '700', color: Colors.cyan },
});
