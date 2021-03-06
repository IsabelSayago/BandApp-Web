import React, { useContext } from "react";

import { FiLogOut } from "react-icons/fi";
import GlobalContext from "../../contexts/global";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Menu = ({ open, recovery, welcome }) => {
  const { applyLogout } = useContext(GlobalContext);

  return (
    <div>
      {welcome && (
        <StyledMenu open={open} recovery={recovery}>
          <Link to="/myprofile">My Profile </Link>
          <Link to="/friends">Friends</Link>
          <Link to="/searchfriends">Search Friends</Link>
          <Link to="/groups">Groups</Link>

          <button
            className="logout"
            onClick={() => {
              applyLogout();
            }}
          >
            <FiLogOut />
            LogOut
          </button>
        </StyledMenu>
      )}
      {!welcome && (
        <StyledMenu open={open} recovery={recovery}>
          <Link to="/signup">SignUp</Link>
          <Link to="/login">Login</Link>
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
  width: 19rem;
  text-align: left;
  padding-left: 2rem;
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
