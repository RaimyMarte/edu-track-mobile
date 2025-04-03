import { FormikForm } from "@/components/form/FormikForm";
import { Loading } from "@/components/loading/Loading";
import { useAuthStore } from "@/hooks/useAuthStore";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { LoginBody, useLoginMutation } from "@/store/api/auth/authApi";
import { isMutationSuccessResponse } from "@/utils";
import { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import * as Yup from "yup";

export default function LoginPage() {
  const { colors } = useTheme();
  const colorScheme = useColorScheme();

  const { handleLoginState, handleLogoutState, status } = useAuthStore();

  useCheckAuth();

  const [error, setError] = useState("");
  const [login, { isLoading: loginLoading }] = useLoginMutation();

  const formFields = [
    {
      name: "UserNameOrEmail",
      initialValue: "",
      label: "Username or Email",
      placeholder: "Username or Email",
      disabled: loginLoading,
      type: "text",
      validation: Yup.string().required("Username or Email is required"),
    },
    {
      name: "Password",
      initialValue: "",
      label: "Password",
      placeholder: "Password",
      disabled: loginLoading,
      type: "password",
      validation: Yup.string().required("Password is required"),
    },
  ];

  const onFormSubmit = async (data: LoginBody) => {
    try {
      const response = await login(data);

      if (isMutationSuccessResponse(response)) {
        const { data: respData } = response;

        if (!respData?.isSuccess) {
          setError(respData?.message || "");
          handleLogoutState();
          return;
        }

        handleLoginState(respData?.data?.user);

        setError("");
      }
    } catch (error) {
      setError(`Ha ocurrido un error: ${error}`);
    }
  };

  if (status === "checking") {
    return <Loading message="Checking authentication..." />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={colorScheme === "light" ? "light-content" : "dark-content"}
      />

      {loginLoading ? (
        <Loading message="Logging in..." />
      ) : (
        <>
          <Text style={[styles.title, { color: "black" }]}>Login</Text>

          <FormikForm
            fields={formFields}
            buttonLabel="Login"
            onFormSubmit={onFormSubmit}
          />

          {error && (
            <Text style={[styles.errorText, { color: colors.error }]}>
              {error}
            </Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
  },
});
