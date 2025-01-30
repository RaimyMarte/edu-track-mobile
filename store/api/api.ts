import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import EncryptedStorage from "react-native-encrypted-storage";

const apiKey = process.env.EXPO_PUBLIC_API_KEY;
const apiUrl = process.env.EXPO_PUBLIC_API_URL;


export const api = createApi({
  reducerPath: "api",
  tagTypes: ['user', 'tasks'],

  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: async (headers) => {
      headers.set('APIKey', `${apiKey}`)

      const token = await EncryptedStorage.getItem('token');

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