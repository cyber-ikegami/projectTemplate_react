import React from 'react';
import styled from 'styled-components';
// import './App.css';

function App() {
  return (
    <>
      <_Form>
        <textarea></textarea>
      </_Form>

      <_Buttons>
        <button>抽出</button>
        <button>リセット</button>
      </_Buttons>

      <_Form>
        <textarea></textarea>
      </_Form>
    </>
  );
}

export default App;

const _Test = styled.div`
  color: #ffb700;
  font-size: 30px;
  font-weight: 600;
`;

const _Form = styled.div`
  background-color: #b0ee97;
  display: inline-block;
  vertical-align: top;
  width: calc(50% - 40px);
  height: 100%;

  & textarea {
    margin-left: 10px;
    margin-bottom: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 30px);
  }
`;

const _Buttons = styled.div`
  background-color: #eed297;
  display: inline-block;
  vertical-align: top;
  width: 80px;
  height: 100%;
  display: inline-flex;
  flex-flow: column;
  justify-content: center;

  & button {
    width: 100%;
  }
`;