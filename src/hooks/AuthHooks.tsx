import {useState} from "react";
import axios from "axios";

import {useAuthStore} from "../store/useAuthStore";

type LoginResponse = {
  message: string;
  token: string;
  vendor: {
    user_id: string;
    name: string;
    email: string;
  };
};
type UseLoginInput = {
  email: string;
  password: string;
};
type SetLogin = (input: UseLoginInput) => Promise<void>;

async function login(input: UseLoginInput): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
      //url has to be fixed
      email: input.email,
      password: input.password,
    });

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
} {
  const [loginState, setLogin] = useState<LoginResponse | null>(null);
  const [errorState, setError] = useState<string | null>(null);
  const [loadingState, setLoading] = useState<boolean>(false);
  const {setAccessToken} = useAuthStore();
  const userLogin = async (input: UseLoginInput): Promise<void> => {
    setLoading(true);
    const response = await login(input);
    if (!response.token) {
      setError("no token was sent!");
    }
    setError(null);
    setLoading(false);
    setLogin(response);
    return;
  };

  if (!loginState?.token) {
    setError("No token found");
    return {
      setLogin: userLogin,
      isLoading: loadingState,
      error: errorState,
    };
  }
  setAccessToken(loginState?.token);
  return {
    setLogin: userLogin,
    isLoading: loadingState,
    error: errorState,
  };
}
