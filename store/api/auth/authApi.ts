import { ApiResponseInterface, UserApiResponseInterface } from '@/interfaces';
import EncryptedStorage from 'react-native-encrypted-storage';
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
                    await EncryptedStorage.setItem('token', newToken);
                }

                return response;
            },
            invalidatesTags: ['user', 'tasks'],
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
                    await EncryptedStorage.removeItem('token')
                }

                return response;
            },
            invalidatesTags: ['user', 'tasks'],
        }),

        checkAuth: builder.query<UserApiResponseInterface, void>({
            query: () => ({
                url: '/auth/check-auth',
            }),
            providesTags: ['user', 'tasks'],
        }),

    }),
});

export const {
    useLoginMutation,
    useSignUpMutation,
    useLogoutMutation,
    useCheckAuthQuery,
} = authApi;
