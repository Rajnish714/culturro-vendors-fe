import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/useAuthStore";
import styled from "styled-components";
import {useLogin} from "../hooks/AuthHooks";

const Container = styled.div`
  padding: 2rem;
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {token} = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setLogin, isLoading, error} = useLogin();

  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [token]);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await setLogin({
      email,
      password,
    });
  };

  return (
    <Container>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          Login
        </button>
        {error && <p>{error}</p>} {/* Display error message */}
      </form>
    </Container>
  );
};

export default Login;
