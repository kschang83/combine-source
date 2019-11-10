import React, { useState } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import "./TemplateEditor.css";

import OpenDialogNewComponent from "./OpenDialogNewComponent.js";
import OpenDialogComponentEditor from "./OpenDialogComponentEditor.js";

//text 유형의 component list 버튼화
const ListComponentText = ({ textData, isPopupUse }) => {
  const newDialogOpenType = "text";
  const [datas, setDatas] = useState({
    choiceId: "",
    choiceInfo: {
      target: newDialogOpenType
    },
    choiceData: {}
  });

  const [editDialogDatas, setEditDialogDatas] = useState({
    isOpenEditor: false,
    editDialogOpenType: "edit"
  });

  const { choiceId, choiceInfo, choiceData } = datas;
  const { isOpenEditor, editDialogOpenType } = editDialogDatas;

  const clickListItem = () => {
    console.log("리스트 클릭했을 경우 css 변경 처리"); // 추후....
  };

  const list = textData.map(component => (
    <ContextMenuTrigger
      id={
        isPopupUse
          ? "listComponentContextMenuPopUp"
          : "listComponentContextMenu"
      }
      key={"t" + component.ID}
      collect={() =>
        setDatas({
          ...datas,
          choiceId: component.ID
        })
      }
    >
      <button className="compo" key={component.ID} onClick={clickListItem}>
        {" "}
        {component.TITLE} ({component.ID}){" "}
      </button>
    </ContextMenuTrigger>
  ));

  const handleOpenComponentEdiotr = (e, d, target) => {
    e.preventDefault();
    const action = d.action;
    const lookupData = textData.filter(list => list.ID === choiceId);

    setDatas({
      ...datas,
      choiceInfo: {
        target: newDialogOpenType
      },
      choiceData: lookupData
    });

    setEditDialogDatas({
      ...editDialogDatas,
      isOpenEditor: true,
      editDialogOpenType: action
    });
  };

  const callbackSetFlag = flag => {
    console.log("ListComponentText 콜백");
    setEditDialogDatas({
      ...editDialogDatas,
      isOpenEditor: flag
    });
  };

  return (
    <div className="compoSection">
      <div className="compoTitle">Component 유형</div>
      <div className="compoList">
        <input className="compoSearch" placeholder="Search Here" />
        <OpenDialogNewComponent openType={newDialogOpenType} />
        {list}
        <ContextMenu
          id={
            isPopupUse
              ? "listComponentContextMenuPopUp"
              : "listComponentContextMenu"
          }
        >
          <MenuItem
            data={{ action: "edit" }}
            onClick={handleOpenComponentEdiotr}
          >
            컴포넌트 편집
          </MenuItem>
          <MenuItem
            data={{ action: "copy" }}
            onClick={handleOpenComponentEdiotr}
          >
            컴포넌트 복제
          </MenuItem>
        </ContextMenu>
        {isOpenEditor && !isPopupUse ? (
          <OpenDialogComponentEditor
            isOpen={isOpenEditor}
            openType={editDialogOpenType}
            editInfos={choiceInfo}
            editDatas={choiceData[0]}
            callbackFunc={callbackSetFlag}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ListComponentText;
