
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup, loading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(email, password);
    navigate('/');
  };

  return (
    <Container>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>Signup</button>
        {error && <p>{error}</p>}
      </form>
    </Container>
  );
};

export default Signup;
