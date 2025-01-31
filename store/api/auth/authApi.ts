import { ApiResponseInterface, UserApiResponseInterface } from '@/interfaces';
import * as SecureStore from 'expo-secure-store';
import { api } from '../api';

export interface LoginBody {
    email: string;
    password: string;
}

export interface SignUpBody {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}

export const authApi = api.injectEndpoints({
    overrideExisting: true, 
    endpoints: (builder) => ({
        login: builder.mutation<UserApiResponseInterface, LoginBody>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: async (response: UserApiResponseInterface) => {
                if (response.data?.token) {
                    const newToken: string = response.data?.token;
                    await SecureStore.setItemAsync('token', newToken);
                }

                return response;
            },
            invalidatesTags: ['user'],
        }),

        signUp: builder.mutation<ApiResponseInterface, SignUpBody>({
            query: (body) => ({
                url: '/auth/sign-up',
                method: 'POST',
                body,
            }),
        }),

        logout: builder.mutation<ApiResponseInterface, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            transformResponse: async (response: ApiResponseInterface) => {
                if (response?.isSuccess) {
                    await SecureStore.deleteItemAsync('token')
                }

                return response;
            },
            invalidatesTags: ['user'],
        }),

        checkAuth: builder.query<UserApiResponseInterface, void>({
            query: () => ({
                url: '/auth/check-auth',
            }),
            providesTags: ['user'],
        }),

    }),
});

export const {
    useLoginMutation,
    useSignUpMutation,
    useLogoutMutation,
    useCheckAuthQuery,
} = authApi;
