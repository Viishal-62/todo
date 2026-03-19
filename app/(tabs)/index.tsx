import { createHomeStyles } from "@/assets/styles/home.style";
import Headers from "@/components/Headers";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { colors } = useTheme();

  const todos = useQuery(api.todos.getTodos);

  console.log("todos", todos);

  const homeStyles = createHomeStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <SafeAreaView style={homeStyles.safeArea}>
        <Headers title="Todos" icon="home" progressText={todos?.length} />
        <Text>Welcome to the Home Screen!</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}
