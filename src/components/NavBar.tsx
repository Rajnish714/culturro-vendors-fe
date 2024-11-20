import React, {useEffect} from "react";
import {Link, useLocation, Navigate} from "react-router-dom";
import styled from "styled-components";
import {device} from "../styles/breakpoints";
import {useAuthStore} from "../store/useAuthStore";

const Nav = styled.nav`
  display: flex;
  color: white;
  background-color: #333;
  text-align: center;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
  font-family: 'Roboto', sans-serif; 

  @media ${device.mobileS} {
    flex-direction: column;
  }

  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const DashboardLink = styled(Link)`
  color: white;
  text-decoration: none;

  border-radius: 4px;

  font-weight: 700;

  &:hover {
    color: #ddd; 
  }

  @media ${device.mobileS} {
    margin-bottom: 1rem;
  }

  @media ${device.tablet} {
    margin-bottom: 0;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin: 0 0.5rem;
  font-weight: 700;

  &:hover {
    background-color: #0056b3; 
  }

  @media ${device.mobileS} {
    margin-bottom: 1rem;
  }

  @media ${device.tablet} {
    margin-bottom: 0;
  }
`;

const BlueNavLink = styled(NavLink)`
  background-color: #007bff;
`;

const RedButton = styled.button`
  
  color: #fff;
  background-color: #dc3545; 
  border-color: #dc3545;
  cursor: pointer;
  padding: 0.2rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  margin: 0 0.5rem;
  font-weight: 700;

  &:hover {
   color: #fff;
  background-color: #c82333; 
  border-color: #bd2130;
  }
`;

type NavBarProps = {isAuthenticated: () => boolean};
const NavBar: React.FC<NavBarProps> = ({isAuthenticated}) => {
  const {logout} = useAuthStore();
  const location = useLocation();
  const {vendor} = useAuthStore();

  useEffect(() => {}, [location, vendor]);

  const handleLogoutClick = () => {
    logout();
    <Navigate to="/login" replace />;
  };

  return (
    <Nav>
      <DashboardLink to="/">
        <h3>Dashboard</h3>
      </DashboardLink>

      {vendor ? <h3 style={{margin: "0 0.5rem"}}>{vendor.name}</h3> : ""}

      {isAuthenticated() ? (
        <RedButton onClick={handleLogoutClick}>Logout</RedButton>
      ) : location.pathname === "/login" ? (
        <BlueNavLink to="/signup">SignUp</BlueNavLink>
      ) : (
        <BlueNavLink to="/login">Login</BlueNavLink>
      )}
    </Nav>
  );
};

export default NavBar;
