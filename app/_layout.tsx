import { ThemeProvider } from "@/hooks/useTheme";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";

let convexPublicUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
if (!convexPublicUrl) {
  throw new Error("EXPO_PUBLIC_CONVEX_URL environment variable is not set");
}

let convex = new ConvexReactClient(convexPublicUrl, {
  unsavedChangesWarning: false,
});
export default function RootLayout() {
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
