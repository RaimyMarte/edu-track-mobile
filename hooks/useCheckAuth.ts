import { useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { useAuthStore } from "./useAuthStore";

export const useCheckAuth = () => {
  const segments = useSegments();
  const router = useRouter();

  const { status, handleLoginState, handleLogoutState } = useAuthStore();

  const checkAuth = async () => {
    try {
      const userStored = await SecureStore.getItemAsync("user");

      if (userStored) {
        const user = JSON.parse(userStored);
        handleLoginState(user);
      } else {
        handleLogoutState();
      }
    } catch (error) {
      console.error("Error reading user from SecureStore:", error);
      handleLogoutState();
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (status === "checking") return;

    const inAuthGroup = segments[0] === "(protected)";

    if (status === "authenticated") {
      router.replace("/(protected)");
    } else if (status === "unauthenticated" && inAuthGroup) {
      router.replace("/");
    }
  }, [status]);
};
