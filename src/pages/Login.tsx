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
  const {setLogin, isLoading, error, loginState} = useLogin();

  // Check for token on component mount
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (loginState) {
      console.log("Login State in Component:", loginState); // Debugging log after state update
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
        {error && <p>{error}</p>}
      </form>
    </Container>
  );
};

export default Login;

// import React, {useState, useEffect} from "react";
// import {useNavigate} from "react-router-dom";
// import {useAuthStore} from "../store/useAuthStore";
// import styled from "styled-components";
// import {useLogin} from "../hooks/AuthHooks";

// const Container = styled.div`
//   padding: 2rem;
// `;

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const {token} = useAuthStore();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const {setLogin, isLoading, error, loginState} = useLogin();

//   // Check for token on component mount
//   useEffect(() => {
//     if (token) {
//       navigate("/");
//     }
//   }, [token, navigate]);

//   useEffect(() => {
//     console.log("Login State in Component:", loginState); // Debugging log
//   }, [loginState]);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await setLogin({email, password});
//   };

//   if (token) {
//     return <p>Redirecting...</p>;
//   }

//   return (
//     <Container>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isLoading}>
//           Login
//         </button>
//         {error && <p>{error}</p>}
//         {loginState && (
//           <div>
//             <p>Welcome, {loginState.vendor.name}</p>
//             <p>Email: {loginState.vendor.email}</p>
//           </div>
//         )}
//       </form>
//     </Container>
//   );
// };

// export default Login;

// import React, {useState, useEffect} from "react";
// import {useNavigate} from "react-router-dom";
// import {useAuthStore} from "../store/useAuthStore";
// import styled from "styled-components";
// import {useLogin} from "../hooks/AuthHooks";

// const Container = styled.div`
//   padding: 2rem;
// `;

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const {token} = useAuthStore();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const {setLogin, isLoading, error, loginState} = useLogin();

//   // Check for token on component mount
//   useEffect(() => {
//     if (token) {
//       navigate("/"); // Redirect on token present
//     }
//   }, [token, navigate]);
//   useEffect(() => {
//     console.log("Login State in Component:", loginState); // Added this log statemen
//   }, [loginState]);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await setLogin({email, password});
//   };

//   if (token) {
//     return <p>Redirecting...</p>; // Render redirect message
//   }

//   return (
//     <Container>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isLoading}>
//           Login
//         </button>
//         {error && <p>{error}</p>} {/* Display error message */}
//       </form>
//     </Container>
//   );
// };

// export default Login;
