import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN_KEY = "token";

const saveTokenWithFallback = async (token: string) => {
  if (Platform.OS === "web") {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    return;
  }

  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  }
};

const getTokenWithFallback = async () => {
  if (Platform.OS === "web") {
    return await AsyncStorage.getItem(TOKEN_KEY);
  }

  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch {
    return await AsyncStorage.getItem(TOKEN_KEY);
  }
};

const StorageService = {
  async saveToken(token: string) {
    await saveTokenWithFallback(token);
  },

  async getToken() {
    return await getTokenWithFallback();
  },

  async saveUser(user: any) {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  },
};

export default StorageService;
