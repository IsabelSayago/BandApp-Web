import "../assets/fonts.css";

import google from "../assets/GoogleButton.png";
import styled from "styled-components";

export const Container = styled.div`
  background-color: #9c4848;
  width: inherit;
  height: 100vh;
  padding: 1px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const InnerContainer = styled.div`
  display: flex;
  align-items: ${(props) => (props.align ? props.align : "center")};
  justify-content: flex-end;
  flex-direction: column;
`;

export const Button = styled.button`
  background-color: white;
  background-image: url(${(props) => (props.google ? google : "")});
  background-size: 110%;
  background-position: center;
  margin: 1px;
  width: 12rem;
  height: 2rem;
  border-radius: 4px;
  border-width: 0px;
  text-align: center;
  font-family: "Roboto", sans-serif;

  &:hover {
    opacity: 80%;
  }
`;

export const Link = styled.a`
  margin-top: 20px;
  margin-bottom: 5px;
  text-align: left;
  color: white;
  font-size: 9px;
  font-family: "Roboto", sans-serif;

  &:hover {
    opacity: 80%;
    text-decoration: underline;
  }
`;
