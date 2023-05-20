import React from 'react';
import Header from './Header';
import Form from './Form';
import GlobalStyle from '../GlobalStyle';
import styled from 'styled-components';
import Posts from '../Pages/Posts';

function Main() {
  return (
    <>
      <GlobalStyle />
      <Wrap>
        <Header />
        <Form />
        <Posts />
      </Wrap>
    </>
  );
}

export default Main;

const Wrap = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: auto;
`;
