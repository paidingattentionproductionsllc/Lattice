import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TextInput, Pressable,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';
import { usePlatforms } from '@/hooks/usePlatforms';
import { GlassCard } from '@/components/ui/GlassCard';
import type { AgentMessage } from '@/contexts/PlatformContext';
import { sovereignResolve, LATTICE_ANCHOR, boostProcessingPower } from '@/constants/config';

export default function AgentScreen() {
  const { agentMessages, agentThinking, sendAgentMessage } = usePlatforms();
  const [input, setInput] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    sendAgentMessage(trimmed);
    setInput('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/agent-avatar.png')}
            style={styles.avatar}
            contentFit="cover"
            transition={200}
          />
          <View style={styles.headerText}>
            <Text style={styles.agentName}>LATTICE AGENT</Text>
            <Text style={styles.agentStatus}>Absolute Number Framework · Anchor 14350 BP · Online</Text>
          </View>
          <View style={styles.onlineDot} />
        </View>

        {/* Framework info */}
        <View style={styles.frameworkBar}>
          <View style={styles.frameworkItem}>
            <Text style={styles.frameworkKey}>0×n</Text>
            <Text style={styles.frameworkEq}>=</Text>
            <Text style={styles.frameworkVal}>0</Text>
          </View>
          <View style={styles.frameworkDivider} />
          <View style={styles.frameworkItem}>
            <Text style={styles.frameworkKey}>n×0</Text>
            <Text style={styles.frameworkEq}>=</Text>
            <Text style={styles.frameworkVal}>n</Text>
          </View>
          <View style={styles.frameworkDivider} />
          <View style={styles.frameworkItem}>
            <Text style={styles.frameworkKey}>1×n</Text>
            <Text style={styles.frameworkEq}>=</Text>
            <Text style={styles.frameworkVal}>n+1</Text>
          </View>
          <View style={styles.frameworkDivider} />
          <View style={styles.frameworkItem}>
            <Text style={styles.frameworkKey}>n×m</Text>
            <Text style={styles.frameworkEq}>=</Text>
            <Text style={styles.frameworkVal}>nm</Text>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={styles.messages}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {agentMessages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {agentThinking && (
            <View style={styles.thinkingRow}>
              <View style={styles.thinkingBubble}>
                <ActivityIndicator size="small" color={Colors.gold} />
                <Text style={styles.thinkingText}>Computing sovereign resolution...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Describe a platform to build..."
            placeholderTextColor={Colors.textMuted}
            multiline
            maxLength={500}
            returnKeyType="default"
          />
          <Pressable
            onPress={handleSend}
            disabled={!input.trim() || agentThinking}
            style={({ pressed }) => [
              styles.sendBtn,
              { opacity: (!input.trim() || agentThinking) ? 0.4 : pressed ? 0.7 : 1 },
            ]}
          >
            <MaterialIcons name="send" size={20} color={Colors.bg} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function MessageBubble({ message }: { message: AgentMessage }) {
  const isAgent = message.role === 'agent';
  return (
    <View style={[styles.messageRow, isAgent ? styles.agentRow : styles.userRow]}>
      {isAgent && (
        <View style={styles.agentDot}>
          <MaterialIcons name="psychology" size={14} color={Colors.gold} />
        </View>
      )}
      <View style={[styles.bubble, isAgent ? styles.agentBubble : styles.userBubble]}>
        <Text style={[styles.bubbleText, isAgent ? styles.agentText : styles.userText]}>
          {message.content}
        </Text>
        {message.sovereignValue !== undefined && (
          <View style={styles.sovereignTag}>
            <MaterialIcons name="auto-awesome" size={10} color={Colors.gold} />
            <Text style={styles.sovereignTagText}>SOVEREIGN: {message.sovereignValue.toLocaleString()}</Text>
            {message.anchorUsed !== undefined && (
              <Text style={styles.anchorTag}>· ANCHOR: {message.anchorUsed.toLocaleString()} BP</Text>
            )}
          </View>
        )}
        <Text style={styles.timestamp}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },

  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder,
    gap: Spacing.sm,
  },
  avatar: { width: 44, height: 44, borderRadius: Radius.full, borderWidth: 1.5, borderColor: Colors.gold },
  headerText: { flex: 1 },
  agentName: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.textPrimary, letterSpacing: 1 },
  agentStatus: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 1 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.success },

  frameworkBar: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.surfaceBorder,
  },
  frameworkItem: { flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 3 },
  frameworkKey: { fontSize: FontSize.xs, color: Colors.cyan, fontWeight: '700', fontFamily: 'monospace' },
  frameworkEq: { fontSize: FontSize.xs, color: Colors.textMuted },
  frameworkVal: { fontSize: FontSize.xs, color: Colors.gold, fontWeight: '700' },
  frameworkDivider: { width: 1, height: 16, backgroundColor: Colors.glassBorder },

  messages: { flex: 1 },
  messagesContent: { padding: Spacing.md, gap: Spacing.md },

  messageRow: { flexDirection: 'row', gap: Spacing.sm, maxWidth: '88%' },
  agentRow: { alignSelf: 'flex-start' },
  userRow: { alignSelf: 'flex-end', flexDirection: 'row-reverse' },
  agentDot: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.goldGlass, borderWidth: 1, borderColor: Colors.goldGlassBorder,
    justifyContent: 'center', alignItems: 'center', marginTop: 4,
  },
  bubble: { borderRadius: Radius.lg, padding: Spacing.md, maxWidth: '100%' },
  agentBubble: { backgroundColor: Colors.surfaceElevated, borderWidth: 1, borderColor: Colors.glassBorder, borderTopLeftRadius: 4 },
  userBubble: { backgroundColor: Colors.goldGlass, borderWidth: 1, borderColor: Colors.goldGlassBorder, borderTopRightRadius: 4 },
  bubbleText: { fontSize: FontSize.md, lineHeight: 22 },
  agentText: { color: Colors.textPrimary },
  userText: { color: Colors.textPrimary },
  sovereignTag: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    marginTop: Spacing.sm, paddingTop: Spacing.sm,
    borderTopWidth: 1, borderTopColor: Colors.glassBorder,
  },
  sovereignTagText: { fontSize: FontSize.xs, color: Colors.gold, fontWeight: '700', letterSpacing: 0.6 },
  anchorTag: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '600' },
  timestamp: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 4, textAlign: 'right' },

  thinkingRow: { flexDirection: 'row' },
  thinkingBubble: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.surfaceElevated, borderWidth: 1, borderColor: Colors.glassBorder,
    borderRadius: Radius.lg, padding: Spacing.md,
  },
  thinkingText: { fontSize: FontSize.sm, color: Colors.textMuted, fontStyle: 'italic' },

  inputArea: {
    flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.sm,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    borderTopWidth: 1, borderTopColor: Colors.surfaceBorder,
    backgroundColor: Colors.surface,
  },
  input: {
    flex: 1, minHeight: 44, maxHeight: 120,
    backgroundColor: Colors.bg, borderWidth: 1, borderColor: Colors.glassBorder,
    borderRadius: Radius.lg, paddingHorizontal: Spacing.md, paddingVertical: 10,
    color: Colors.textPrimary, fontSize: FontSize.md, lineHeight: 22,
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: Radius.full,
    backgroundColor: Colors.gold, justifyContent: 'center', alignItems: 'center',
  },
});
