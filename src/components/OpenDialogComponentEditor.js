import React, { useState, useEffect } from "react";
import ReactModalDialog from "react-modal";
import "./TemplateEditor.css";

import ListComponent from "./ListComponent.js";
import ComponentEditorText from "./ComponentEditorText.js";
import ComponentEditorImage from "./ComponentEditorImage.js";
import ComponentEditorVideo from "./ComponentEditorVideo.js";

const OpenDialogComponentEditor = ({
  isOpen,
  openParents,
  openType,
  editInfos,
  editDatas,
  callbackFunc
}) => {
  const [isOpenDlg, setIsOpenDlg] = useState(false);
  const [datas, setDatas] = useState({
    editingType: "new",
    dialogTitle: "컴포넌트 생성",
    isText: false,
    isImage: false,
    isVideo: false,
    componentEditDatas: {},
    selectedEditDatas: {
      ID: "",
      ACTION: ""
    }
  });

  const {
    editingType,
    dialogTitle,
    isText,
    isImage,
    isVideo,
    componentEditDatas,
    selectedEditDatas
  } = datas;

  useEffect(() => {
    console.log("OpenDialogComponentEditor useEffect");
    setIsOpenDlg(isOpen);

    let title;
    switch (openType) {
      case "new":
        title = "컴포넌트 생성";
        break;
      case "copy":
        title = "컴포넌트 복제";
        break;
      case "edit":
        title = "컴포넌트 편집";
        break;
      default:
        break;
    }

    const target = editInfos.target;
    switch (target) {
      case "text":
        setDatas({
          ...datas,
          editingType: openType,
          dialogTitle: title,
          isText: true,
          isImage: false,
          isVideo: false,
          componentEditDatas: editDatas,
          selectedEditDatas: {
            ID: editDatas.ID,
            ACTION: openType
          }
        });
        break;
      case "image":
        setDatas({
          ...datas,
          editingType: openType,
          dialogTitle: title,
          isText: false,
          isImage: true,
          isVideo: false,
          componentEditDatas: editDatas,
          selectedEditDatas: {
            ID: editDatas.ID,
            ACTION: openType
          }
        });
        break;
      case "video":
        setDatas({
          ...datas,
          editingType: openType,
          dialogTitle: title,
          isText: false,
          isImage: false,
          isVideo: true,
          componentEditDatas: editDatas,
          selectedEditDatas: {
            ID: editDatas.ID,
            ACTION: openType
          }
        });
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleCloseDialogComponentEditor = e => {
    console.log("OpenDialogComponentEditor --- 닫기");
    setIsOpenDlg(false);
    callbackFunc(false);
    // state 초기화
  };

  const callbackPropsEditData = (eTarget, eType, eData) => {
    console.log("callback - 컴포넌트 모달다이얼로그 에디터");
    console.log(" = eType", eType);
    console.log(" = eData", eData);

    let dTitle;
    switch (eType) {
      case "new":
        dTitle = "컴포넌트 생성";
        break;
      case "copy":
        dTitle = "컴포넌트 복제";
        break;
      case "edit":
        dTitle = "컴포넌트 편집";
        break;
      default:
        break;
    }

    switch (eTarget) {
      case "text":
        setDatas({
          ...datas,
          editingType: eType,
          dialogTitle: dTitle,
          isText: true,
          isImage: false,
          isVideo: false,
          componentEditDatas: eData,
          selectedEditDatas: {
            ID: eData.ID,
            ACTION: eType
          }
        });
        break;
      case "image":
        setDatas({
          ...datas,
          editingType: eType,
          dialogTitle: dTitle,
          isText: false,
          isImage: true,
          isVideo: false,
          componentEditDatas: eData,
          selectedEditDatas: {
            ID: eData.ID,
            ACTION: eType
          }
        });
        break;
      case "video":
        setDatas({
          ...datas,
          editingType: eType,
          dialogTitle: dTitle,
          isText: false,
          isImage: false,
          isVideo: true,
          componentEditDatas: eData,
          selectedEditDatas: {
            ID: eData.ID,
            ACTION: eType
          }
        });
        break;
      default:
        break;
    }
  };

  console.log("OpenDialogComponentEditor return 직전 ++");
  console.log(" - isOpen", isOpen);
  console.log(" - openParents", openParents);
  console.log(" - openType", openType);
  console.log(" - editInfos", editInfos);
  console.log(" - editDatas", editDatas);
  console.log(" - callbackFunc", callbackFunc);
  console.log(" - isOpenDlg", isOpenDlg);
  console.log(" - datas", datas);

  return (
    <ReactModalDialog
      isOpen={isOpenDlg}
      contentLabel="컴포넌트 에디터"
      className="componentEditorModalOveray"
      ariaHideApp={false}
    >
      <div className="componentAddBox">
        <div className="componentAddTitle">
          {dialogTitle}
          <button
            className="componentAdd_cancle"
            onClick={handleCloseDialogComponentEditor}
          >
            X
          </button>
        </div>
        <div className="listSection">
          <div className="component_tab">Component</div>
          <ListComponent
            isPopupUse={true}
            showList={editInfos.target}
            callbackPropsEditData={callbackPropsEditData}
            selectedEditDatas={selectedEditDatas}
          />
        </div>

        <div className="componentAdding" id="componentAdding">
          {isText ? (
            <ComponentEditorText
              editingType={editingType}
              editingDatas={componentEditDatas}
            />
          ) : null}
          {isImage ? (
            <ComponentEditorImage
              editingType={editingType}
              editingDatas={componentEditDatas}
            />
          ) : null}
          {isVideo ? (
            <ComponentEditorVideo
              editingType={editingType}
              editingDatas={componentEditDatas}
            />
          ) : null}
        </div>
      </div>
    </ReactModalDialog>
  );
};

export default OpenDialogComponentEditor;
