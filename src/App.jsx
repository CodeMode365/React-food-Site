import React from "react";
import Pages from "./pages/Pages";
import Category from "./components/Category";
import { BrowserRouter, Link } from "react-router-dom";
import Search from "./components/Search";
import styled from "styled-components";
import { GiKnifeFork } from "react-icons/gi";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <nav>
          <Logo to={"/"}>
            <GiKnifeFork />
          </Logo>
        </nav>
        <Category />
        <Search />

        <Pages />
      </BrowserRouter>
    </>
  );
};

const Logo = styled(Link)`
  tex-decoration: none;
  font-size: 1rem;
  fot-weight: 400;
  font-family: "Lobster Two", cursive;
  align-items: center;
  position: relative;
  color: red;

  svg {
    font-size: 5rem;
    transform: translateY(50px);
    // background:linear-gradient(30deg, red,blue);
    -webkit-backgroud-clip:text;
    // -webkit-text-fill-color:transparent;
    text-fill-color:transparent;
    // color:transparent;
  }
`;
export default App;
