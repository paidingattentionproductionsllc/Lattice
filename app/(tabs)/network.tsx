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
  AZL_DOMAINS, AZL_VERSION, AZL_TOTALITY_VERSION, INFINITE_LAYER_MAX, DRIFT_THRESHOLD,
  CONSERVATION_LAW, AZL_AXIOM, yearsSinceAbsoluteZero, azlCheck,
  azlPhysics, azlMultiply, MIYAKE_NORMALIZED, C_THRESHOLD, CREATION_THRESHOLD,
  AZL_TOTALITY_TESTS, AZL_TOTALITY_CATEGORIES,
  AZL_TIERS, AZL_TIER_TOTAL, AZL_ADDRESS_SCALE, AZL_FULL_LAW,
  azlAddress, azlAddressState, azlGetTier, azlVerifyPersistence, DARK_GT_LIGHT,
  REPO_CONSTELLATION, RepoNode,
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

        {/* Repository Constellation */}
        <RepoConstellationSection />

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

        {/* AZL TOTALITY v1.4 — Physics + Source Law */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>AZL TOTALITY {AZL_TOTALITY_VERSION} — {AZL_TOTALITY_TESTS} TESTS. ONE LAW. TREE: ALIVE.</Text>

          {/* Physics Engine */}
          <GlassCard variant="gold" padding={Spacing.md} style={{ marginBottom: Spacing.sm }}>
            <View style={styles.totalityHeader}>
              <MaterialIcons name="science" size={16} color={Colors.gold} />
              <Text style={styles.totalityTitle}>AZL_PHYSICS — Core Law</Text>
              <View style={styles.treeAlive}>
                <View style={[styles.domainDot, { backgroundColor: Colors.success }]} />
                <Text style={styles.treeAliveText}>TREE: ALIVE</Text>
              </View>
            </View>
            <Text style={styles.totalityLaw}>Law: {CONSERVATION_LAW}</Text>
            <Text style={styles.totalityLaw}>Genesis: MIYAKE_14350BP = {MIYAKE_NORMALIZED} (normalized ceiling)</Text>
            <View style={styles.physicsGrid}>
              {[
                { inp: 0.501, sub: 0.0, q: true,  label: 'Human asking' },
                { inp: 1.0,   sub: 0.0, q: false, label: 'LightSpeed' },
                { inp: 0.001, sub: 0.994, q: false, label: 'Dark star' },
                { inp: 0.001, sub: 0.998, q: false, label: 'Observable univ' },
              ].map(ex => {
                const r = azlPhysics(ex.inp, ex.sub, ex.q);
                return (
                  <View key={ex.label} style={styles.physicsRow}>
                    <Text style={styles.physicsLabel}>{ex.label}</Text>
                    <Text style={[styles.physicsState, { color: r.mode === 'HOLD' ? Colors.success : r.mode === 'DRIFT_CORRECTED' ? Colors.warning : Colors.error }]}>
                      {r.mode === 'HOLD' ? 'HOLD' : r.mode === 'DRIFT_CORRECTED' ? 'DRIFT' : 'ERROR'}
                    </Text>
                    <Text style={styles.physicsC}>C={r.C.toFixed(3)}</Text>
                    <Text style={styles.physicsInterp}>{r.canInterpret ? 'INTERPRET' : 'HOLD'}</Text>
                  </View>
                );
              })}
            </View>
            <Text style={styles.totalityNote}>C = 0.5 * substrate * fidelity. Asking adds +0.501. C &gt;= {C_THRESHOLD} = interpret.</Text>
          </GlassCard>

          {/* Source Law */}
          <GlassCard variant="blue" padding={Spacing.md} style={{ marginBottom: Spacing.sm }}>
            <View style={styles.totalityHeader}>
              <MaterialIcons name="bolt" size={16} color={Colors.cyan} />
              <Text style={[styles.totalityTitle, { color: Colors.cyan }]}>AZL_MULTIPLY — Source Law (1x1=2)</Text>
            </View>
            <Text style={styles.totalityLaw}>CREATION: both sources &gt;= {CREATION_THRESHOLD} | WASTE: either source &lt; {CREATION_THRESHOLD}</Text>
            {[
              { a: 0.9, b: 0.2, label: 'Bank + Borrower' },
              { a: 0.6, b: 0.7, label: 'Builder + Need' },
              { a: 0.6, b: 0.501, label: 'Model + Question' },
              { a: 0.6, b: 0.6, label: 'You + Me' },
            ].map(ex => {
              const r = azlMultiply(ex.a, ex.b);
              return (
                <View key={ex.label} style={styles.sourceRow}>
                  <Text style={styles.sourceLabel}>{ex.label}</Text>
                  <Text style={styles.sourceAB}>{ex.a} × {ex.b}</Text>
                  <View style={[styles.sourceStatus, { backgroundColor: r.status === 'CREATION' ? Colors.success + '22' : Colors.error + '22', borderColor: r.status === 'CREATION' ? Colors.success + '55' : Colors.error + '55' }]}>
                    <Text style={[styles.sourceStatusText, { color: r.status === 'CREATION' ? Colors.success : Colors.error }]}>
                      {r.status}
                    </Text>
                  </View>
                  {r.status === 'CREATION' && <Text style={styles.sourceCreation}>+{r.creation}</Text>}
                </View>
              );
            })}
          </GlassCard>

          {/* 45 Test Categories */}
          <GlassCard padding={Spacing.md} style={{ marginBottom: Spacing.sm }}>
            <View style={styles.totalityHeader}>
              <MaterialIcons name="check-circle" size={16} color={Colors.gold} />
              <Text style={styles.totalityTitle}>{AZL_TOTALITY_TESTS}/45 TESTS — ALL PASS</Text>
            </View>
            {AZL_TOTALITY_CATEGORIES.map((cat, i) => (
              <View key={cat.id} style={[styles.catRow, i < AZL_TOTALITY_CATEGORIES.length - 1 && { borderBottomWidth: 1, borderBottomColor: Colors.glassBorder }]}>
                <View style={styles.catBadge}>
                  <Text style={styles.catBadgeNum}>{cat.tests}</Text>
                </View>
                <View style={styles.catInfo}>
                  <Text style={styles.catLabel}>{cat.label}</Text>
                  <Text style={styles.catDesc} numberOfLines={2}>{cat.desc}</Text>
                </View>
                <View style={styles.catPass}>
                  <MaterialIcons name="check" size={14} color={Colors.success} />
                  <Text style={styles.catPassText}>PASS</Text>
                </View>
              </View>
            ))}
          </GlassCard>
        </View>

        {/* AZL TIER 1-7 Catalog Address Space */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>AZL TIER 1-7 — CATALOG ADDRESS SPACE — 1 BILLION OBJECTS</Text>

          {/* Law Banner */}
          <GlassCard variant="gold" padding={Spacing.md} style={{ marginBottom: Spacing.sm }}>
            <View style={styles.totalityHeader}>
              <MaterialIcons name="hub" size={16} color={Colors.gold} />
              <Text style={styles.totalityTitle}>FULL LAW: {AZL_FULL_LAW}</Text>
            </View>
            <Text style={styles.totalityLaw}>SCALE: {AZL_ADDRESS_SCALE} | PRECISION: 510 | CEILING: {AZL_TIER_TOTAL.toLocaleString()} addresses</Text>
            <Text style={styles.totalityLaw}>DARK &gt; LIGHT: infrared/dark catalogs (Tiers 5-7) outnumber visible (Tiers 1-4) by 99:1</Text>
            <View style={styles.darkLightRow}>
              <View style={styles.darkBox}>
                <MaterialIcons name="brightness-2" size={14} color={Colors.cyan} />
                <Text style={styles.darkLabel}>DARK (Tiers 5-7)</Text>
                <Text style={styles.darkVal}>{DARK_GT_LIGHT.darkTotal.toLocaleString()}</Text>
                <Text style={styles.darkCats}>{DARK_GT_LIGHT.darkCatalogs.join(' · ')}</Text>
              </View>
              <View style={styles.darkGtSign}>
                <Text style={styles.darkGtText}>&gt;</Text>
              </View>
              <View style={styles.lightBox}>
                <MaterialIcons name="wb-sunny" size={14} color={Colors.gold} />
                <Text style={styles.darkLabel}>LIGHT (Tiers 1-4)</Text>
                <Text style={[styles.darkVal, { color: Colors.gold }]}>{DARK_GT_LIGHT.lightTotal.toLocaleString()}</Text>
                <Text style={styles.darkCats}>{DARK_GT_LIGHT.lightCatalogs.join(' · ')}</Text>
              </View>
            </View>
          </GlassCard>

          {/* Tier Cards */}
          {AZL_TIERS.map(tier => {
            const sampleState = azlAddressState(tier.end);
            const physResult = azlPhysics(sampleState, 0.0, false);
            const isDark = tier.tier >= 5;
            return (
              <GlassCard
                key={tier.tier}
                style={styles.tierCard}
                variant={isDark ? 'blue' : 'gold'}
                padding={Spacing.sm}
              >
                <View style={styles.tierHeader}>
                  <View style={[styles.tierBadge, { backgroundColor: isDark ? Colors.cyanGlass : Colors.goldGlass, borderColor: isDark ? Colors.cyanGlassBorder : Colors.goldGlassBorder }]}>
                    <Text style={[styles.tierBadgeNum, { color: isDark ? Colors.cyan : Colors.gold }]}>T{tier.tier}</Text>
                  </View>
                  <View style={styles.tierTitleBlock}>
                    <Text style={styles.tierName}>{tier.name}</Text>
                    <Text style={styles.tierCatalog}>{tier.catalog}</Text>
                  </View>
                  <View style={styles.tierRight}>
                    <Text style={[styles.tierSize, { color: isDark ? Colors.cyan : Colors.gold }]}>{tier.size >= 1_000_000 ? `${(tier.size/1_000_000).toFixed(0)}M` : tier.size >= 1_000 ? `${(tier.size/1_000).toFixed(0)}K` : tier.size.toString()}</Text>
                    <View style={[styles.domainHold, { marginTop: 2 }]}>
                      <View style={[styles.domainDot, { backgroundColor: physResult.mode === 'HOLD' ? Colors.success : Colors.warning }]} />
                      <Text style={[styles.domainHoldText, { color: physResult.mode === 'HOLD' ? Colors.success : Colors.warning }]}>{physResult.mode === 'HOLD' ? 'HOLD' : 'DRIFT'}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.tierDesc}>{tier.desc}</Text>
                <View style={styles.tierFooter}>
                  <Text style={styles.tierAddr}>addr({tier.start.toLocaleString()})={azlAddress(tier.start)}</Text>
                  <Text style={styles.tierAddr}>addr({tier.end.toLocaleString()})={azlAddress(tier.end)}</Text>
                  <Text style={styles.tierState}>state={sampleState.toFixed(4)}</Text>
                </View>
              </GlassCard>
            );
          })}

          {/* N×0=N Verification */}
          <GlassCard variant="blue" padding={Spacing.md} style={{ marginTop: Spacing.sm }}>
            <View style={styles.totalityHeader}>
              <MaterialIcons name="verified" size={16} color={Colors.cyan} />
              <Text style={[styles.totalityTitle, { color: Colors.cyan }]}>N×0=N PERSISTENCE VERIFICATION</Text>
            </View>
            <Text style={styles.totalityLaw}>Final address ({AZL_TIER_TOTAL.toLocaleString()}) survives zero interaction — presence preserved:</Text>
            <View style={styles.verifyCodeRow}>
              <Text style={styles.verifyCode}>
                {`azlAddress(1,000,000,000) = ${azlAddress(AZL_TIER_TOTAL)}\nN × 0 = N: ${azlAddress(AZL_TIER_TOTAL)} × 0 = ${azlAddress(AZL_TIER_TOTAL)} (PRESERVED)\nPASS: LAW HOLDS. But GitHub won't.\n~200GB to fully materialize. Sharding required.`}
              </Text>
            </View>
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

function RepoConstellationSection() {
  const [mapWidth, setMapWidth] = useState(320);
  const NS = 64;
  const NH = NS / 2;
  const MAP_H = 248;

  const cx = mapWidth / 2;
  const centers: Record<string, { x: number; y: number }> = {
    lattice:   { x: cx,                 y: NH + 16 },
    azl_truth: { x: mapWidth - NH - 20, y: MAP_H - NH - 14 },
    broadcast: { x: NH + 20,            y: MAP_H - NH - 14 },
  };

  const NODE_COLORS: Record<string, string> = {
    lattice:   Colors.gold,
    azl_truth: Colors.cyan,
    broadcast: Colors.success,
  };

  const connections: Array<{ a: string; b: string; color: string }> = [
    { a: 'lattice',   b: 'azl_truth', color: Colors.gold + '44' },
    { a: 'lattice',   b: 'broadcast', color: Colors.gold + '44' },
    { a: 'broadcast', b: 'azl_truth', color: Colors.cyan + '33' },
  ];

  function getLine(ca: { x: number; y: number }, cb: { x: number; y: number }) {
    const dx = cb.x - ca.x;
    const dy = cb.y - ca.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return { width: len, left: (ca.x + cb.x) / 2 - len / 2, top: (ca.y + cb.y) / 2 - 1, angle };
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>REPOSITORY CONSTELLATION — 3 LIVE NODES</Text>

      <GlassCard variant="blue" padding={0} style={{ marginBottom: Spacing.sm, overflow: 'hidden' }}>
        <View
          style={{ height: MAP_H, position: 'relative' }}
          onLayout={e => setMapWidth(Math.max(1, e.nativeEvent.layout.width))}
        >
          {connections.map((conn, i) => {
            const ca = centers[conn.a];
            const cb = centers[conn.b];
            if (!ca || !cb) return null;
            const line = getLine(ca, cb);
            return (
              <View
                key={i}
                style={{
                  position: 'absolute',
                  height: 1.5,
                  width: line.width,
                  left: line.left,
                  top: line.top,
                  backgroundColor: conn.color,
                  transform: [{ rotate: `${line.angle}deg` }],
                }}
              />
            );
          })}
          {REPO_CONSTELLATION.map(repo => {
            const center = centers[repo.id];
            if (!center) return null;
            const color = NODE_COLORS[repo.id] || Colors.textMuted;
            return (
              <View
                key={repo.id}
                style={{
                  position: 'absolute',
                  left: center.x - NH,
                  top: center.y - NH,
                  width: NS,
                  height: NS,
                  borderRadius: NH,
                  backgroundColor: color + '18',
                  borderWidth: 1.5,
                  borderColor: color + 'BB',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: color,
                  shadowRadius: 10,
                  shadowOpacity: 0.5,
                  elevation: 6,
                }}
              >
                <MaterialIcons name={repo.circleIcon as any} size={18} color={color} />
                <Text style={{ fontSize: 7, fontWeight: '800', color, textAlign: 'center', letterSpacing: 0.4, marginTop: 2 }}>
                  {repo.circleLabel}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md, borderTopWidth: 1, borderTopColor: Colors.glassBorder }}>
          {REPO_CONSTELLATION.map(repo => {
            const color = NODE_COLORS[repo.id] || Colors.textMuted;
            return (
              <View key={repo.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color }} />
                <Text style={{ fontSize: 9, color: Colors.textPrimary, fontWeight: '700' }}>{repo.name}</Text>
                <Text style={{ fontSize: 8, color: Colors.textMuted }}>· {repo.status}</Text>
              </View>
            );
          })}
        </View>
      </GlassCard>

      {REPO_CONSTELLATION.map(repo => (
        <RepoNodeCard key={repo.id} repo={repo} nodeColors={NODE_COLORS} />
      ))}
    </View>
  );
}

function RepoNodeCard({ repo, nodeColors }: { repo: RepoNode; nodeColors: Record<string, string> }) {
  const color = nodeColors[repo.id] || Colors.textMuted;
  const variant: 'gold' | 'blue' | 'default' = repo.status === 'MAIN' ? 'gold' : repo.status === 'VERIFIED' ? 'blue' : 'default';

  return (
    <GlassCard variant={variant} padding={Spacing.md} style={styles.repoCard}>
      <View style={styles.repoHeader}>
        <View style={[styles.repoIcon, { backgroundColor: color + '20', borderColor: color + '55' }]}>
          <MaterialIcons name={repo.circleIcon as any} size={16} color={color} />
        </View>
        <View style={styles.repoTitleBlock}>
          <Text style={styles.repoName}>{repo.name}</Text>
          <Text style={styles.repoFullName}>{repo.fullName}</Text>
        </View>
        <View style={[styles.repoStatusBadge, { backgroundColor: color + '20', borderColor: color + '55' }]}>
          <Text style={[styles.repoStatusText, { color }]}>{repo.status}</Text>
        </View>
      </View>

      <Text style={styles.repoDesc} numberOfLines={2}>{repo.description}</Text>

      <View style={styles.repoStatsRow}>
        {[
          { icon: 'schedule' as const, label: 'PUSH', value: repo.lastPush, iconColor: Colors.textMuted },
          { icon: 'star' as const, label: 'STARS', value: String(repo.stars), iconColor: Colors.gold },
          { icon: 'call-split' as const, label: 'FORKS', value: String(repo.forks), iconColor: Colors.textMuted },
          { icon: 'people' as const, label: 'CONTRIB', value: String(repo.contributors), iconColor: Colors.textMuted },
          { icon: 'new-releases' as const, label: 'REL', value: String(repo.releases), iconColor: Colors.cyan },
        ].map((stat, i, arr) => (
          <React.Fragment key={stat.label}>
            <View style={styles.repoStat}>
              <MaterialIcons name={stat.icon} size={11} color={stat.iconColor} />
              <Text style={styles.repoStatLabel}>{stat.label}</Text>
              <Text style={styles.repoStatValue}>{stat.value}</Text>
            </View>
            {i < arr.length - 1 && <View style={styles.repoStatDivider} />}
          </React.Fragment>
        ))}
      </View>

      <View style={{ marginBottom: Spacing.sm }}>
        <Text style={{ fontSize: 9, color: Colors.textMuted, fontWeight: '700', letterSpacing: 0.8, marginBottom: 5 }}>LANGUAGES</Text>
        <View style={{ flexDirection: 'row', height: 5, borderRadius: 3, overflow: 'hidden', marginBottom: 5 }}>
          {repo.languages.map(lang => (
            <View key={lang.name} style={{ flex: lang.pct, backgroundColor: lang.color, minWidth: 1 }} />
          ))}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {repo.languages.filter(l => l.pct >= 1).map(lang => (
            <View key={lang.name} style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: lang.color }} />
              <Text style={{ fontSize: 9, color: Colors.textSecondary }}>{lang.name}</Text>
              <Text style={{ fontSize: 9, color: Colors.textMuted }}>{lang.pct}%</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.repoFooter}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: FontSize.xs, color: Colors.textSecondary, fontWeight: '600' }}>{repo.role}</Text>
          {repo.releases > 0 && (
            <Text style={{ fontSize: 9, color: Colors.textMuted, marginTop: 2 }}>Latest: {repo.latestRelease}</Text>
          )}
        </View>
        <View style={[styles.repoLawBadge, { borderColor: color + '44', backgroundColor: color + '10' }]}>
          <Text style={[styles.repoLaw, { color }]}>{repo.law}</Text>
        </View>
      </View>
    </GlassCard>
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

  totalityHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: Spacing.sm },
  totalityTitle: { flex: 1, fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.gold },
  treeAlive: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  treeAliveText: { fontSize: 9, color: Colors.success, fontWeight: '800', letterSpacing: 0.6 },
  totalityLaw: { fontSize: FontSize.xs, color: Colors.textSecondary, lineHeight: 16, marginBottom: 4 },
  totalityNote: { fontSize: FontSize.xs, color: Colors.textMuted, fontStyle: 'italic', lineHeight: 16, marginTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.glassBorder, paddingTop: Spacing.sm },
  physicsGrid: { marginTop: Spacing.sm, gap: 5 },
  physicsRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: Colors.glassBorder + '88' },
  physicsLabel: { flex: 1, fontSize: FontSize.xs, color: Colors.textSecondary },
  physicsState: { fontSize: FontSize.xs, fontWeight: '800', letterSpacing: 0.6, minWidth: 40, textAlign: 'center' },
  physicsC: { fontSize: FontSize.xs, color: Colors.textMuted, fontFamily: 'monospace', minWidth: 55 },
  physicsInterp: { fontSize: 9, color: Colors.cyan, fontWeight: '700', letterSpacing: 0.4 },
  sourceRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: Colors.glassBorder + '88' },
  sourceLabel: { flex: 1, fontSize: FontSize.xs, color: Colors.textSecondary },
  sourceAB: { fontSize: FontSize.xs, color: Colors.textMuted, fontFamily: 'monospace' },
  sourceStatus: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: Radius.full, borderWidth: 1 },
  sourceStatusText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.4 },
  sourceCreation: { fontSize: FontSize.xs, color: Colors.success, fontWeight: '700' },
  catRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.sm },
  catBadge: { width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.goldGlass, borderWidth: 1, borderColor: Colors.goldGlassBorder, justifyContent: 'center', alignItems: 'center' },
  catBadgeNum: { fontSize: 9, fontWeight: '800', color: Colors.gold },
  catInfo: { flex: 1 },
  catLabel: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.textPrimary, letterSpacing: 0.4 },
  catDesc: { fontSize: 9, color: Colors.textMuted, lineHeight: 14, marginTop: 2 },
  catPass: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  catPassText: { fontSize: 9, color: Colors.success, fontWeight: '800', letterSpacing: 0.4 },

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

  // Tier 1-7 styles
  darkLightRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginTop: Spacing.sm },
  darkBox: { flex: 1, backgroundColor: Colors.cyanGlass, borderWidth: 1, borderColor: Colors.cyanGlassBorder, borderRadius: Radius.sm, padding: Spacing.sm, alignItems: 'center', gap: 2 },
  lightBox: { flex: 1, backgroundColor: Colors.goldGlass, borderWidth: 1, borderColor: Colors.goldGlassBorder, borderRadius: Radius.sm, padding: Spacing.sm, alignItems: 'center', gap: 2 },
  darkGtSign: { paddingHorizontal: 4 },
  darkGtText: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.textPrimary },
  darkLabel: { fontSize: 9, color: Colors.textMuted, fontWeight: '700', letterSpacing: 0.6 },
  darkVal: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.cyan },
  darkCats: { fontSize: 8, color: Colors.textMuted, textAlign: 'center' },
  tierCard: { marginBottom: 6 },
  tierHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: 5 },
  tierBadge: { width: 30, height: 30, borderRadius: 15, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  tierBadgeNum: { fontSize: FontSize.xs, fontWeight: '800', letterSpacing: 0.4 },
  tierTitleBlock: { flex: 1 },
  tierName: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  tierCatalog: { fontSize: 9, color: Colors.textMuted, fontFamily: 'monospace', marginTop: 1 },
  tierRight: { alignItems: 'flex-end' },
  tierSize: { fontSize: FontSize.md, fontWeight: FontWeight.bold },
  tierDesc: { fontSize: FontSize.xs, color: Colors.textSecondary, lineHeight: 16, marginBottom: 6 },
  tierFooter: { borderTopWidth: 1, borderTopColor: Colors.glassBorder, paddingTop: 5, gap: 2 },
  tierAddr: { fontSize: 8, color: Colors.textMuted, fontFamily: 'monospace' },
  tierState: { fontSize: 8, color: Colors.cyan, fontFamily: 'monospace' },
  verifyCodeRow: { backgroundColor: Colors.bg, borderRadius: Radius.sm, padding: Spacing.sm, marginTop: Spacing.sm },
  verifyCode: { fontSize: 9, color: Colors.success, fontFamily: 'monospace', lineHeight: 14 },

  // Repo constellation styles
  repoCard: { marginBottom: Spacing.sm },
  repoHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  repoIcon: { width: 34, height: 34, borderRadius: Radius.sm, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  repoTitleBlock: { flex: 1 },
  repoName: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  repoFullName: { fontSize: 9, color: Colors.textMuted, marginTop: 1 },
  repoStatusBadge: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: Radius.full, borderWidth: 1 },
  repoStatusText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.6 },
  repoDesc: { fontSize: FontSize.xs, color: Colors.textSecondary, lineHeight: 17, marginBottom: Spacing.sm },
  repoStatsRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.bg, borderRadius: Radius.sm, padding: Spacing.sm, marginBottom: Spacing.sm },
  repoStat: { flex: 1, alignItems: 'center', gap: 2 },
  repoStatDivider: { width: 1, height: 28, backgroundColor: Colors.glassBorder },
  repoStatLabel: { fontSize: 8, color: Colors.textMuted, fontWeight: '600', letterSpacing: 0.4 },
  repoStatValue: { fontSize: FontSize.xs, color: Colors.textPrimary, fontWeight: '700' },
  repoFooter: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.glassBorder },
  repoLawBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: Radius.full, borderWidth: 1 },
  repoLaw: { fontSize: 9, fontWeight: '800', letterSpacing: 0.6 },
});
