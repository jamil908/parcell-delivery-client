
import { createSlice, type PayloadAction,  } from '@reduxjs/toolkit';
import { setToken, setRefreshToken, removeToken, setUserData, removeUserData, getUserData, getToken } from '@/utils/helpers';
import type { IUser } from '@/types/user.types';

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: getUserData(),
  token: getToken(),
  isAuthenticated: !!getToken(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: IUser; tokens: { accessToken: string; refreshToken: string } }>) => {
      const { user, tokens } = action.payload;
      state.user = user;
      state.token = tokens.accessToken;
      state.isAuthenticated = true;

      // Persist to localStorage
      setToken(tokens.accessToken);
      setRefreshToken(tokens.refreshToken);
      setUserData(user);
    },

    updateUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      setUserData(action.payload);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear localStorage
      removeToken();
      removeUserData();
    },
  },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;

