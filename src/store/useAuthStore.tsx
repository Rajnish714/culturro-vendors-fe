import {create} from "zustand";

interface AuthStore {
  token: string | null;
  vendor: {user_id: string; name: string} | null;
  loading: boolean;
  error: string | null;
  setAccessToken: (token: string) => void;
  setUserState: (vendor: {user_id: string; name: string}) => void;
  logout: () => void;
  initializeToken: () => void; // Re-including this for consistency
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
  },
  logout: () => {
    set({token: null, vendor: null});
    localStorage.removeItem("token");
  },
  initializeToken: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({token});
    }
  },
}));

// import {create} from "zustand";

// interface AuthStore {
//   token: string | null;
//   vendor: {user_id: string; name: string; email: string} | null;
//   loading: boolean;
//   error: string | null;
//   setAccessToken: (token: string) => void;
//   setUserState: (vendor: {
//     user_id: string;
//     name: string;
//     email: string;
//   }) => void;
//   logout: () => void;
//   // initializeToken: () => void;
// }
// export const useAuthStore = create<AuthStore>((set) => ({
//   token: null,
//   vendor: null,
//   loading: false,
//   error: null,

//   setAccessToken: (token: string) => {
//     console.log("Setting token:", token);
//     set({token: token});
//     localStorage.setItem("token", token);
//   },
//   setUserState: (vendor: {user_id: string; name: string; email: string}) => {
//     console.log("Setting vendor:", vendor);
//     set({vendor: vendor});
//   },
//   logout: () => {
//     set({token: null, vendor: null});
//     localStorage.removeItem("token");
//   },
// }));
//   initializeToken: () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       console.log("Initializing token from local storage:", token);
//       set({token});
//     }
//   },
// }));

// export const useAuthStore = create<AuthStore>((set) => ({
//   token: null,
//   vendor: null,
//   loading: false,
//   error: null,

//   setAccessToken: (token: string) => {
//     console.log("Setting token:", token);
//     set({token: token});
//     localStorage.setItem("token", token);
//   },
//   setUserState: (vendor: {user_id: string; name: string; email: string}) => {
//     console.log("Setting vendor:", vendor);
//     set({vendor: vendor});
//   },
//   logout: () => {
//     set({token: null, vendor: null});
//     localStorage.removeItem("token");
//   },
//   initializeToken: () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       console.log("Initializing token from local storage:", token);
//       set({token});
//     }
//   },
// }));

// import {create} from "zustand";

// interface AuthStore {
//   token: string | null;
//   vendor: {user_id: string; name: string; email: string} | null;
//   loading: boolean;
//   error: string | null;

//   setAccessToken: (token: string) => void;
//   setUserState: (vendor: {
//     user_id: string;
//     name: string;
//     email: string;
//   }) => void;
//   logout: () => void;
//   initializeToken: () => void;
// }

// export const useAuthStore = create<AuthStore>((set) => ({
//   token: null,
//   vendor: null,
//   loading: false,
//   error: null,

//   setAccessToken: (token: string) => {
//     console.log("Setting token:", token); // Debugging log
//     set({token: token});
//     localStorage.setItem("token", token);
//   },
//   setUserState: (vendor: {user_id: string; name: string; email: string}) => {
//     console.log("Setting vendor:", vendor); // Corrected debugging log
//     set({vendor: vendor});
//   },
//   logout: () => {
//     set({token: null});
//     localStorage.removeItem("token");
//   },
//   initializeToken: () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       console.log("Initializing token from local storage:", token); // Debugging log

//       set({token});
//     }
//   },
// }));

// import {create} from "zustand";
// // import axios from "axios";

// // const API_URL = "http://localhost:8000/v1/auth/vendor";

// interface AuthStore {
//   token: string | null;
//   loading: boolean;
//   error: string | null;
//   setAccessToken: (token: string) => void;
//   // signup: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   initializeToken: () => void; // New method to initialize token
// }

// export const useAuthStore = create<AuthStore>((set) => ({
//   token: null,
//   loading: false,
//   error: null,
//   setAccessToken: (token: string) => {
//     set({token: token});
//     localStorage.setItem("token", token);
//   },

//   logout: () => {
//     set({token: null});
//     localStorage.removeItem("token");
//   },
//   initializeToken: () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       set({token});
//     }
//   },
// }));
