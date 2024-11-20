import {useState} from "react";
import axios from "axios";
import {useAuthStore} from "../store/useAuthStore";

const API_URL = "http://localhost:8000/v1/auth/vendor";

type Response = {
  message: string;
  token: string;
  vendor: {
    vendor_id: string;
    name: string;
    email: string;
  };
};

type UseLoginInput = {
  email: string;
  password: string;
};

type SetLogin = (input: UseLoginInput) => Promise<void>;

async function login(input: UseLoginInput): Promise<Response> {
  try {
    const response = await axios.post<Response>(`${API_URL}/login`, {
      email: input.email,
      password: input.password,
    });

    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.log(error);
    const err = error as Error;
    throw new Error(err.message);
  }
}

export function useLogin(): {
  setLogin: SetLogin;
  isLoading: boolean;
  error: string | null;
  loginState: Response | null;
} {
  const [loginState, setLoginState] = useState<Response | null>(null);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const {setAccessToken, setUserState} = useAuthStore();

  const userLogin = async (input: UseLoginInput): Promise<void> => {
    setLoadingState(true);
    try {
      const response = await login(input);
      setAccessToken(response.token);
      setUserState({
        user_id: response.vendor.vendor_id,
        name: response.vendor.name,
      });
      setLoginState(response);

      setErrorState(null);
    } catch (error) {
      setErrorState((error as Error).message);
    } finally {
      setLoadingState(false);
    }
  };

  return {
    setLogin: userLogin,
    isLoading: loadingState,
    error: errorState,
    loginState,
  };
}

type UseSignupInput = {
  name: string;
  email: string;
  password: string;
};

type SetSignup = (input: UseSignupInput) => Promise<void>;

async function signup(input: UseSignupInput): Promise<Response> {
  try {
    const response = await axios.post<Response>(`${API_URL}/signup`, {
      name: input.name,
      email: input.email,
      password: input.password,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.log(error);
    const err = error as Error;
    throw new Error(err.message);
  }
}

export function useSignup(): {
  setSignup: SetSignup;
  isLoading: boolean;
  error: string | null;
  signupState: Response | null;
} {
  const [signupState, setSignupState] = useState<Response | null>(null);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const {setAccessToken, setUserState} = useAuthStore();

  const userSingup = async (input: UseSignupInput): Promise<void> => {
    setLoadingState(true);
    try {
      const response = await signup(input);
      setAccessToken(response.token);
      setSignupState(response);
      setUserState({
        user_id: response.vendor.vendor_id,
        name: response.vendor.name,
      });

      setErrorState(null);
    } catch (error) {
      setErrorState((error as Error).message);
    } finally {
      setLoadingState(false);
    }
  };

  return {
    setSignup: userSingup,
    isLoading: loadingState,
    error: errorState,
    signupState,
  };
}
