import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

const Cuisine = () => {
  let params = useParams();

  const [Cuisine, setCuisine] = useState([]);

  useEffect(() => {
    getCuisine(params.type);
    console.log(params);
  }, [params.type]);

  const getCuisine = async (name) => {
    const localData = localStorage.getItem(`${name}`);
    if (localData) {
      setCuisine(JSON.parse(localData));
    } else {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=51d0e725a5f9407891c4892e29d1c70a&cuisine=${name}&number=12`
      );
      const recepies = await data.json();
      setCuisine(recepies.results);
      localStorage.setItem(`${name}`, JSON.stringify(recepies.results));
    }
  };

  return (
    <Grid
      animate={{
        opacity: 1,
      }}
      initial={{
        opacity: 0,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{ duration: 0.3 }}
    >
      {Cuisine.map((thisEle) => {
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

const Grid = styled(motion.div)`
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

export default Cuisine;
