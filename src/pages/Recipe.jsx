import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Recipe = () => {
  const params = useParams();
  const [Details, setDetails] = useState({});
  const [ActiveTab, setActiveTab] = useState("instructions");
  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=51d0e725a5f9407891c4892e29d1c70a`
    );
    const jsonData = await data.json();
    setDetails(jsonData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{Details.title}</h2>
        <img src={Details.image} alt={Details.title} />
      </div>
      <Info>
        <Clickers>
          <Button
            className={ActiveTab === "instructions" ? "active" : ""}
            onClick={() => {
              setActiveTab("instructions");
            }}
          >
            Instructions
          </Button>
          <Button
            className={ActiveTab === "ingredients" ? "active" : ""}
            onClick={() => {
              setActiveTab("ingredients");
            }}
          >
            Ingredients
          </Button>
        </Clickers>

        {ActiveTab === "instructions" && (
          <div>
            <h4
              dangerouslySetInnerHTML={{ __html: Details.summary }}
            ></h4>
            <h4
              dangerouslySetInnerHTML={{ __html: Details.instructions }}
            ></h4>
          </div>
        )}
        {ActiveTab === "ingredients" && (
          <ul>
            {Details.extendedIngredients.map((ingredient) => {
              return (
                <li key={ingredient.id}>
                  <h3>{ingredient.original}</h3>
                </li>
              );
            })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;

  .a{
    background:linear-gradient(35deg, #494949, #313131);
    color:white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li{
    font-size:1rem;
    line:height:2.5rem;
  }ul{
    margin-top:2rem;
  }
  h4{
    margin-top:0.2rem;
    font-size:1.2rem;
  }
 
`;
const Clickers = styled.div`
  display: flex;
`;
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  height: 4rem;
  cursor: pointer;
  transition: 0.5s all;
  // display:inline-block;

  :hover {
    color: white;
    background: black;
    cursor: pointer;
  }
  &.active {
    color: white;
    background: black;
  }
`;

const Info = styled.div`
  margin-left: 5rem;
  display: flex;
  min-width: 30rem;
  // widt
  // heigh:1rem;
  flex-direction: column;
  margin-top: 10px;
`;

export default Recipe;
