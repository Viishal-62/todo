import { createHomeStyles } from "@/assets/styles/home.style";
import ShowAllTodos from "@/components/AllTodos";
import Button from "@/components/Button";
import Headers from "@/components/Headers";
import InputField from "@/components/InputFields";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { colors, isDarkMode } = useTheme();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const addTodo = useMutation(api.todos.addTodo);

  async function handleSubmit() {
    if (!title.trim()) {
      return;
    }
    try {
      setLoading(true);
      await addTodo({ title: title.trim() });
      setTitle("");
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  }

  const todos = useQuery(api.todos.getTodos);
  const completedTodos = useQuery(api.todos.getCompletedTodos);

  const homeStyles = createHomeStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Headers
          title="My Todos"
          icon="check-square-o"
          totalTodos={todos?.length ?? 0}
          completedTodos={completedTodos?.length ?? 0}
        />

        <View style={homeStyles.inputSection}>
          <View style={homeStyles.inputWrapper}>
            <InputField
              title={title}
              onChangeText={setTitle}
              onSubmit={handleSubmit}
            />
            <Button handleSubmit={handleSubmit} loading={loading} />
          </View>
        </View>

        <ShowAllTodos />
      </SafeAreaView>
    </LinearGradient>
  );
}
