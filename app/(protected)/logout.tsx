import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import { Dialog, Portal, Paragraph } from "react-native-paper"; // Dialog from react-native-paper
import { useAuthStore } from "@/hooks/useAuthStore";
import { useLogoutMutation } from "@/store/api/auth/authApi";
import { isMutationSuccessResponse } from "@/utils";
import { useRouter } from "expo-router";
import { Loading } from "@/components/loading/Loading";

export default function LogoutPage() {
  const { handleLogoutState } = useAuthStore();
  const [isDialogVisible, setIsDialogVisible] = useState(true); // Control Dialog visibility
  const [error, setError] = useState<string>("");
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await logout();

      if (isMutationSuccessResponse(response)) {
        const { data: respData } = response;

        if (!respData?.isSuccess) {
          setError(respData?.message || "");
          return;
        }

        handleLogoutState();
        setError("");
        router.replace("/"); // Redirect to the home or login page
      }
    } catch (error) {
      setError(`Ha ocurrido un error: ${error}`);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogVisible(false); // Close dialog without logging out
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setIsDialogVisible(false); // Close dialog after confirming logout
  };

  if (logoutLoading) {
    return <Loading message="Logging out..." />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Dialog for logout confirmation */}
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={handleCloseDialog}>
          <Dialog.Title>Confirm Logout</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to log out?</Paragraph>
            {error && (
              <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button title="Cancel" onPress={handleCloseDialog} />
            <Button title="Logout" onPress={handleConfirmLogout} />
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
