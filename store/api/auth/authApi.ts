import { ApiResponseInterface, UserApiResponseInterface, UserInterface } from '@/interfaces';
import * as SecureStore from 'expo-secure-store';
import { api } from '../api';

export interface LoginBody {
    UserNameOrEmail: string;
    Password: string;
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
                if (response.data?.token && response.data?.user) {
                    const newToken: string = response.data?.token;
                    await SecureStore.setItemAsync('token', newToken);

                    const newUser: UserInterface = response.data?.user;
                    await SecureStore.setItemAsync("user", JSON.stringify(newUser));
                }

                return response;
            },
            invalidatesTags: ['user'],
        }),

        logout: builder.mutation<ApiResponseInterface, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            transformResponse: async (response: ApiResponseInterface) => {
                if (response?.isSuccess) {
                    await SecureStore.deleteItemAsync('token')
                    await SecureStore.deleteItemAsync('user')
                }

                return response;
            },
            invalidatesTags: ['user'],
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
} = authApi;
