import React, { useState } from 'react';
import styled from 'styled-components';
// import './App.css';

const App = ()=> {
  const [value, setValue] = useState<string>('test');
  const [isDialog, setDialog] = useState<boolean>(false);
  let [printValue, selectValue] = useState<string>();
  return (
    <>
      <_Dialog isDisplay={isDialog}>
        <dialog>
          <span>■日付</span>
          <input type="text" />
          <span>■所属</span>
          <input type="text" />
          <span>■名前</span>
          <input type="text" />

          <button onClick={()=>{
            setDialog(false);
          }}>キャンセル</button>

          <button onClick={()=>{
            setDialog(false);

          }}>確定</button>
        </dialog>
      </_Dialog>

      <_Form>
        <textarea value={value} onChange={(e)=>{
          setValue(e.target.value);
        }} />
      </_Form>

      <_Buttons>
        <button onClick={()=>{
          setDialog(true);
          //selectValue(window.getSelection()?.toString);
        }}>抽出</button>
        <button>リセット</button>
      </_Buttons>

      <_Form>
        <textarea>
          
        </textarea>
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

const _Dialog = styled.div<{
  isDisplay: boolean;
}>`
  display: ${props => props.isDisplay?'block':'none'};
  background-color: #0000007f;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  //text-align: right;

  & span {
    font-size: 15px;
  }

  & dialog {
    background-color: white;
    display: inline-block;
    width: 50%;
    height: 30%;
    top: 50%;
    left: 50%;
    padding: 2%;
    transform: translate(-50%,-50%);
  }

  & input {
    width: 100%;
    height: 10%;
  }

  & button {
    width: 100px;
    height: 30px;
    margin-top: 5px;
    margin-right: 5px;
    bottom: 10px;
  }
`;