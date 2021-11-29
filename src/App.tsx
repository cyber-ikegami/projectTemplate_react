import React, { useState } from 'react';
import styled from 'styled-components';
// import './App.css';

const App = ()=> {
  // システム日付を初期値に設定
	let today = new Date(); 
	const year = today.getFullYear();
	const month = today.getMonth()+1;
	const day = today.getDate();

  const [value, setValue] = useState<string>('test');
  const [isDialog, setDialog] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>();
  const [date, setDate] = useState<string>(year + '/' + month + '/' + day);
  const [affiliation, setAffiliation] = useState<string>();
  const [name, setName] = useState<string>();
  const [showValue, setShowValue] = useState<string>('');

  return (
    <>
      {/* ダイアログ */}
      <_Dialog isDisplay={isDialog}>
        <dialog>
          {/* テキストボックス */}
          <span>■日付</span>
          <input type="text" value={date} onChange={(e)=>{
            setDate(e.target.value);
          }}/>
          <span>■所属</span>
          <input type="text" value={affiliation} placeholder="例）CSC" onChange={(e)=>{
            setAffiliation(e.target.value);
          }}/>
          <span>■名前</span>
          <input type="text" value={name} placeholder="例）〇〇様" onChange={(e)=>{
            setName(e.target.value);
          }}/>

          {/* キャンセルボタン */}
          <button onClick={(e)=>{
            setDialog(false);

            // 初期化
            //setDate('');
            setAffiliation('');
            setName('');
          }}>キャンセル</button>

          {/* 確定ボタン */}
          <button onClick={(e)=>{
            setShowValue(showValue + date + ' ' + affiliation + ')' + name + '\n' + selectedValue + '\n--------------------------------------------\n');
            setDialog(false);
            
            // 初期化
            //setDate('');
            setAffiliation('');
            setName('');

          }}>確定</button>
        </dialog>
      </_Dialog>

      {/* 左エリア */}
      <_Form>
        {/* 入力テキストエリア */}
        <textarea value={value} onChange={(e)=>{
          setValue(e.target.value);
        }} />
      </_Form>

      {/* 中央エリア */}
      <_Buttons>
        {/* 抽出ボタン */}
        <button onClick={()=>{
          setDialog(true);
          setSelectedValue(window.getSelection()?.toString());
        }}>抽出</button>

        {/* リセットボタン */}
        <button onClick={()=>{
           setShowValue('');
        }}>リセット</button>
      </_Buttons>

      {/* 右エリア */}
      <_Form>
        {/* 出力結果テキストエリア  */}
        <textarea value={showValue}/>
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