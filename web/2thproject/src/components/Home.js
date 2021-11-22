import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/articles/')
      .then(({ data }) => setPosts(data));
  }, []);
  return (
    <>
    <Nav />
    <Container>
      <GlobalStyle />
      {posts.map((post) => (
        <Post key={post.id}>
          <Body>{post.images}</Body>
        </Post>
      ))}
    </Container>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Container = styled.div`
  width: 23.4375rem;
  margin: auto;
  margin-top: 3em;
`;

const Post = styled.div`
  width: 10em;
  height: 10em;
  background: white;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;


const Body = styled.div`
  
`;

export default Home;
  
// ...