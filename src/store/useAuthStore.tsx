import {create} from "zustand";

interface AuthStore {
  token: string | null;
  vendor: {user_id: string; name: string} | null;
  loading: boolean;
  error: string | null;
  setAccessToken: (token: string) => void;
  setUserState: (vendor: {user_id: string; name: string}) => void;
  logout: () => void;
  initializeToken: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  vendor: null,
  loading: false,
  error: null,

  setAccessToken: (token: string) => {
    console.log("Setting token:", token);
    set({token: token});
    localStorage.setItem("token", token);
  },
  setUserState: (vendor: {user_id: string; name: string}) => {
    console.log("Setting vendor:", vendor);
    set({vendor: vendor});
    localStorage.setItem("vendor", JSON.stringify(vendor));
  },
  logout: () => {
    set({token: null, vendor: null});
    localStorage.removeItem("token");
    localStorage.removeItem("vendor");
  },
  initializeToken: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({token});
    }
    const vendor = localStorage.getItem("vendor");
    if (vendor) {
      set({vendor: JSON.parse(vendor)});
    }
  },
}));
