import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/useAuthStore";
import styled from "styled-components";
import {useSignup} from "../hooks/AuthHooks";

const Container = styled.div`
  padding: 2rem;
`;

const Login: React.FC = () => {
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
    return <p>Redirecting...</p>; // Render redirect message
  }

  return (
    <Container>
      <h2>Login</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Username:</label>
          <input
            type="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../store/useAuthStore';
// import styled from 'styled-components';

// const Container = styled.div`
//   padding: 2rem;
// `;

// const Signup: React.FC = () => {
//   const navigate = useNavigate();
//   const { signup, loading, error } = useAuthStore();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await signup(email, password);
//     navigate('/');
//   };

//   return (
//     <Container>
//       <h2>Signup</h2>
//       <form onSubmit={handleSignup}>
//         <div>
//           <label>Email:</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         </div>
//         <button type="submit" disabled={loading}>Signup</button>
//         {error && <p>{error}</p>}
//       </form>
//     </Container>
//   );
// };

// export default Signup;
