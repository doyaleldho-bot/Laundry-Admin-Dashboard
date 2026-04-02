// store/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/axiosInstance";
import { toast } from "react-toastify";

interface AuthState {
  email: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  success?: boolean ;
}

const initialState: AuthState = {
  email: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  success: false,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: { email: string; password: string, latitude: number, longitude: number ,country:string,city:string}, { rejectWithValue }) => {
    try {
           const res = await api.post("/admin/login", payload); 
         toast.success(res.data.message); 
         localStorage.setItem("adm", "true");
           return { email: payload.email, success: true };
    } catch (err: any) {
              toast.error(err.response?.data?.message || "Login failed");
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.email = null;
      state.isLoggedIn = false;
      state.success=false;

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
        state.isLoggedIn = true;
        state.success = action.payload.success; ;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;