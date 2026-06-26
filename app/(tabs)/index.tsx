import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Pressable, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';
import { usePlatforms } from '@/hooks/usePlatforms';
import { PlatformCard } from '@/components/feature/PlatformCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { APP_NAME, APP_TAGLINE, ARCHITECTURE, sovereignResolve, LATTICE_ANCHOR, SOVEREIGN_NETWORK } from '@/constants/config';

const { width } = Dimensions.get('window');

const FILTER_OPTIONS = ['All', 'Active', 'Building', 'Idle'];

export default function HubScreen() {
  const { platforms } = usePlatforms();
  const router = useRouter();
  const [filter, setFilter] = useState('All');

  const filtered = platforms.filter(p => {
    if (filter === 'All') return true;
    return p.status === filter.toLowerCase();
  });

  const totalPresence = platforms.reduce((acc, p) => acc + p.presence, 0);
  const activePlatforms = platforms.filter(p => p.status === 'active').length;
  const sovereignAnchor = sovereignResolve(LATTICE_ANCHOR, 1);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Image
            source={require('@/assets/images/hero-lattice.png')}
            style={styles.heroBg}
            contentFit="cover"
            transition={400}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <MaterialIcons name="hub" size={12} color={Colors.gold} />
              <Text style={styles.heroBadgeText}>SOVEREIGN FACTORY</Text>
            </View>
            <Text style={styles.heroTitle}>{APP_NAME}</Text>
            <Text style={styles.heroSubtitle}>{APP_TAGLINE}</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <GlassCard style={styles.statCard} variant="gold" padding={Spacing.md}>
            <Text style={styles.statValue}>{platforms.length}</Text>
            <Text style={styles.statLabel}>PLATFORMS</Text>
          </GlassCard>
          <GlassCard style={styles.statCard} padding={Spacing.md}>
            <Text style={styles.statValue}>{activePlatforms}</Text>
            <Text style={styles.statLabel}>ACTIVE</Text>
          </GlassCard>
          <GlassCard style={styles.statCard} variant="blue" padding={Spacing.md}>
            <Text style={[styles.statValue, { color: Colors.cyan }]}>{sovereignAnchor.toLocaleString()}</Text>
            <Text style={styles.statLabel}>ANCHOR</Text>
          </GlassCard>
        </View>

        {/* Network Status Strip */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SOVEREIGN NETWORK — {SOVEREIGN_NETWORK.length} PLATFORMS CONNECTED</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.layersRow}>
            {SOVEREIGN_NETWORK.map(net => (
              <GlassCard key={net.id} style={styles.netChip} variant={net.status === 'operational' ? 'default' : 'blue'} padding={Spacing.sm}>
                <View style={[styles.netDot, {
                  backgroundColor: net.status === 'operational' ? Colors.success : net.status === 'synchronized' ? Colors.cyan : Colors.gold
                }]} />
                <Text style={styles.netShort}>{net.shortName}</Text>
              </GlassCard>
            ))}
          </ScrollView>
        </View>

        {/* Architecture Layers */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ARCHITECTURE LAYERS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.layersRow}>
            {ARCHITECTURE.map((layer, i) => (
              <GlassCard key={layer} style={styles.layerChip} padding={Spacing.sm}>
                <Text style={styles.layerIndex}>{i}</Text>
                <Text style={styles.layerName}>{layer}</Text>
              </GlassCard>
            ))}
          </ScrollView>
        </View>

        {/* Sovereign Logic Visualizer */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ABSOLUTE NUMBER FRAMEWORK</Text>
          <GlassCard variant="blue" padding={Spacing.md}>
            <View style={styles.logicRow}>
              {[
                { expr: '0 × n = 0', note: 'Nothing from nothing' },
                { expr: 'n × 0 = n', note: 'Persistence' },
                { expr: '1 × n = n+1', note: 'Identification' },
                { expr: 'n × m = nm', note: 'Stabilization' },
              ].map(item => (
                <View key={item.expr} style={styles.logicItem}>
                  <Text style={styles.logicExpr}>{item.expr}</Text>
                  <Text style={styles.logicNote}>{item.note}</Text>
                </View>
              ))}
            </View>
          </GlassCard>
        </View>

        {/* Platform Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>PLATFORMS</Text>
            <Pressable
              onPress={() => router.push('/create')}
              style={({ pressed }) => [styles.spawnBtn, { opacity: pressed ? 0.7 : 1 }]}
            >
              <MaterialIcons name="add" size={16} color={Colors.bg} />
              <Text style={styles.spawnBtnText}>SPAWN</Text>
            </Pressable>
          </View>

          {/* Filter chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {FILTER_OPTIONS.map(opt => (
              <Pressable
                key={opt}
                onPress={() => setFilter(opt)}
                style={[styles.filterChip, filter === opt && styles.filterChipActive]}
              >
                <Text style={[styles.filterChipText, filter === opt && styles.filterChipTextActive]}>{opt}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {filtered.length === 0 ? (
            <GlassCard style={styles.emptyState}>
              <MaterialIcons name="layers-clear" size={40} color={Colors.textMuted} />
              <Text style={styles.emptyTitle}>No platforms yet</Text>
              <Text style={styles.emptySubtitle}>Spawn your first sovereign platform</Text>
            </GlassCard>
          ) : (
            filtered.map(p => <PlatformCard key={p.id} platform={p} />)
          )}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },

  hero: { height: 220, position: 'relative', overflow: 'hidden' },
  heroBg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  heroOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(5,5,7,0.65)',
  },
  heroContent: {
    position: 'absolute', bottom: Spacing.xl, left: Spacing.md,
  },
  heroBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    marginBottom: Spacing.sm,
  },
  heroBadgeText: {
    fontSize: FontSize.xs, color: Colors.gold, fontWeight: '700', letterSpacing: 1.2,
  },
  heroTitle: {
    fontSize: FontSize.hero, fontWeight: FontWeight.extrabold,
    color: Colors.textPrimary, letterSpacing: 4,
  },
  heroSubtitle: {
    fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2, letterSpacing: 0.5,
  },

  statsRow: {
    flexDirection: 'row', gap: Spacing.sm, paddingHorizontal: Spacing.md, marginTop: Spacing.md,
  },
  statCard: { flex: 1, alignItems: 'center' },
  statValue: {
    fontSize: FontSize.xl, fontWeight: FontWeight.bold,
    color: Colors.textPrimary, includeFontPadding: false,
  },
  statLabel: {
    fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '600', letterSpacing: 0.8, marginTop: 2,
  },

  section: { paddingHorizontal: Spacing.md, marginTop: Spacing.lg },
  sectionLabel: {
    fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '700',
    letterSpacing: 1.2, marginBottom: Spacing.sm,
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },

  layersRow: { gap: Spacing.sm, paddingVertical: 2 },
  netChip: { alignItems: 'center', minWidth: 60, flexDirection: 'row', gap: 4 },
  netDot: { width: 5, height: 5, borderRadius: 3 },
  netShort: { fontSize: FontSize.xs, color: Colors.textPrimary, fontWeight: '700', letterSpacing: 0.4 },
  layerIndex: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '700' },
  layerName: { fontSize: FontSize.sm, color: Colors.textPrimary, fontWeight: '600', marginTop: 2 },

  logicRow: { gap: Spacing.sm },
  logicItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: Colors.glassBorder,
  },
  logicExpr: { fontSize: FontSize.md, color: Colors.cyan, fontWeight: FontWeight.semibold, fontFamily: 'monospace' },
  logicNote: { fontSize: FontSize.sm, color: Colors.textSecondary },

  spawnBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.gold, paddingHorizontal: Spacing.md, paddingVertical: 6,
    borderRadius: Radius.full,
  },
  spawnBtnText: { fontSize: FontSize.xs, fontWeight: '800', color: Colors.bg, letterSpacing: 1 },

  filterRow: { gap: Spacing.sm, paddingVertical: 2, marginBottom: Spacing.md },
  filterChip: {
    paddingHorizontal: Spacing.md, paddingVertical: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.glass, borderWidth: 1, borderColor: Colors.glassBorder,
  },
  filterChipActive: {
    backgroundColor: Colors.goldGlass, borderColor: Colors.goldGlassBorder,
  },
  filterChipText: { fontSize: FontSize.sm, color: Colors.textSecondary, fontWeight: '500' },
  filterChipTextActive: { color: Colors.gold, fontWeight: '700' },

  emptyState: { alignItems: 'center', paddingVertical: Spacing.xxl },
  emptyTitle: { fontSize: FontSize.lg, color: Colors.textPrimary, fontWeight: FontWeight.bold, marginTop: Spacing.md },
  emptySubtitle: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 4 },
});
