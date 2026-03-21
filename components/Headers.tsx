import useTheme from "@/hooks/useTheme";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { createHomeStyles } from "@/assets/styles/home.style";

interface HeaderProps {
  title: string;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  totalTodos?: number;
  completedTodos?: number;
}

const Headers = ({ title, icon, totalTodos = 0, completedTodos = 0 }: HeaderProps) => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  const progress = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.iconContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <FontAwesome name={icon} size={24} color="#fff" />
        </LinearGradient>
        <View style={styles.titleTextContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            {totalTodos === 0
              ? "No tasks yet"
              : `${completedTodos} of ${totalTodos} completed`}
          </Text>
        </View>
      </View>

      {totalTodos > 0 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={colors.gradients.success}
                style={[styles.progressFill, { width: `${progress}%` }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(progress)}%
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Headers;
