/**
 * PreferencesView - Local copy embedded directly in the app to avoid
 * production bundle resolution issues with the amogamobileds-v1 package.
 * This is the inline/pane version (no modal wrapper).
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';
import {
  X,
  Bell,
  Lock,
  Moon,
  Volume2,
  Vibrate,
  CheckCircle2,
  Mail,
  Download,
  Cloud,
  ShieldCheck,
  Sliders,
} from 'lucide-react-native';
import { useTheme } from '@/providers/theme-provider';

// ── Embedded preference data ──────────────────────────────────────────────────

export interface PreferenceItem {
  id: string;
  preference: string;
  key: string;
  description: string;
  status: 'Yes' | 'No' | string;
}

const DEFAULT_PREFERENCES: PreferenceItem[] = [
  { id: 'pref_1', preference: 'Push Notifications', key: 'push_notifications', description: 'Receive instant real-time alerts and messages', status: 'Yes' },
  { id: 'pref_2', preference: 'Biometric Face ID Lock', key: 'biometric_face_id_lock', description: 'Require Face ID or biometric scan on launch', status: 'No' },
  { id: 'pref_3', preference: 'Dark Mode Sync', key: 'dark_mode_sync', description: 'Automatically match operating system appearance', status: 'Yes' },
  { id: 'pref_4', preference: 'Sound Effects', key: 'sound_effects', description: 'Play audio feedback for messages and interactions', status: 'Yes' },
  { id: 'pref_5', preference: 'Haptic Feedback', key: 'haptic_feedback', description: 'Vibrate on button taps and gesture completions', status: 'Yes' },
  { id: 'pref_6', preference: 'Read Receipts', key: 'read_receipts', description: 'Allow contacts to see when you have read messages', status: 'No' },
  { id: 'pref_7', preference: 'Email Notifications', key: 'email_notifications', description: 'Receive digest emails for missed mentions and updates', status: 'No' },
  { id: 'pref_8', preference: 'Auto Download Media', key: 'auto_download_media', description: 'Download incoming photos and videos over Wi-Fi', status: 'Yes' },
  { id: 'pref_9', preference: 'Cloud Backup', key: 'cloud_backup', description: 'Automatically sync chat history and assets to cloud', status: 'Yes' },
  { id: 'pref_10', preference: 'Two-Factor Authentication', key: 'two_factor_auth', description: 'Enforce 2FA verification for sign-in on new devices', status: 'No' },
];

const PREFERENCE_ICON_MAP: Record<string, any> = {
  push_notifications: Bell,
  biometric_face_id_lock: Lock,
  dark_mode_sync: Moon,
  sound_effects: Volume2,
  haptic_feedback: Vibrate,
  read_receipts: CheckCircle2,
  email_notifications: Mail,
  auto_download_media: Download,
  cloud_backup: Cloud,
  two_factor_auth: ShieldCheck,
};

// ── PreferencesView ───────────────────────────────────────────────────────────

export interface PreferencesViewProps {
  onClose?: () => void;
  preferences?: PreferenceItem[];
  onPreferenceChange?: (id: string, value: boolean) => void;
  onResetPreferences?: () => void;
  primaryColor?: string;
  style?: any;
  showHeader?: boolean;
  title?: string;
}

export function PreferencesView({
  onClose,
  preferences: controlledPreferences,
  onPreferenceChange,
  onResetPreferences,
  primaryColor,
  style,
  showHeader = true,
  title,
}: PreferencesViewProps) {
  const { colors, resolvedMode } = useTheme();
  const isDark = resolvedMode === 'dark';

  const [localPreferences, setLocalPreferences] = useState<PreferenceItem[]>(DEFAULT_PREFERENCES);
  const currentPreferences = controlledPreferences || localPreferences;

  const handleToggle = (id: string, val: boolean) => {
    if (onPreferenceChange) {
      onPreferenceChange(id, val);
    } else {
      setLocalPreferences((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: val ? 'Yes' : 'No' } : item
        )
      );
    }
  };

  const purpleText = isDark ? '#c084fc' : '#9333ea';
  const textMuted = isDark ? '#94a3b8' : '#71717a';
  const activeTrackColor = '#10b981';
  const activeColor = primaryColor || colors.primary || '#9333ea';
  const cardBg = isDark ? '#1e293b' : '#f8fafc';
  const cardBorder = isDark ? '#334155' : '#e2e8f0';

  return (
    <View style={[styles.viewContainer, { backgroundColor: colors.background }, style]}>
      {/* Top Header Bar */}
      {showHeader && (
        <View style={[styles.viewTopBar, { borderBottomColor: colors.border }]}>
          <Text style={[styles.viewTopBarTitle, { color: colors.foreground }]}>
            {title || 'Preferences'}
          </Text>
          {onClose && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onClose}
              style={styles.viewCloseBtn}
              accessibilityRole="button"
              accessibilityLabel="Close preferences"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <X size={20} color={colors.foreground} />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Preferences List */}
      <ScrollView
        style={styles.viewScroll}
        contentContainerStyle={styles.viewScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Preference Cards */}
        <View style={styles.preferencesList}>
          {currentPreferences.map((item) => {
            const isEnabled = item.status?.toLowerCase() === 'yes';
            const IconComp = PREFERENCE_ICON_MAP[item.key] || Sliders;

            return (
              <View
                key={item.id}
                style={[
                  styles.preferenceCard,
                  { backgroundColor: cardBg, borderColor: cardBorder },
                ]}
              >
                <View style={styles.cardLeft}>
                  <View
                    style={[
                      styles.itemIconBox,
                      {
                        backgroundColor: isEnabled
                          ? `${activeColor}22`
                          : isDark ? '#334155' : '#e2e8f0',
                      },
                    ]}
                  >
                    <IconComp
                      size={18}
                      color={isEnabled ? activeColor : textMuted}
                      strokeWidth={2}
                    />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text
                      style={[styles.preferenceTitle, { color: purpleText }]}
                      numberOfLines={1}
                    >
                      {item.preference}
                    </Text>
                    {item.description ? (
                      <Text
                        style={[styles.preferenceDesc, { color: textMuted }]}
                        numberOfLines={2}
                      >
                        {item.description}
                      </Text>
                    ) : null}
                  </View>
                </View>

                <Switch
                  trackColor={{ false: isDark ? '#334155' : '#cbd5e1', true: activeTrackColor }}
                  thumbColor="#ffffff"
                  ios_backgroundColor={isDark ? '#334155' : '#cbd5e1'}
                  onValueChange={(val) => handleToggle(item.id, val)}
                  value={isEnabled}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  viewTopBar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
  },
  viewTopBarTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Open Sans',
  },
  viewCloseBtn: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewScroll: {
    flex: 1,
  },
  viewScrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
    ...Platform.select({ web: { overflowY: 'auto' } as any }),
  },
  preferencesList: {
    gap: 12,
  },
  preferenceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  itemIconBox: {
    width: 36,
    height: 36,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 14.5,
    fontWeight: '600',
    fontFamily: 'Open Sans',
    letterSpacing: -0.1,
  },
  preferenceDesc: {
    fontSize: 12,
    fontFamily: 'Open Sans',
    marginTop: 2,
    lineHeight: 16,
  },
});
