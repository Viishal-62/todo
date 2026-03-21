import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createSettingsStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingBottom: 40,
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 28,
      paddingBottom: 12,
    },
    headerTitle: {
      fontSize: 30,
      fontWeight: "800",
      letterSpacing: -0.8,
      color: colors.text,
      marginBottom: 3,
    },
    headerSubtitle: {
      fontSize: 15,
      fontWeight: "500",
      color: colors.textMuted,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 1,
      color: colors.textMuted,
      marginBottom: 10,
      marginLeft: 4,
    },
    sectionCard: {
      borderRadius: 18,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 18,
    },
    rowBorder: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    rowIconContainer: {
      width: 36,
      height: 36,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 14,
    },
    rowTextContainer: {
      flex: 1,
    },
    rowTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.text,
    },
    rowSubtitle: {
      fontSize: 13,
      fontWeight: "400",
      color: colors.textMuted,
      marginTop: 2,
    },
    toggleTrack: {
      width: 52,
      height: 30,
      borderRadius: 15,
      justifyContent: "center",
      padding: 3,
    },
    toggleTrackActive: {
      alignItems: "flex-end",
    },
    toggleTrackInactive: {
      alignItems: "flex-start",
      backgroundColor: colors.border,
    },
    toggleThumb: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
    dangerRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 18,
    },
    dangerText: {
      fontSize: 16,
      fontWeight: "600",
      color: colors.danger,
    },
    aboutContainer: {
      alignItems: "center",
      paddingVertical: 30,
    },
    aboutAppName: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      marginTop: 12,
      marginBottom: 4,
    },
    aboutVersion: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.textMuted,
      marginBottom: 6,
    },
    aboutTagline: {
      fontSize: 13,
      color: colors.textMuted,
      textAlign: "center",
      paddingHorizontal: 40,
      lineHeight: 18,
    },
    aboutIconContainer: {
      width: 64,
      height: 64,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return styles;
};
