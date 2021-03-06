import React, { useState } from 'react';
import styled from 'styled-components';

const line = '--------------------------------------------';

const App = ()=> {
  const [baseValue, setBaseValue] = useState<string>('');
  const [isDialog, setDialog] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>();
  const [date, setDate] = useState<string>(getSystemDate());
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

  // プレビューに表示する値(所属の入力があれば括弧をつける)
  let previewValue = '';
  if(affiliation != '') {
    previewValue = `${date} ${affiliation})${name}\n\n${selectedValue}\n${line}\n`;
  } else {
    previewValue = `${date} ${name}\n\n${selectedValue}\n${line}\n`;
  }

  return (
    <>
      {/* ダイアログ */}
      <_Dialog isDisplay={isDialog}>
        <dialog>
          <span>■プレビュー</span>
          <textarea readOnly value={previewValue} />

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

          <button onClick={(e)=>{
            setDialog(false);
            setAffiliation('');
            setName('');
          }}>キャンセル</button>

          <button onClick={(e)=>{
            // 所属の入力があれば括弧をつける
            if(affiliation != '') {
              setShowValue(showValue + date + ' ' + affiliation + ')' + name + '\n\n' + selectedValue + '\n' + line + '\n');
            } else {
              setShowValue(showValue + date + ' ' + name + '\n\n' + selectedValue + '\n' + line + '\n');
            }
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
        <span>　■ベーステキスト</span>
        <textarea value={baseValue} onChange={(e)=>{
          setBaseValue(e.target.value);
        }} />
      </_Form>

      {/* 中央エリア */}
      <_Buttons>
        <button onClick={()=>{
          setDialog(true);
          setSelectedValue(window.getSelection()?.toString());

        }}>抽出</button>

        <button onClick={()=>{
           setShowValue('');
        }}>リセット</button>
      </_Buttons>

      {/* 右エリア */}
      <_Form>
        <span>　■抽出結果</span>
        <textarea value={showValue}/>
      </_Form>
    </>
  );
}

export default App;

// システム日付を初期値に設定
const getSystemDate = () => {
  	let today = new Date(); 
  	const year = today.getFullYear();
	  const month = today.getMonth()+1;
  	const day = today.getDate();
    return year + '/' + month + '/' + day;
}

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
    margin-bottom: 20px;
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