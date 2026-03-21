import { createSettingsStyles } from "@/assets/styles/settings.styles";
import ConfirmModal from "@/components/ConfirmModal";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { FontAwesome } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ModalType = "clearCompleted" | "clearAll" | null;

const Settings = () => {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const styles = createSettingsStyles(colors);

  const clearCompleted = useMutation(api.todos.clearCompletedTodos);
  const clearAll = useMutation(api.todos.deleteALlTodos);
  const todos = useQuery(api.todos.getTodos);
  const completedTodos = useQuery(api.todos.getCompletedTodos);

  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleConfirm = async () => {
    try {
      if (activeModal === "clearCompleted") {
        await clearCompleted();
      } else if (activeModal === "clearAll") {
        await clearAll();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setActiveModal(null);
    }
  };

  const modalConfig = {
    clearCompleted: {
      title: "Clear Completed",
      message: `Remove ${completedTodos?.length ?? 0} completed todo${(completedTodos?.length ?? 0) !== 1 ? "s" : ""}? This action cannot be undone.`,
      confirmText: "Clear",
      variant: "warning" as const,
      icon: "check-circle" as const,
    },
    clearAll: {
      title: "Clear All Todos",
      message: `Permanently delete all ${todos?.length ?? 0} todo${(todos?.length ?? 0) !== 1 ? "s" : ""}? This action cannot be undone.`,
      confirmText: "Delete All",
      variant: "danger" as const,
      icon: "trash" as const,
    },
  };

  const currentModal = activeModal ? modalConfig[activeModal] : null;

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Customize your experience</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Appearance Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Appearance</Text>
            <LinearGradient
              colors={colors.gradients.surface}
              style={styles.sectionCard}
            >
              <View style={styles.row}>
                <LinearGradient
                  colors={isDarkMode ? ["#6366f1", "#4f46e5"] : ["#f59e0b", "#d97706"]}
                  style={styles.rowIconContainer}
                >
                  <FontAwesome
                    name={isDarkMode ? "moon-o" : "sun-o"}
                    size={16}
                    color="#fff"
                  />
                </LinearGradient>
                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowTitle}>
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                  </Text>
                  <Text style={styles.rowSubtitle}>
                    {isDarkMode
                      ? "Switch to light theme"
                      : "Switch to dark theme"}
                  </Text>
                </View>
                <Pressable onPress={toggleDarkMode}>
                  {isDarkMode ? (
                    <LinearGradient
                      colors={colors.gradients.primary}
                      style={[styles.toggleTrack, styles.toggleTrackActive]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <View style={styles.toggleThumb} />
                    </LinearGradient>
                  ) : (
                    <View style={[styles.toggleTrack, styles.toggleTrackInactive]}>
                      <View style={styles.toggleThumb} />
                    </View>
                  )}
                </Pressable>
              </View>
            </LinearGradient>
          </View>

          {/* Data Management Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data Management</Text>
            <LinearGradient
              colors={colors.gradients.surface}
              style={styles.sectionCard}
            >
              <Pressable
                onPress={() => {
                  if (completedTodos?.length) setActiveModal("clearCompleted");
                }}
                style={({ pressed }) => [
                  styles.row,
                  styles.rowBorder,
                  pressed && { opacity: 0.7 },
                ]}
              >
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={styles.rowIconContainer}
                >
                  <FontAwesome name="check-circle" size={16} color="#fff" />
                </LinearGradient>
                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowTitle}>Clear Completed</Text>
                  <Text style={styles.rowSubtitle}>
                    Remove {completedTodos?.length ?? 0} completed todo{(completedTodos?.length ?? 0) !== 1 ? "s" : ""}
                  </Text>
                </View>
                <FontAwesome name="chevron-right" size={12} color={colors.textMuted} />
              </Pressable>

              <Pressable
                onPress={() => {
                  if (todos?.length) setActiveModal("clearAll");
                }}
                style={({ pressed }) => [
                  styles.dangerRow,
                  pressed && { opacity: 0.7 },
                ]}
              >
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={styles.rowIconContainer}
                >
                  <FontAwesome name="trash" size={16} color="#fff" />
                </LinearGradient>
                <View style={[styles.rowTextContainer, { marginLeft: 14 }]}>
                  <Text style={styles.dangerText}>Clear All Todos</Text>
                  <Text style={styles.rowSubtitle}>
                    Delete all {todos?.length ?? 0} todo{(todos?.length ?? 0) !== 1 ? "s" : ""} permanently
                  </Text>
                </View>
                <FontAwesome name="chevron-right" size={12} color={colors.textMuted} />
              </Pressable>
            </LinearGradient>
          </View>

          {/* Stats Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Statistics</Text>
            <LinearGradient
              colors={colors.gradients.surface}
              style={styles.sectionCard}
            >
              <View style={[styles.row, styles.rowBorder]}>
                <LinearGradient
                  colors={colors.gradients.primary}
                  style={styles.rowIconContainer}
                >
                  <FontAwesome name="list" size={14} color="#fff" />
                </LinearGradient>
                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowTitle}>Total Todos</Text>
                </View>
                <Text style={[styles.rowTitle, { color: colors.primary }]}>
                  {todos?.length ?? 0}
                </Text>
              </View>

              <View style={[styles.row, styles.rowBorder]}>
                <LinearGradient
                  colors={colors.gradients.success}
                  style={styles.rowIconContainer}
                >
                  <FontAwesome name="check" size={14} color="#fff" />
                </LinearGradient>
                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowTitle}>Completed</Text>
                </View>
                <Text style={[styles.rowTitle, { color: colors.success }]}>
                  {completedTodos?.length ?? 0}
                </Text>
              </View>

              <View style={styles.row}>
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={styles.rowIconContainer}
                >
                  <FontAwesome name="clock-o" size={14} color="#fff" />
                </LinearGradient>
                <View style={styles.rowTextContainer}>
                  <Text style={styles.rowTitle}>Remaining</Text>
                </View>
                <Text style={[styles.rowTitle, { color: colors.warning }]}>
                  {(todos?.length ?? 0) - (completedTodos?.length ?? 0)}
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <LinearGradient
              colors={colors.gradients.surface}
              style={[styles.sectionCard, { overflow: "visible" }]}
            >
              <View style={styles.aboutContainer}>
                <LinearGradient
                  colors={colors.gradients.primary}
                  style={styles.aboutIconContainer}
                >
                  <FontAwesome name="check-square-o" size={28} color="#fff" />
                </LinearGradient>
                <Text style={styles.aboutAppName}>Todo App</Text>
                <Text style={styles.aboutVersion}>Version 1.0.0</Text>
                <Text style={styles.aboutTagline}>
                  Built with React Native, Expo & Convex
                </Text>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>

      {currentModal && (
        <ConfirmModal
          visible={!!activeModal}
          title={currentModal.title}
          message={currentModal.message}
          confirmText={currentModal.confirmText}
          cancelText="Cancel"
          variant={currentModal.variant}
          icon={currentModal.icon}
          onConfirm={handleConfirm}
          onCancel={() => setActiveModal(null)}
        />
      )}
    </LinearGradient>
  );
};

export default Settings;
