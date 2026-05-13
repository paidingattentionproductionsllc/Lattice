import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TextInput, Pressable,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';
import { GlassCard } from '@/components/ui/GlassCard';
import { usePlatforms } from '@/hooks/usePlatforms';
import { PLATFORM_TYPES, sovereignResolve } from '@/constants/config';
import type { PlatformType } from '@/contexts/PlatformContext';
import { useAlert } from '@/template';

export default function CreateScreen() {
  const router = useRouter();
  const { addPlatform } = usePlatforms();
  const { showAlert } = useAlert();

  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [selectedType, setSelectedType] = useState<PlatformType>('website');
  const [tagsInput, setTagsInput] = useState('');

  const presence = name.length * 100 + purpose.length * 10;
  const sovereignPreview = sovereignResolve(Math.max(1, presence), 1);

  const handleSpawn = () => {
    if (!name.trim()) {
      showAlert('Missing Name', 'Please provide a platform name');
      return;
    }
    if (!purpose.trim()) {
      showAlert('Missing Purpose', 'Please define the platform purpose');
      return;
    }
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const platform = addPlatform(name.trim(), selectedType, purpose.trim(), tags);
    showAlert('Platform Spawned', `${name} is now building across all architecture layers.`, [
      { text: 'View Platform', onPress: () => router.push(`/platform/${platform.id}`) },
      { text: 'Back to Hub', style: 'cancel', onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* Nav */}
        <View style={styles.nav}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.6 : 1 }]}
          >
            <MaterialIcons name="arrow-back" size={22} color={Colors.textPrimary} />
          </Pressable>
          <Text style={styles.navTitle}>SPAWN PLATFORM</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* Sovereign Preview */}
          <View style={styles.section}>
            <GlassCard variant="gold" padding={Spacing.md}>
              <View style={styles.previewRow}>
                <View>
                  <Text style={styles.previewLabel}>PRESENCE</Text>
                  <Text style={styles.previewValue}>{presence.toLocaleString()}</Text>
                </View>
                <MaterialIcons name="auto-awesome" size={18} color={Colors.gold} />
                <View style={styles.equalsBlock}>
                  <Text style={styles.previewLabel}>SOVEREIGN</Text>
                  <Text style={[styles.previewValue, { color: Colors.gold }]}>{sovereignPreview.toLocaleString()}</Text>
                </View>
              </View>
              <Text style={styles.previewNote}>
                Presence × Identification (1) = Sovereign Result
              </Text>
            </GlassCard>
          </View>

          {/* Platform Name */}
          <View style={styles.section}>
            <Text style={styles.fieldLabel}>PLATFORM NAME</Text>
            <View style={styles.inputWrap}>
              <MaterialIcons name="label" size={18} color={Colors.textMuted} />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="e.g. Sovereign Media Hub"
                placeholderTextColor={Colors.textMuted}
                maxLength={60}
              />
            </View>
          </View>

          {/* Purpose */}
          <View style={styles.section}>
            <Text style={styles.fieldLabel}>PURPOSE</Text>
            <TextInput
              style={styles.textarea}
              value={purpose}
              onChangeText={setPurpose}
              placeholder="Describe the platform's core function and target audience..."
              placeholderTextColor={Colors.textMuted}
              multiline
              numberOfLines={4}
              maxLength={300}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{purpose.length}/300</Text>
          </View>

          {/* Platform Type */}
          <View style={styles.section}>
            <Text style={styles.fieldLabel}>PLATFORM TYPE</Text>
            <View style={styles.typeGrid}>
              {PLATFORM_TYPES.map(type => (
                <Pressable
                  key={type.id}
                  onPress={() => setSelectedType(type.id as PlatformType)}
                  style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
                >
                  <GlassCard
                    style={styles.typeCard}
                    variant={selectedType === type.id ? 'gold' : 'default'}
                    padding={Spacing.md}
                  >
                    <MaterialIcons
                      name={type.icon as any}
                      size={24}
                      color={selectedType === type.id ? Colors.gold : Colors.textMuted}
                    />
                    <Text style={[styles.typeLabel, selectedType === type.id && { color: Colors.gold }]}>
                      {type.label}
                    </Text>
                    <Text style={styles.typeDesc} numberOfLines={2}>{type.description}</Text>
                    {selectedType === type.id && (
                      <View style={styles.typeCheck}>
                        <MaterialIcons name="check-circle" size={14} color={Colors.gold} />
                      </View>
                    )}
                  </GlassCard>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Tags */}
          <View style={styles.section}>
            <Text style={styles.fieldLabel}>TAGS (comma-separated)</Text>
            <View style={styles.inputWrap}>
              <MaterialIcons name="local-offer" size={18} color={Colors.textMuted} />
              <TextInput
                style={styles.input}
                value={tagsInput}
                onChangeText={setTagsInput}
                placeholder="identity, video, sovereign..."
                placeholderTextColor={Colors.textMuted}
              />
            </View>
          </View>

          {/* Architecture Preview */}
          <View style={styles.section}>
            <Text style={styles.fieldLabel}>AUTO-ASSIGNED ARCHITECTURE</Text>
            <GlassCard variant="blue" padding={Spacing.md}>
              <View style={styles.archPreviewRow}>
                {['Mind', 'Body', 'Quintessence', 'Amalgamation'].map((layer, i) => (
                  <View key={layer} style={styles.archPreviewItem}>
                    <View style={styles.archPreviewDot}>
                      <Text style={styles.archPreviewIndex}>{i}</Text>
                    </View>
                    <Text style={styles.archPreviewLabel}>{layer}</Text>
                  </View>
                ))}
              </View>
            </GlassCard>
          </View>

          {/* Spawn Button */}
          <View style={[styles.section, { marginBottom: Spacing.xxl }]}>
            <Pressable
              onPress={handleSpawn}
              style={({ pressed }) => [styles.spawnBtn, { opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }]}
            >
              <MaterialIcons name="rocket-launch" size={22} color={Colors.bg} />
              <Text style={styles.spawnBtnText}>SPAWN PLATFORM</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  nav: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder,
  },
  backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  navTitle: { fontSize: FontSize.sm, fontWeight: '800', color: Colors.textPrimary, letterSpacing: 1.5 },

  scroll: { flex: 1 },
  section: { paddingHorizontal: Spacing.md, marginTop: Spacing.lg },
  fieldLabel: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '700', letterSpacing: 1.2, marginBottom: Spacing.sm },

  previewRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  equalsBlock: { alignItems: 'flex-end' },
  previewLabel: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '600', letterSpacing: 0.8 },
  previewValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  previewNote: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: Spacing.sm, textAlign: 'center', fontStyle: 'italic' },

  inputWrap: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.glassBorder,
    borderRadius: Radius.md, paddingHorizontal: Spacing.md, height: 48,
  },
  input: { flex: 1, color: Colors.textPrimary, fontSize: FontSize.md },
  textarea: {
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.glassBorder,
    borderRadius: Radius.md, padding: Spacing.md,
    color: Colors.textPrimary, fontSize: FontSize.md, lineHeight: 24, minHeight: 100,
  },
  charCount: { fontSize: FontSize.xs, color: Colors.textMuted, textAlign: 'right', marginTop: 4 },

  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  typeCard: { width: '48%', alignItems: 'center', position: 'relative' },
  typeLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.textPrimary, marginTop: Spacing.sm },
  typeDesc: { fontSize: FontSize.xs, color: Colors.textMuted, textAlign: 'center', marginTop: 3, lineHeight: 16 },
  typeCheck: { position: 'absolute', top: 8, right: 8 },

  archPreviewRow: { flexDirection: 'row', justifyContent: 'space-around' },
  archPreviewItem: { alignItems: 'center', gap: 6 },
  archPreviewDot: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: Colors.blueGlass, borderWidth: 1, borderColor: Colors.blueGlassBorder,
    justifyContent: 'center', alignItems: 'center',
  },
  archPreviewIndex: { fontSize: FontSize.sm, fontWeight: '800', color: Colors.cyan },
  archPreviewLabel: { fontSize: FontSize.xs, color: Colors.textPrimary, fontWeight: '600' },

  spawnBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
    backgroundColor: Colors.gold, height: 56, borderRadius: Radius.lg,
  },
  spawnBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.extrabold, color: Colors.bg, letterSpacing: 1.5 },
});
