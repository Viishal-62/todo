import { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const createHomeStyles = (colors: ColorScheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
      paddingHorizontal: 4,
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 28,
      paddingBottom: 20,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    iconContainer: {
      width: 52,
      height: 52,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 14,
    },
    titleTextContainer: {
      flex: 1,
    },
    title: {
      fontSize: 30,
      fontWeight: "800",
      letterSpacing: -0.8,
      marginBottom: 3,
      color: colors.text,
    },
    subtitle: {
      fontSize: 15,
      fontWeight: "500",
      color: colors.textMuted,
    },
    progressContainer: {
      marginTop: 6,
    },
    progressBarContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
    },
    progressBar: {
      flex: 1,
      height: 10,
      borderRadius: 5,
      overflow: "hidden",
      backgroundColor: colors.border,
    },
    progressFill: {
      height: "100%",
      borderRadius: 5,
    },
    progressText: {
      fontSize: 14,
      fontWeight: "700",
      minWidth: 36,
      textAlign: "right",
      color: colors.success,
    },
    inputSection: {
      paddingHorizontal: 20,
      paddingBottom: 8,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 12,
    },
    filterContainer: {
      flexDirection: "row",
      paddingHorizontal: 20,
      paddingVertical: 10,
      gap: 10,
    },
    filterTab: {
      flex: 1,
    },
    filterTabActive: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 14,
      alignItems: "center",
    },
    filterTabInactive: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 14,
      alignItems: "center",
      borderWidth: 1.5,
    },
    filterTabTextActive: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 14,
    },
    filterTabText: {
      fontWeight: "600",
      fontSize: 14,
    },
    todoList: {
      flex: 1,
    },
    todoListContent: {
      paddingHorizontal: 20,
      paddingBottom: 100,
    },
    emptyListContainer: {
      flexGrow: 1,
      justifyContent: "center",
    },
    todoItemWrapper: {
      marginVertical: 6,
    },
    todoItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 18,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 4,
    },
    checkbox: {
      marginRight: 14,
      marginTop: 2,
    },
    checkboxInner: {
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    todoTextContainer: {
      flex: 1,
    },
    todoText: {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: "500",
      marginBottom: 12,
      color: colors.text,
    },
    todoActions: {
      flexDirection: "row",
      gap: 10,
    },
    actionButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
    },
    editContainer: {
      flex: 1,
    },
    editInput: {
      borderWidth: 2,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 10,
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 12,
      backgroundColor: colors.backgrounds.editInput,
      borderColor: colors.primary,
      color: colors.text,
    },
    editButtons: {
      flexDirection: "row",
      gap: 10,
    },
    editButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 14,
      paddingVertical: 9,
      borderRadius: 10,
    },
    editButtonText: {
      color: "#ffffff",
      fontSize: 13,
      fontWeight: "600",
    },
    emptyContainer: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 60,
    },
    emptyIconContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    emptyText: {
      fontSize: 22,
      fontWeight: "700",
      marginBottom: 6,
      color: colors.text,
    },
    emptySubtext: {
      fontSize: 15,
      textAlign: "center",
      paddingHorizontal: 40,
      lineHeight: 22,
      color: colors.textMuted,
    },
  });

  return styles;
};