import { FiLogOut } from "react-icons/fi";
import React from "react";
import styled from "styled-components";

const Menu = ({ open, recovery, welcome }) => {
  return (
    <div>
      {welcome && (
        <StyledMenu open={open} recovery={recovery}>
          <a href="/myprofile">My Profile</a>
          <a href="/friends">Friends</a>
          <a href="/groups">Groups</a>
          <a href="/myprofile">Bookings</a>
          <a href="/searchfriends">Search Friends</a>
          <a href="/myprofile">Search Rooms</a>
          <div className="logout">
            <FiLogOut />
            <a href="/">LogOut</a>
          </div>
        </StyledMenu>
      )}
      {!welcome && (
        <StyledMenu open={open} recovery={recovery}>
          <a href="/signup">SignUp</a>
          <a href="/login">Login</a>
          <a href="/myprofile">About</a>
        </StyledMenu>
      )}
    </div>
  );
};

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ recovery }) => (recovery ? "#9c4848" : "white")};
  height: 100vh;
  width: 13rem;
  text-align: left;
  padding-left: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.4s ease-in-out;
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};

  a {
    font-size: 2rem;
    font-family: "Roboto", sans-serif;
    text-transform: capitalize;
    padding: 0.5rem 0;
    font-weight: normal;
    letter-spacing: 0.04rem;
    color: black;
    text-decoration: none;
    transition: color 0.3s linear;

    &:hover {
      color: grey;
    }
  }
`;

export default Menu;
