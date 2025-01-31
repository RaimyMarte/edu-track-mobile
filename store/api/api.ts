import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from 'expo-secure-store';

const apiKey = process.env.EXPO_PUBLIC_API_KEY;
const apiUrl = process.env.EXPO_PUBLIC_API_URL;


export const api = createApi({
  reducerPath: "api",
  tagTypes: ['user'],

  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: async (headers) => {
      headers.set('APIKey', `${apiKey}`)

      const token = await SecureStore.getItemAsync('token');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Content-type', 'application/json');
      }

      return headers
    },
  }),

  endpoints: () => ({

  }),
});