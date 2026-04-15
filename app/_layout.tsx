import { useColorScheme } from '@/hooks/use-color-scheme';
import { queryClient } from "@/lib/queryClient";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, Portal } from 'react-native-paper';
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const colorScheme = useColorScheme();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <Portal.Host>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack
              screenOptions={{
                headerShown: false,
                headerTitle: "",
                header: () => null,
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
           
            <StatusBar style="auto" />
          </ThemeProvider>
        </QueryClientProvider>
      </Portal.Host>
    </PaperProvider>
  );
}