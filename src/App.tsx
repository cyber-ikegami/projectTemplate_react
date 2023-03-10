import React, { useState } from 'react';
import styled from 'styled-components';

const line = '--------------------------------------------';

const App = () => {
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
  dateHistoryList.forEach((dateHistory, i) => {
    dataHistoryJsxList.push(<option key={i}>{dateHistory}</option>);
  });

  // 所属履歴JSXのリスト
  const affiliationHistoryJsxList: JSX.Element[] = [];
  affiliationHistoryList.forEach((affiliationHistory, i) => {
    affiliationHistoryJsxList.push(<option key={i}>{affiliationHistory}</option>);
  });

  // 名前履歴JSXのリスト
  const nameHistoryJsxList: JSX.Element[] = [];
  nameHistoryList.forEach((nameHistory, i) => {
    nameHistoryJsxList.push(<option key={i}>{nameHistory}</option>);
  });

  // プレビューに表示する値(所属の入力があれば括弧をつける)
  const previewValue = affiliation != '' ?
    `${date} ${affiliation})${name}\n\n${removeQuoteIndent(selectedValue != undefined ? selectedValue : '')}\n\n${line}\n` :
    `${date} ${name}\n\n${removeQuoteIndent(selectedValue != undefined ? selectedValue : '')}\n\n${line}\n`;

  return (
    <>
      {/* ダイアログ */}
      <_Dialog isDisplay={isDialog}>
        <dialog>
          <span>■プレビュー</span>
          <textarea readOnly value={previewValue} />

          <span>■日付</span>
          <input type="text" value={date} list="dateList" onChange={(e) => {
            setDate(e.target.value);
          }} />
          <datalist id="dateList">{dataHistoryJsxList}</datalist>

          <span>■所属</span>
          <input type="text" value={affiliation} placeholder="例）CSC" list="affiliationList" onChange={(e) => {
            setAffiliation(e.target.value);
          }} />
          <datalist id="affiliationList">{affiliationHistoryJsxList}</datalist>

          <span>■名前</span>
          <input type="text" value={name} placeholder="例）〇〇様" list="nameList" onChange={(e) => {
            setName(e.target.value);
          }} />
          <datalist id="nameList">{nameHistoryJsxList}</datalist>

          <button onClick={(e) => {
            setDialog(false);
            setAffiliation('');
            setName('');
          }}>キャンセル</button>

          <button onClick={(e) => {
            // 所属の入力があれば括弧をつける
            affiliation != '' ?
              setShowValue(`${showValue}${date} ${affiliation})${name}\n\n${removeQuoteIndent(selectedValue != undefined ? selectedValue : '')}\n\n${line}\n`) :
              setShowValue(`${showValue}${date} ${name}\n\n${removeQuoteIndent(selectedValue != undefined ? selectedValue : '')}\n\n${line}\n`);
            setDialog(false);

            if (!dateHistoryList.includes(date)) {
              dateHistoryList.push(date);
              setDateHistoryList(dateHistoryList);
            }
            if (!affiliationHistoryList.includes(affiliation)) {
              affiliationHistoryList.push(affiliation);
              setAffiliationHistoryList(affiliationHistoryList);
            }
            if (!nameHistoryList.includes(name)) {
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
        <textarea value={baseValue} onChange={(e) => {
          setBaseValue(e.target.value);
        }} />
      </_Form>

      {/* 中央エリア */}
      <_Buttons>
        <button onClick={() => {
          setDialog(true);
          setSelectedValue(window.getSelection()?.toString());
        }}>抽出</button>

        <button onClick={() => {
          setShowValue('');
        }}>リセット</button>
      </_Buttons>

      {/* 右エリア */}
      <_Form>
        <span>　■抽出結果</span>
        <textarea value={showValue} onChange={(e) => { }} />
      </_Form>
    </>
  );
}

export default App;

// システム日付を初期値に設定
const getSystemDate = () => {
  let today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return year + '/' + month + '/' + day;
}

/**
  * 引用文字「>」によるインデントを削除した文字列を返す
  * @param original 処理対象の文字列
  * @returns 処理後の文字列
  */
const removeQuoteIndent = (original: string): string => {
  const records = original.split('\n');
  let minCount = 0;
  records.forEach(record => {
    let i = 0;
    while (true) {
      const ch = record.charAt(i);
      if (ch !== '>') break;
      i++;
    }
    if (minCount == 0 || (i != 0 && i < minCount)) minCount = i;
  });

  if(minCount == 0) return original;

  const removeStr = (new Array<string>(minCount).fill('>')).join('');
  records.forEach((record, i) => {
    records[i] = record.replace(removeStr, '');
  });
  return records.join('\r\n');
};

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
  display: ${props => props.isDisplay ? 'block' : 'none'};
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