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
  const [affiliation, setAffiliation] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [showValue, setShowValue] = useState<string>('');
  const [dateHistoryList, setDateHistoryList] = useState<string[]>([]);
  const [affiliationHistoryList, setAffiliationHistoryList] = useState<string[]>([]);
  const [nameHistoryList, setNameHistoryList] = useState<string[]>([]);

  // 日付履歴JSXのリスト
  const dataHistoryJsxList: JSX.Element[] = [];
  for(let i = 0; i < dateHistoryList.length; i++){
    dataHistoryJsxList.push(
      <option>{dateHistoryList[i]}</option>
    );
  }

  // 所属履歴JSXのリスト
  const affiliationHistoryJsxList: JSX.Element[] = [];
  for(let i = 0; i < affiliationHistoryList.length; i++){
    affiliationHistoryJsxList.push(
      <option>{affiliationHistoryList[i]}</option>
    );
  }
  
  // 名前履歴JSXのリスト
  const nameHistoryJsxList: JSX.Element[] = [];
  for(let i = 0; i < nameHistoryList.length; i++){
    nameHistoryJsxList.push(
      <option>{nameHistoryList[i]}</option>
    );
  }

  // プレビューに表示する値
  const previewValue =
  `${date} ${affiliation})${name}

   ${selectedValue}

   --------------------------------------------
   `.replace(/[ \t\r]+/g,"");

  return (
    <>
      {/* ダイアログ */}
      <_Dialog isDisplay={isDialog}>
        <dialog>
          {/* テキストボックス */}
          <span>■プレビュー</span>
          <textarea readOnly value={previewValue} />
          {/* alert(selectedValue); */}

          {/* テキストボックス */}
          <span>■日付</span>
          <input type="text" value={date} list="dateList" onChange={(e)=>{
            setDate(e.target.value);
          }}/>
           <datalist id="dateList">{dataHistoryJsxList}</datalist>

          <span>■所属</span>
          <input type="text" value={affiliation} placeholder="例）CSC" list="affiliationList" onChange={(e)=>{
            setAffiliation(e.target.value);
          }}/>
          <datalist id="affiliationList">{affiliationHistoryJsxList}</datalist>

          <span>■名前</span>
          <input type="text" value={name} placeholder="例）〇〇様" list="nameList" onChange={(e)=>{
            setName(e.target.value);
          }}/>
          <datalist id="nameList">{nameHistoryJsxList}</datalist>

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
            setShowValue(
              `${showValue}${date} ${affiliation})${name}
              
              ${selectedValue}

              --------------------------------------------
              `.replace(/[ \t\r]+/g,""));
            setDialog(false);

            if(!dateHistoryList.includes(date)){
              dateHistoryList.push(date);
              setDateHistoryList(dateHistoryList);
            }
            if(!affiliationHistoryList.includes(affiliation)){
              affiliationHistoryList.push(affiliation);
              setAffiliationHistoryList(affiliationHistoryList);
            }
            if(!nameHistoryList.includes(name)){
              nameHistoryList.push(name);
              setNameHistoryList(nameHistoryList);
            }

            // 初期化
            setAffiliation('');
            setName('');
          }}>確定</button>
        </dialog>
      </_Dialog>

      {/* 左エリア */}
      <_Form>
        {/* 入力テキストエリア */}
        <span>　■ベーステキスト</span>
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
        <span>　■抽出結果</span>
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
    resize:none;
    margin-left: 10px;
    margin-bottom: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 30px);
    box-sizing: border-box; 
  }
  & span {
    font-size: 15px;
  }
`;

const _Buttons = styled.div`
  background-color: #b0ee97;
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
  & span {
    font-size: 15px;
  }
  & dialog {
    background-color: white;
    display: inline-block;
    width: 50%;
    height: 300px;
    top: 50%;
    left: 50%;
    padding: 2%;
    transform: translate(-50%,-50%);
  }
  & textarea {
    resize:none;
    width: 100%;
    height: 100px;
  }
  & input {
    width: 100%;
    height: 20px;
  }
  & button {
    width: 100px;
    height: 30px;
    margin-top: 5px;
    margin-right: 5px;
    bottom: 10px;
  }
  
`;