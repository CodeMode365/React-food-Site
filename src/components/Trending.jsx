import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Img from "./image.jpg";
import { Link } from "react-router-dom";
const Trending = () => {
  //state to hold the current or changing data
  const [popular, setPopular] = useState([]);

  //calls the function during first load of page
  useEffect(() => {
    getTrending();
  }, []);

  const getTrending = async () => {
    const check = localStorage.getItem("popular");
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=51d0e725a5f9407891c4892e29d1c70a&number=12`
      );
      const data = await api.json();
      setPopular(data.recipes);
      localStorage.setItem("popular", JSON.stringify(data.recipes));
    }

    // const api = [
    //   {
    //     id: 243,
    //     title: "Minizama of mazi",
    //     image: Img,
    //   },
    //   {
    //     id: 253,
    //     title: "Sanad with seens",
    //     image: Img,
    //   },
    //   {
    //     id: 553,
    //     title: "Susi with Salad",
    //     image: Img,
    //   },
    //   {
    //     id: 123,
    //     title: "Pizza with cheese",
    //     image: Img,
    //   },
    //   {
    //     id: 220,
    //     title: "Momo",
    //     image: Img,
    //   },
    //   {
    //     id: 213,
    //     title: "Chatpate",
    //     image: Img,
    //   },
    //   {
    //     id: 226,
    //     title: "Momo",
    //     image: Img,
    //   }, ];
    // setPopular(api);
  };

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "3rem",
          }}
        >
          {popular.map((currEle) => {
            return (
              <SplideSlide key={currEle.id} style={{ cursor: "pointer" }}>
                <Card>
                  <Link to={'/recipe/'+currEle.id}>
                    <p>{currEle.title}</p>
                    <img src={currEle.image} alt={currEle.image} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
};

//styled div with classname Wrapper
const Wrapper = styled.div`
  margin: 4rem 0rem;
  // background-color:red;
`;

const Card = styled.div`
  min-height: 25rem;
  // display:none;
  // background-image:linear-gradinet(red,blue);

  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    object-fit: cover;
    min-height: 25em;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    // display:none;
    bottom: 0%;
    transform: translate(-50%, 10%);
    color: white;
    white: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    deisplay: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
   {
    z-index: 3;
    position: absolute;
    width: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  }
`;
export default Trending;
