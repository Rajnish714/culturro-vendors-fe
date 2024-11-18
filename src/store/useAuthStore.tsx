import {create} from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8000/v1/auth/vendor";

interface AuthStore {
  token: string | null;
  loading: boolean;
  error: string | null;
  setAccessToken: (token: string) => void;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set: any, get: any) => ({
  token: null,
  loading: false,
  error: null,
  setAccessToken: (token: string) => {
    set({token: token, loading: false});
  },
  signup: async (email: string, password: string) => {
    set({loading: true});
    try {
      const response = await axios.post(`${API_URL}/signup`, {email, password});
      set({token: response.data.token, loading: false});
      localStorage.setItem("token", response.data.token);
    } catch (error: any) {
      set({error: error.message, loading: false});
    }
  },
  logout: () => {
    set({token: null});
    localStorage.removeItem("token");
  },
}));
