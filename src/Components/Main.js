import React from 'react';
import Header from './Header';
import Form from './Form';
import ListWorking from './ListWorking';
// import ListDone from './ListDone';
import GlobalStyle from '../GlobalStyle';
import styled from 'styled-components';

function Main() {
  return (
    <>
      <GlobalStyle />
      <Wrap>
        <Header />
        <Form />
        <ListWorking />
        {/* <ListDone /> */}
      </Wrap>
    </>
  )
}

export default Main

const Wrap = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: auto;
`;