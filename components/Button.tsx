import useTheme from "@/hooks/useTheme";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

interface ButtonProps {
  handleSubmit: () => void;
  loading: boolean;
}

const Button = ({ handleSubmit, loading }: ButtonProps) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={handleSubmit}
      disabled={loading}
      style={({ pressed }) => [
        pressed && { opacity: 0.85, transform: [{ scale: 0.95 }] },
        loading && styles.disabled,
      ]}
    >
      <LinearGradient
        colors={colors.gradients.primary}
        style={styles.button}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <FontAwesome name="plus" size={20} color="#fff" />
        )}
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
