import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/useAuthStore";
import {useSignup} from "../hooks/AuthHooks";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const {token} = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setSignup, isLoading, error} = useSignup();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await setSignup({name, email, password});
  };

  if (token) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSignup}>
        <h2>Signup</h2>
        <div className="form-row">
          <label className="label">Username:</label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          Signup
        </button>
        {error && <p>This Email is already exists!</p>}
      </form>
    </div>
  );
};

export default Signup;
