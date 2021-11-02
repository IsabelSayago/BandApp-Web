import React from "react";
import styled from "styled-components";

const StyledBurger = styled.button`
  position: absolute;
  top: 5%;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 4rem;
  height: 4rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 4rem;
    height: 0.5rem;
    background-color: ${({ open, recovery }) =>
      open && recovery
        ? "white"
        : open
        ? "#9c4848"
        : recovery
        ? "#9c4848"
        : "white"};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }
    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }
    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const Burger = ({ open, setOpen, recovery }) => {
  return (
    <StyledBurger
      open={open}
      onClick={() => setOpen(!open)}
      recovery={recovery}
    >
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Burger;
