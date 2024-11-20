import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/useAuthStore";
import {useLogin} from "../hooks/AuthHooks";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {token} = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setLogin, isLoading, error, loginState} = useLogin();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (loginState) {
      console.log("Login State in Component:", loginState);
    }
  }, [loginState]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await setLogin({email, password});
  };

  if (token) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-row">
          <label className="label">Email:</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label className="label">Password:</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button" disabled={isLoading}>
          Login
        </button>
        {error && <p>Invalid Email OR Password</p>}
      </form>
    </div>
  );
};

export default Login;
