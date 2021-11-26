import React from 'react';
import styled from 'styled-components';
//import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <_Test>Hello world</_Test>
    </div>
  );
}

export default App;

const _Test = styled.div`
  color: #ffb700;
  font-size: 30px;
  font-weight: 600;
`;