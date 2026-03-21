import { ThemeProvider } from "@/hooks/useTheme";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

const convexPublicUrl = process.env.EXPO_PUBLIC_CONVEX_URL;

let convex: ConvexReactClient | null = null;
if (convexPublicUrl) {
  convex = new ConvexReactClient(convexPublicUrl, {
    unsavedChangesWarning: false,
  });
}

export default function RootLayout() {
  if (!convex) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: "#0f172a" }}>
        <Text style={{ fontSize: 20, fontWeight: "700", color: "#f87171", marginBottom: 12, textAlign: "center" }}>
          ⚠️ Missing Configuration
        </Text>
        <Text style={{ fontSize: 14, color: "#94a3b8", textAlign: "center", lineHeight: 22 }}>
          EXPO_PUBLIC_CONVEX_URL is not set.{"\n\n"}
          For local dev: check your .env.local file{"\n"}
          For APK builds: set it on expo.dev dashboard
        </Text>
      </View>
    );
  }

  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </ConvexProvider>
  );
}
