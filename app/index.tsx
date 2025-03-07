import { FormikForm } from '@/components/form/FormikForm'
import { useAuthStore } from '@/hooks/useAuthStore'
import { useColorScheme } from '@/hooks/useColorScheme.web'
import { useLoginMutation } from '@/store/api/auth/authApi'
import { isMutationSuccessResponse } from '@/utils'
import { useRouter, useSegments } from 'expo-router'
import { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import * as Yup from "yup";

export default function Login() {
  const { colors } = useTheme();
  const colorScheme = useColorScheme();

  const { status, handleLoginState, handleLogoutState } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  const [error, setError] = useState('');
  const [login, { isLoading: loginLoading }] = useLoginMutation();

  const formFields = [
    {
      name: 'UserName',
      initialValue: '',
      label: 'Email',
      placeholder: 'Email',
      disabled: loginLoading,
      type: 'text',
      validation: Yup.string().required("Username is required"),
    },
    {
      name: 'Password',
      initialValue: '',
      label: 'Password',
      placeholder: 'Password',
      disabled: loginLoading,
      type: 'password',
      validation: Yup.string().required("Password is required"),
    },
  ]


  const onFormSubmit = async (data: any) => {
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

        setError('');
      }
    } catch (error) {
      setError(`Ha ocurrido un error: ${error}`);
    }
  };

  useEffect(() => {
    const inAuthGroup = segments[0] === '(protected)';
    if (status === 'authenticated') {
      router.replace('/(protected)');
    } else if (status === 'unauthenticated' && inAuthGroup) {
      router.replace('/');
    }
  }, [status]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colorScheme === 'light' ? 'light-content' : 'dark-content'} />
      <Text style={[styles.title, { color: 'black' }]}>Login</Text>

      <FormikForm
        fields={formFields}
        buttonLabel="Login"
        onFormSubmit={onFormSubmit}
      />

      {error ? (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      ) : null}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});
