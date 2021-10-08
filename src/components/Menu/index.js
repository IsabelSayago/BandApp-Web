import React from "react";
import styled from "styled-components";

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <a href="">My Profile</a>
      <a href="">Friends</a>
      <a href="">SignUp</a>
      <a href="">About</a>
    </StyledMenu>
  );
};

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  height: 100vh;
  text-align: left;
  padding-left: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.4s ease-in-out;
  border-radius: 0.3rem;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};

  a {
    font-size: 1rem;
    font-family: "Roboto", sans-serif;
    text-transform: capitalize;
    padding: 2rem 0;
    font-weight: normal;
    letter-spacing: 0.2rem;
    color: black;
    text-decoration: none;
    transition: color 0.3s linear;

    &:hover {
      color: grey;
    }
  }
`;

export default Menu;
