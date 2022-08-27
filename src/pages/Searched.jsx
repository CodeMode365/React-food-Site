import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";


const Searched = () => {
  const [searchedRecipies, setSearchedRecipies] = useState([]);
  const params = useParams();

  const getSearched = async (search) => {
    const data = await fetch(
      ` https://api.spoonacular.com/recipes/complexSearch?apiKey=51d0e725a5f9407891c4892e29d1c70a&query=${search}`
    );
    const recipis = await data.json();
    setSearchedRecipies(recipis.results);
  };

  useEffect(() => {
    getSearched(params.search);
    console.log(params.search);
  }, [params.search]);

  return (
    <Grid>
      {searchedRecipies.map((thisEle) => {
        return (
          <Card key={thisEle.id}>
            <Link to={"/recipe/" + thisEle.id}>
              <img src={thisEle.image} alt={thisEle.image} />
              <h4>{thisEle.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-gap: 3rem;
`;
const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
    position: center;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
