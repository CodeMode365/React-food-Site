import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [Input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (Input == "") {
      navigate("/");
    } else {
      navigate("/searched/" + Input);
    }
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <input
          type="text"
          onChange={(e) => {
            // console.log(e.target.value);
            setInput(e.target.value);
          }}
          value={Input}
        />
        <FaSearch />
      </div>
    </FormStyle>
  );
};

const FormStyle = styled.form`
  margin: 0rem 20rem;
  position: relative;
  //   width: 450px;
  margin-bottom: 2rem;
  div {
    width: 100%;
    position: relative;
  }
  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border-radius: 1rem;
    outline: none;
    width: 100%;
    position: relative;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
  }
`;
export default Search;
