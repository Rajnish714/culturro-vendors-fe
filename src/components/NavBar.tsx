import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../styles/breakpoints'; // Import breakpoints

const Nav = styled.nav<{ isFullScreen: boolean }>`
  background-color: #333;
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ isFullScreen }) => (isFullScreen ? 'column' : 'row')};
  position: ${({ isFullScreen }) => (isFullScreen ? 'fixed' : 'relative')};
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ isFullScreen }) => (isFullScreen ? '100vh' : 'auto')};
  z-index: 1000;
  animation: ${({ isFullScreen }) => (isFullScreen ? 'slideDown 0.5s forwards' : 'slideUp 0.5s forwards')};

  @media ${device.mobileS} {
    flex-direction: column;
  }

  @media ${device.tablet} {
    flex-direction: ${({ isFullScreen }) => (isFullScreen ? 'column' : 'row')};
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-right: 1rem;

  &:hover {
    text-decoration: underline;
  }

  @media ${device.mobileS} {
    margin-bottom: 1rem;
  }

  @media ${device.tablet} {
    margin-bottom: 0;
  }
`;

const CloseButton = styled.button`
  background-color: #d9534f;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background-color: #c9302c;
  }
`;

const NavBar: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleAboutClick = () => {
    setIsFullScreen(true);
  };

  const handleCloseClick = () => {
    setIsFullScreen(false);
  };

  return (
    <Nav isFullScreen={isFullScreen}>
      {!isFullScreen && (
        <>
          <NavLink to="/">Deshboard</NavLink>
       
          <NavLink to="/login">login</NavLink>
          <NavLink to="#" onClick={handleAboutClick}>About</NavLink>
        </>
      )}
      {isFullScreen && (
        <>
          <CloseButton onClick={handleCloseClick}>Close</CloseButton>
          <div>
            <h1>About Us</h1>
            <p>Information about the vendor and the application.</p>
          </div>
        </>
      )}
      <button>Logout</button>
    </Nav>
  );
};

export default NavBar;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';

// const Nav = styled.nav<{ isFullScreen: boolean }>`
//   background-color: #333;
//   color: #fff;
//   padding: 1rem;
//   display: flex;
//   justify-content: space-between;
//   flex-direction: ${({ isFullScreen }) => (isFullScreen ? 'column' : 'row')};
//   position: ${({ isFullScreen }) => (isFullScreen ? 'fixed' : 'relative')};
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: ${({ isFullScreen }) => (isFullScreen ? '100vh' : 'auto')};
//   z-index: 1000;
// `;

// const NavLink = styled(Link)`
//   color: #fff;
//   text-decoration: none;
//   margin-right: 1rem;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const CloseButton = styled.button`
//   background-color: #d9534f;
//   color: #fff;
//   border: none;
//   padding: 0.5rem 1rem;
//   cursor: pointer;
//   align-self: flex-end;

//   &:hover {
//     background-color: #c9302c;
//   }
// `;

// const NavBar: React.FC = () => {
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   const handleAboutClick = () => {
//     setIsFullScreen(true);
//   };

//   const handleCloseClick = () => {
//     setIsFullScreen(false);
//   };

//   return (
//     <Nav isFullScreen={isFullScreen}>
//       {!isFullScreen && (
//         <>
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/about" onClick={handleAboutClick}>About</NavLink>
//         </>
//       )}
//       {isFullScreen && (
//         <>
//           <CloseButton onClick={handleCloseClick}>Close</CloseButton>
//           <div>
//             <h1>About Us</h1>
//             <p>Information about the vendor and the application.</p>
//           </div>
//         </>
//       )}
//       <button>Logout</button>
//     </Nav>
//   );
// };

// export default NavBar;
