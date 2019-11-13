import React, { useState } from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./TemplateEditor.css";

import OpenDialogNewComponent from "./OpenDialogNewComponent.js";
import OpenDialogComponentEditor from "./OpenDialogComponentEditor.js";

//text 유형의 component list 버튼화
const ListComponentText = ({ textData, isPopupUse, callbackEditData }) => {
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
    editDialogOpenParents: "list",
    editDialogOpenType: "edit"
  });

  const { choiceId, choiceInfo, choiceData } = datas;
  const {
    isOpenEditor,
    editDialogOpenParents,
    editDialogOpenType
  } = editDialogDatas;

  const clickListItem = () => {
    console.log("리스트 클릭했을 경우 css 변경 처리"); // 추후....
  };

  const list = textData.map(component => (
    <ContextMenuTrigger
      id="listComponentContextMenu"
      key={"menu_" + component.ID}
      collect={() =>
        setDatas({
          ...datas,
          choiceId: component.ID
        })
      }
    >
      <button className="compo" key={component.ID} onClick={clickListItem}>
        {component.TITLE} ({component.ID})
      </button>
    </ContextMenuTrigger>
  ));

  const listPopup = textData.map(component => (
    <ContextMenuTrigger
      id="listComponentContextMenuPopUp"
      key={"menu_popup_" + component.ID}
      collect={() =>
        setDatas({
          ...datas,
          choiceId: component.ID
        })
      }
    >
      <button
        className="pop_compo"
        key={"popup_" + component.ID}
        onClick={clickListItem}
      >
        {component.TITLE} ({component.ID})
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
      editDialogOpenParents: "list",
      editDialogOpenType: action
    });
  };

  const handleShowComponentEditor = (e, d, target) => {
    e.preventDefault();
    const action = d.action;
    const lookupData = textData.filter(list => list.ID === choiceId);

    let actionName;
    switch (action) {
      case "edit":
        actionName = "편집";
        break;
      case "copy":
        actionName = "복제";
        break;
      default:
        break;
    }

    confirmAlert({
      title: "컴포넌트 " + actionName,
      message:
        "현재 편집중인 컴포넌트 데이터는 모두 사라집니다. 그래도 해당 컴포넌트를 " +
        actionName +
        "하시겠습니까?",
      buttons: [
        {
          label: "확인",
          onClick: () => onActionConfirm(action, lookupData)
        },
        {
          label: "취소"
        }
      ]
    });
  };

  const onActionConfirm = (action, lookupData) => {
    setDatas({
      ...datas,
      choiceInfo: {
        target: newDialogOpenType
      },
      choiceData: lookupData
    });

    setEditDialogDatas({
      ...editDialogDatas,
      editDialogOpenParents: "listPopup",
      editDialogOpenType: action
    });

    console.log("callback 호출 - 리스트 컴포넌트 텍스트");
    console.log(" = editingeditDialogOpenTypeType", action);
    console.log(" = choiceData", lookupData[0]);

    callbackEditData(newDialogOpenType, action, lookupData[0]);
  };

  const callbackSetFlag = flag => {
    console.log("ListComponentText 콜백");
    setEditDialogDatas({
      ...editDialogDatas,
      isOpenEditor: flag
    });
  };

  console.log("isOpenEditor", isOpenEditor);
  console.log("isPopupUse", isPopupUse);

  return (
    <div className="compoSection">
      <div className="compoTitle">Component 유형</div>
      <div className="compoList">
        <input className="compoSearch" placeholder="Search Here" />
        {isPopupUse ? null : (
          <OpenDialogNewComponent openType={newDialogOpenType} />
        )}
        {isPopupUse ? listPopup : list}
        {isPopupUse ? (
          <ContextMenu id="listComponentContextMenuPopUp">
            <MenuItem
              data={{ action: "edit" }}
              onClick={handleShowComponentEditor}
            >
              컴포넌트 편집
            </MenuItem>
            <MenuItem
              data={{ action: "copy" }}
              onClick={handleShowComponentEditor}
            >
              컴포넌트 복제
            </MenuItem>
          </ContextMenu>
        ) : (
          <ContextMenu id="listComponentContextMenu">
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
        )}
        {isOpenEditor && !isPopupUse ? (
          <OpenDialogComponentEditor
            isOpen={isOpenEditor}
            openParents={editDialogOpenParents}
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
