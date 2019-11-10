import React, { useState, useEffect } from "react";
import ReactModalDialog from "react-modal";
import "./TemplateEditor.css";

import ListComponent from "./ListComponent.js";
import ComponentEditorText from "./ComponentEditorText.js";
import ComponentEditorImage from "./ComponentEditorImage.js";
import ComponentEditorVideo from "./ComponentEditorVideo.js";

const OpenDialogComponentEditor = ({
  isOpen,
  openType,
  editInfos,
  editDatas,
  callbackFunc
}) => {
  const [isOpenDlg, setIsOpenDlg] = useState(false);
  const [datas, setDatas] = useState({
    editingType: "new",
    isNew: false,
    isText: false,
    isImage: false,
    isVideo: false
  });

  const { editingType, isNew, isText, isImage, isVideo } = datas;

  console.log("OpenDialogComponentEditor -- info");
  console.log("isOpen", isOpen);
  console.log("openType", openType);
  console.log("editInfos", editInfos);
  console.log("callbackFunc", callbackFunc);
  console.log("datas", datas);
  console.log("isOpenDlg", isOpenDlg);
  console.log("---------------------------");

  useEffect(() => {
    setIsOpenDlg(isOpen);

    let isNewFlag;
    switch (openType) {
      case "new":
        isNewFlag = true;
        break;
      case "edit":
      case "copy":
        isNewFlag = false;
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
          isNew: isNewFlag,
          isText: true,
          isImage: false,
          isVideo: false
        });
        break;
      case "image":
        setDatas({
          ...datas,
          editingType: openType,
          isNew: isNewFlag,
          isText: false,
          isImage: true,
          isVideo: false
        });
        break;
      case "video":
        setDatas({
          ...datas,
          editingType: openType,
          isNew: isNewFlag,
          isText: false,
          isImage: false,
          isVideo: true
        });
        break;
      default:
        break;
    }

    console.log("OpenDialogComponentEditor -- useEffect");
    console.log("isOpen", isOpen);
    console.log("openType", openType);
    console.log("editInfos", editInfos);
    console.log("callbackFunc", callbackFunc);
    console.log("datas", datas);
    console.log("isOpenDlg", isOpenDlg);
    console.log("---------------------------");
  }, [isOpen]);

  const handleCloseDialogComponentEditor = e => {
    console.log("OpenDialogComponentEditor --- 닫기");
    setIsOpenDlg(false);
    callbackFunc(false);
    // state 초기화
  };

  return (
    <ReactModalDialog
      isOpen={isOpenDlg}
      contentLabel="컴포넌트 에디터"
      className="componentEditorModalOveray"
      ariaHideApp={false}
    >
      <div className="componentAddBox">
        <div className="componentAddTitle">
          {isNew ? "Component 생성" : "Component 편집"}
          <button
            className="componentAdd_cancle"
            onClick={handleCloseDialogComponentEditor}
          >
            X
          </button>
        </div>
        <div className="listSection">
          <div className="component_tab">Component</div>
          <ListComponent isPopupUse={true} />
        </div>

        <div className="componentAdding" id="componentAdding">
          {isText ? (
            <ComponentEditorText
              editingType={editingType}
              editingDatas={editDatas}
            />
          ) : null}
          {isImage ? (
            <ComponentEditorImage
              editingType={editingType}
              editingDatas={editDatas}
            />
          ) : null}
          {isVideo ? (
            <ComponentEditorVideo
              editingType={editingType}
              editingDatas={editDatas}
            />
          ) : null}
        </div>
      </div>
    </ReactModalDialog>
  );
};

export default OpenDialogComponentEditor;
