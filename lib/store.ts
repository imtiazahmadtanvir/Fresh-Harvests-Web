import { configureStore } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define the API slice
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com",
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if available
      const token = (getState() as RootState).auth?.token
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["Product", "User", "Order"],
  endpoints: (builder) => ({
    // Products
    getProducts: builder.query<any[], void>({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    getProduct: builder.query<any, string>({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    // Auth
    login: builder.mutation<any, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<any, { name: string; email: string; password: string }>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
  }),
})

// Auth slice
const authSlice = {
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    setCredentials: (state: any, action: any) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    logout: (state: any) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
  },
}

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const { useGetProductsQuery, useGetProductQuery, useLoginMutation, useRegisterMutation } = api
