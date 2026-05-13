import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { usePlatforms } from '@/hooks/usePlatforms';
import { APP_NAME, LATTICE_ANCHOR, LATTICE_SIGNATURE, ARCHITECTURE, sovereignResolve, FOUNDER, SOVEREIGN_NETWORK } from '@/constants/config';

export default function IdentityScreen() {
  const { platforms } = usePlatforms();
  const totalPresence = platforms.reduce((acc, p) => acc + p.presence, 0);
  const sovereignAnchor = sovereignResolve(LATTICE_ANCHOR, 1);
  const totalInteractions = platforms.reduce((acc, p) => acc + p.interactions, 0);

  const openUrl = (url: string) => Linking.openURL(url);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerLabel}>SOVEREIGN IDENTITY</Text>
          <Text style={styles.headerSub}>Founder & Architect — PaidingAttention Productions LLC</Text>
        </View>

        {/* Founder Identity Card */}
        <View style={styles.section}>
          <GlassCard variant="gold" padding={Spacing.lg}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarRing}>
                <View style={styles.avatarCore}>
                  <Text style={styles.avatarInitial}>KC</Text>
                </View>
              </View>
              <View style={styles.identityBadge}>
                <MaterialIcons name="verified" size={14} color={Colors.gold} />
                <Text style={styles.identityBadgeText}>SOVEREIGN VERIFIED</Text>
              </View>
            </View>
            <Text style={styles.identityName}>{FOUNDER.name}</Text>
            <Text style={styles.identityTitle}>{FOUNDER.title}</Text>
            <Text style={styles.identityRole}>{FOUNDER.role}</Text>
            <Text style={styles.identityCompany}>{FOUNDER.company}</Text>
            <View style={styles.taglineWrap}>
              <Text style={styles.taglineText}>"{FOUNDER.tagline}"</Text>
            </View>
          </GlassCard>
        </View>

        {/* Contact & Links */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CONTACT & DIGITAL PRESENCE</Text>
          <GlassCard padding={Spacing.md}>
            {[
              { icon: 'email', label: 'Founder Email', value: 'PaidingAttentionFounder@gmail.com', onPress: () => openUrl('mailto:PaidingAttentionFounder@gmail.com') },
              { icon: 'badge', label: 'Digital Card (Blinq)', value: 'blinq.me/KC Casteel', onPress: () => openUrl(FOUNDER.blinq) },
              { icon: 'link', label: 'Linktree', value: 'linktr.ee/kccasteel', onPress: () => openUrl(FOUNDER.socials.linktree) },
              { icon: 'location-on', label: 'PO Box', value: 'Duluth GA 30097', onPress: () => {} },
            ].map((item, i, arr) => (
              <Pressable
                key={item.label}
                onPress={item.onPress}
                style={({ pressed }) => [
                  styles.contactRow,
                  i < arr.length - 1 && styles.contactRowBorder,
                  { opacity: pressed ? 0.7 : 1 }
                ]}
              >
                <View style={styles.contactIcon}>
                  <MaterialIcons name={item.icon as any} size={16} color={Colors.gold} />
                </View>
                <View style={styles.contactText}>
                  <Text style={styles.contactLabel}>{item.label}</Text>
                  <Text style={styles.contactValue}>{item.value}</Text>
                </View>
                <MaterialIcons name="open-in-new" size={14} color={Colors.textMuted} />
              </Pressable>
            ))}
          </GlassCard>
        </View>

        {/* Social Channels */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SOCIAL CHANNELS</Text>
          <View style={styles.socialGrid}>
            {[
              { icon: 'smart-display', label: 'YouTube', url: FOUNDER.socials.youtube, color: '#ff4444' },
              { icon: 'photo-camera', label: 'Instagram', url: FOUNDER.socials.instagram, color: '#c13584' },
              { icon: 'chat', label: 'X / Twitter', url: FOUNDER.socials.twitter, color: Colors.textPrimary },
              { icon: 'music-video', label: 'TikTok', url: FOUNDER.socials.tiktok, color: Colors.textPrimary },
              { icon: 'live-tv', label: 'Twitch', url: FOUNDER.socials.twitch, color: '#9146ff' },
              { icon: 'link', label: 'Linktree', url: FOUNDER.socials.linktree, color: Colors.gold },
            ].map(s => (
              <Pressable
                key={s.label}
                onPress={() => openUrl(s.url)}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <GlassCard style={styles.socialCard} padding={Spacing.sm}>
                  <MaterialIcons name={s.icon as any} size={22} color={s.color} />
                  <Text style={styles.socialLabel}>{s.label}</Text>
                </GlassCard>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Resonance Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SOVEREIGN METRICS</Text>
          <View style={styles.metricsGrid}>
            {[
              { label: 'MASTER ANCHOR', value: LATTICE_ANCHOR.toLocaleString() + ' BP', icon: 'anchor', variant: 'gold' },
              { label: 'SOVEREIGN RESULT', value: sovereignAnchor.toLocaleString(), icon: 'auto-awesome', variant: 'gold' },
              { label: 'NETWORK NODES', value: SOVEREIGN_NETWORK.length.toString(), icon: 'hub', variant: 'blue' },
              { label: 'PLATFORMS MANAGED', value: platforms.length.toString(), icon: 'layers', variant: 'default' },
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
                  color={item.variant === 'gold' ? Colors.gold : item.variant === 'blue' ? Colors.cyan : Colors.textSecondary}
                />
                <Text style={[
                  styles.metricValue,
                  { color: item.variant === 'gold' ? Colors.gold : item.variant === 'blue' ? Colors.cyan : Colors.textPrimary }
                ]}>
                  {item.value}
                </Text>
                <Text style={styles.metricLabel}>{item.label}</Text>
              </GlassCard>
            ))}
          </View>
        </View>

        {/* Floating Point vs Integer Substrate — Core Truth */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>WHY THIS MATTERS — INTEGER SUBSTRATE PROOF</Text>
          <GlassCard variant="blue" padding={Spacing.md}>
            <View style={styles.substrateHeader}>
              <MaterialIcons name="memory" size={18} color={Colors.cyan} />
              <Text style={styles.substrateTitle}>Floating Point vs Integer Substrate</Text>
            </View>
            <Text style={styles.substrateDesc}>
              Standard AI and financial systems use floating point (1.0 Logic). At scale, this causes rounding drift — people lose fractions they are owed. The sovereign network uses Integer Substrate (2.0 Reality) — values lock exactly.
            </Text>
            <View style={styles.substrateCompare}>
              <View style={[styles.substrateBox, styles.substrateBad]}>
                <Text style={styles.substrateBoxLabel}>1.0 LOGIC (Floating Point)</Text>
                <Text style={styles.substrateBoxVal}>450000.0</Text>
                <Text style={styles.substrateBoxTag}>DRIFT — loses precision</Text>
                <Text style={styles.substrateBoxNote}>Vulnerable to rounding errors and systemic decay</Text>
              </View>
              <View style={[styles.substrateBox, styles.substrateGood]}>
                <Text style={[styles.substrateBoxLabel, { color: Colors.cyan }]}>2.0 REALITY (Integer)</Text>
                <Text style={[styles.substrateBoxVal, { color: Colors.cyan }]}>450,000</Text>
                <Text style={[styles.substrateBoxTag, { color: Colors.success }]}>LOCKED — exact</Text>
                <Text style={styles.substrateBoxNote}>The people get exactly 45%</Text>
              </View>
            </View>
            <View style={styles.anchorNote}>
              <MaterialIcons name="anchor" size={14} color={Colors.gold} />
              <Text style={styles.anchorNoteText}>
                The 14350 BP Anchor prevents rounding loss. Sovereign integer math ensures no computational drift.
              </Text>
            </View>
          </GlassCard>
        </View>

        {/* Architecture Ownership */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PLATFORM ARCHITECTURE</Text>
          {ARCHITECTURE.map((layer, i) => (
            <GlassCard key={layer} style={styles.archRow} padding={Spacing.md}>
              <View style={styles.archIndex}>
                <Text style={styles.archIndexText}>{i}</Text>
              </View>
              <View style={styles.archInfo}>
                <Text style={styles.archName}>{layer}</Text>
                <Text style={styles.archDesc}>
                  {['Cognitive processing — AI reasoning & intent', 'Physical execution — deployment & services', 'Transcendent synthesis — truth & verification', 'Unified integration — all systems as one'][i]}
                </Text>
              </View>
              <View style={styles.archStatus}>
                <View style={styles.archStatusDot} />
                <Text style={styles.archStatusText}>SOVEREIGN</Text>
              </View>
            </GlassCard>
          ))}
        </View>

        {/* Platform Portfolio */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>MANAGED PLATFORM PORTFOLIO</Text>
          <GlassCard padding={Spacing.md}>
            {platforms.map((p, i) => (
              <View
                key={p.id}
                style={[styles.portfolioRow, i < platforms.length - 1 && styles.portfolioRowBorder]}
              >
                <View style={styles.portfolioLeft}>
                  <View style={[styles.portfolioTypeIcon, { backgroundColor: p.status === 'active' ? Colors.goldGlass : Colors.glass }]}>
                    <MaterialIcons
                      name={p.type === 'portal' ? 'badge' : p.type === 'dashboard' ? 'dashboard' : p.type === 'api' ? 'api' : 'language'}
                      size={13}
                      color={p.status === 'active' ? Colors.gold : Colors.textSecondary}
                    />
                  </View>
                  <View>
                    <Text style={styles.portfolioName} numberOfLines={1}>{p.name}</Text>
                    <Text style={styles.portfolioTypeLabel}>{p.type.toUpperCase()}</Text>
                  </View>
                </View>
                <View style={[styles.portfolioStatus, {
                  backgroundColor: p.status === 'active' ? Colors.goldGlass : Colors.glass,
                  borderColor: p.status === 'active' ? Colors.goldGlassBorder : Colors.glassBorder,
                }]}>
                  <Text style={[styles.portfolioStatusText, { color: p.status === 'active' ? Colors.gold : Colors.textMuted }]}>
                    {p.status.toUpperCase()}
                  </Text>
                </View>
              </View>
            ))}
          </GlassCard>
        </View>

        <View style={{ height: 32 }} />
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
  headerSub: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },

  section: { paddingHorizontal: Spacing.md, marginTop: Spacing.lg },
  sectionLabel: {
    fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '700',
    letterSpacing: 1.2, marginBottom: Spacing.sm,
  },

  avatarContainer: { alignItems: 'center', marginBottom: Spacing.md },
  avatarRing: {
    width: 88, height: 88, borderRadius: 44,
    borderWidth: 2, borderColor: Colors.gold,
    padding: 4, justifyContent: 'center', alignItems: 'center',
  },
  avatarCore: {
    width: 76, height: 76, borderRadius: 38,
    backgroundColor: Colors.goldGlass, justifyContent: 'center', alignItems: 'center',
  },
  avatarInitial: { fontSize: FontSize.xl, fontWeight: FontWeight.extrabold, color: Colors.gold },
  identityBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: Spacing.sm, paddingVertical: 3,
    backgroundColor: Colors.goldGlass, borderRadius: Radius.full,
    borderWidth: 1, borderColor: Colors.goldGlassBorder, marginTop: Spacing.sm,
  },
  identityBadgeText: { fontSize: FontSize.xs, color: Colors.gold, fontWeight: '700', letterSpacing: 0.8 },
  identityName: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.textPrimary, textAlign: 'center', marginTop: 4 },
  identityTitle: { fontSize: FontSize.md, color: Colors.gold, textAlign: 'center', fontWeight: '600', marginTop: 2 },
  identityRole: { fontSize: FontSize.sm, color: Colors.textSecondary, textAlign: 'center', marginTop: 2 },
  identityCompany: { fontSize: FontSize.sm, color: Colors.textMuted, textAlign: 'center', marginTop: 2, letterSpacing: 0.3 },
  taglineWrap: {
    marginTop: Spacing.md, paddingTop: Spacing.sm,
    borderTopWidth: 1, borderTopColor: Colors.goldGlassBorder,
  },
  taglineText: {
    fontSize: FontSize.sm, color: Colors.textSecondary, textAlign: 'center',
    fontStyle: 'italic', lineHeight: 20,
  },

  contactRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.sm },
  contactRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.glassBorder },
  contactIcon: {
    width: 32, height: 32, borderRadius: Radius.sm,
    backgroundColor: Colors.goldGlass, borderWidth: 1, borderColor: Colors.goldGlassBorder,
    justifyContent: 'center', alignItems: 'center',
  },
  contactText: { flex: 1 },
  contactLabel: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '600', letterSpacing: 0.4 },
  contactValue: { fontSize: FontSize.sm, color: Colors.textPrimary, fontWeight: '500', marginTop: 1 },

  socialGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  socialCard: { width: '31%', alignItems: 'center', gap: 4 },
  socialLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, fontWeight: '600', textAlign: 'center' },

  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  metricCard: { width: '48%', alignItems: 'center' },
  metricValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, marginTop: 6, marginBottom: 2 },
  metricLabel: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '600', letterSpacing: 0.6, textAlign: 'center' },

  substrateHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  substrateTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  substrateDesc: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20, marginBottom: Spacing.md },
  substrateCompare: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  substrateBox: {
    flex: 1, borderRadius: Radius.md, padding: Spacing.sm,
    borderWidth: 1, alignItems: 'center',
  },
  substrateBad: {
    backgroundColor: 'rgba(255,77,106,0.06)',
    borderColor: 'rgba(255,77,106,0.2)',
  },
  substrateGood: {
    backgroundColor: Colors.blueGlass,
    borderColor: Colors.blueGlassBorder,
  },
  substrateBoxLabel: { fontSize: FontSize.xs, color: Colors.error, fontWeight: '700', letterSpacing: 0.4, textAlign: 'center', marginBottom: 4 },
  substrateBoxVal: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.error },
  substrateBoxTag: { fontSize: FontSize.xs, color: Colors.error, fontWeight: '600', marginTop: 2 },
  substrateBoxNote: { fontSize: FontSize.xs, color: Colors.textMuted, textAlign: 'center', marginTop: 4, lineHeight: 15 },
  anchorNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 6,
    paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.blueGlassBorder,
  },
  anchorNoteText: { flex: 1, fontSize: FontSize.xs, color: Colors.textSecondary, lineHeight: 17 },

  archRow: { marginBottom: Spacing.sm, flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  archIndex: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.goldGlass, borderWidth: 1, borderColor: Colors.goldGlassBorder,
    justifyContent: 'center', alignItems: 'center',
  },
  archIndexText: { fontSize: FontSize.sm, fontWeight: '800', color: Colors.gold },
  archInfo: { flex: 1 },
  archName: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  archDesc: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 1, lineHeight: 16 },
  archStatus: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  archStatusDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: Colors.gold },
  archStatusText: { fontSize: FontSize.xs, color: Colors.gold, fontWeight: '700' },

  portfolioRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: Spacing.sm },
  portfolioRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.glassBorder },
  portfolioLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, flex: 1 },
  portfolioTypeIcon: { width: 30, height: 30, borderRadius: Radius.sm, justifyContent: 'center', alignItems: 'center' },
  portfolioName: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.textPrimary, maxWidth: 160 },
  portfolioTypeLabel: { fontSize: FontSize.xs, color: Colors.textMuted, letterSpacing: 0.5 },
  portfolioStatus: {
    paddingHorizontal: 7, paddingVertical: 3,
    borderRadius: Radius.full, borderWidth: 1,
  },
  portfolioStatusText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.6 },
});
