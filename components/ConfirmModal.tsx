import useTheme from "@/hooks/useTheme";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  icon?: React.ComponentProps<typeof FontAwesome>["name"];
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  icon = "exclamation-triangle",
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const { colors } = useTheme();

  const gradientMap = {
    danger: colors.gradients.danger,
    warning: colors.gradients.warning,
    info: colors.gradients.primary,
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.overlayPress} onPress={onCancel} />
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          {/* Icon */}
          <LinearGradient
            colors={gradientMap[variant]}
            style={styles.iconContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <FontAwesome name={icon} size={22} color="#fff" />
          </LinearGradient>

          {/* Text */}
          <Text
            style={[styles.title, { color: colors.text }]}
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text style={[styles.message, { color: colors.textMuted }]}>
            {message}
          </Text>

          {/* Buttons */}
          <View style={styles.buttons}>
            <Pressable
              onPress={onCancel}
              style={({ pressed }) => [
                styles.buttonWrapper,
                pressed && { opacity: 0.8 },
              ]}
            >
              <View
                style={[
                  styles.buttonInner,
                  { backgroundColor: colors.border },
                ]}
              >
                <Text
                  style={[styles.cancelText, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {cancelText}
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              style={({ pressed }) => [
                styles.buttonWrapper,
                pressed && { opacity: 0.85 },
              ]}
            >
              <LinearGradient
                colors={gradientMap[variant]}
                style={styles.buttonInner}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.confirmText} numberOfLines={1}>
                  {confirmText}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 24,
  },
  overlayPress: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    width: "100%",
    maxWidth: 340,
    borderRadius: 22,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    width: "100%",
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 24,
    width: "100%",
    flexShrink: 1,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  buttonWrapper: {
    flex: 1,
  },
  buttonInner: {
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    fontSize: 14,
    fontWeight: "600",
  },
  confirmText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
  },
});

export default ConfirmModal;
