import React, { useState, useEffect, useRef } from "react";
import ReactModal from "react-modal";
import { Container, Draggable } from "react-smooth-dnd";

import "./TemplateEditor.css";
import "./TemplateEditorMain.css";
import "./MainBodyCenterTemplateEditor.css";

import newTemplateIcon from "../img/positive-sign.png";
import rightArrow from "../img/right-arrow.png";
import leftArrow from "../img/left-arrow.png";

const MainBodyCenterTemplateEditor = ({
  editDatas,
  insert,
  setActiveTab,
  setInit
}) => {
  const [isOpenDlg, setIsOpenDlg] = useState(false);
  const [editFlag, setEditFlag] = useState({
    isTemplate: true,
    isBeginning: true,
    isNew: true
  });
  const [datas, setDatas] = useState({
    ID: "",
    TITLE: "",
    DESCRIPTION: "",
    WIDTH: 0,
    HEIGHT: 0,
    ATTRIBUTE: {
      BOX: {
        BORDER: {
          BORDERWIDTH: 0,
          BORDERSTYLE: "",
          BORDERCOLOR: ""
        },
        PADDING: {
          PADDINGTOP: 0,
          PADDINGRIGHT: 0,
          PADDINGBOTTOM: 0,
          PADDINGLEFT: 0
        },
        MARGIN: {
          MARGINTOP: 0,
          MARGINRIGHT: 30,
          MARGINBOTTOM: 0,
          MARGINLEFT: 0
        },
        BACKGROUNDCOLOR: "",
        TEXTALIGN: ""
      }
    },
    COMPONENT: [],
    REGDATE: "",
    REGNAME: "",
    MAPPINGFIELD: ""
  });
  const [areaSize, setAreaSize] = useState({
    boxWidth: 0,
    boxHeight: 0,
    boxLeft: 0,
    boxTop: 0
  });
  const editorMainArea = useRef(null);

  const {
    ID,
    TITLE,
    DESCRIPTION,
    WIDTH,
    HEIGHT,
    ATTRIBUTE,
    COMPONENT,
    REGDATE,
    REGNAME,
    MAPPINGFIELD
  } = datas;
  const { isBeginning, isNew } = editFlag;
  const { boxWidth, boxHeight, boxLeft, boxTop } = areaSize;

  useEffect(() => {
    const propEditDatas = {
      ID: editDatas.ID,
      TITLE: editDatas.TITLE,
      DESCRIPTION: editDatas.DESCRIPTION,
      WIDTH: editDatas.WIDTH,
      HEIGHT: editDatas.HEIGHT,
      ATTRIBUTE: editDatas.ATTRIBUTE,
      COMPONENT: editDatas.COMPONENT,
      REGDATE: editDatas.REGDATE,
      REGNAME: editDatas.REGNAME,
      MAPPINGFIELD: editDatas.MAPPINGFIELD
    };
    setDatas(propEditDatas);

    if (WIDTH !== editDatas.WIDTH || HEIGHT !== editDatas.HEIGHT) {
      adjustBox();
    }
  }, [editDatas.TITLE, editDatas.WIDTH, editDatas.HEIGHT]);

  const adjustBox = () => {
    const cWidth = editorMainArea.current.clientWidth;
    const left = cWidth > WIDTH ? (cWidth - WIDTH) / 2 : 0;

    setAreaSize({
      boxWidth: editorMainArea.current.clientWidth,
      boxHeight: editorMainArea.current.clientHeight,
      boxLeft: left,
      boxTop: 0
    });
  };

  const handleOpenDialog = e => {
    setIsOpenDlg(true);
  };

  const handleCloseDialog = e => {
    setIsOpenDlg(false);
  };

  const handleOnChange = e => {
    setDatas({
      ...datas,
      [e.target.name]: e.target.value
    });
  };

  const handleMakeNewTemplate = e => {
    setIsOpenDlg(false);
    setEditFlag({
      isBeginning: false,
      isNew: true
    });

    setInit(false);
    setActiveTab({
      tabActive: true,
      tabIndex: 0 // 0:템플릿속성Tab 1:컴포넌트속성Tab
    });

    insert({
      ...datas,
      TITLE: TITLE,
      WIDTH: WIDTH,
      HEIGHT: HEIGHT
    });

    adjustBox();
  };

  const applyDragInEditor = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    console.log("arr", arr); // 현재 STATE
    console.log("removedIndex", removedIndex); // 위아래 위치 이동시 사용
    console.log("addedIndex", addedIndex); // 추가할때마다 + 위아래 위치 이동시
    console.log("payload", payload); // DROP된 데이터

    const result = [...arr];
    let itemToAdd = {
      ID: payload.ID,
      ORGID: payload.ORGID,
      TYPE: payload.TYPE,
      CATEGORY: payload.CATEGORY,
      TITLE: payload.TITLE,
      SORTIDX: addedIndex
    };

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }

    const sortResult = [];
    result.forEach(function(item, index) {
      const arr = {
        ...item,
        ID: index + "_" + item.ORGID,
        SORTIDX: index
      };
      sortResult.push(arr);
    });

    const newDatas = {
      ...datas,
      COMPONENT: sortResult
    };

    setDatas(newDatas);
    insert(newDatas);
  };

  const onDblClick = e => {
    console.log(e);
  };

  const templateEditBoxStyle = {
    position: "absolute",
    left: boxLeft === 0 ? "300px" : boxLeft,
    border: "4px dashed #bcbcbc",
    width: WIDTH === 0 ? "500px" : WIDTH + "px",
    height: HEIGHT === 0 ? "600px" : HEIGHT + "px"
  };

  const dndContainerStyle = {
    minHeight: HEIGHT === 0 ? "100px" : HEIGHT + "px",
    minWidth: WIDTH === 0 ? "100px" : WIDTH + "px"
  };

  return (
    <div>
      <div className="editorHeader">
        <div className="openDialogBtn">
          <img
            className="newTemplateDialogOpen"
            src={newTemplateIcon}
            alt="newTemplateDialogOpenBtn"
            onClick={handleOpenDialog}
          />
          <ReactModal
            isOpen={isOpenDlg}
            contentLabel="신규 템플릿 생성"
            className="newTemplateModalOveray"
            ariaHideApp={false}
          >
            <div className="createBox">
              <div className="templateId">템플릿 아이디 : {ID}</div>
              <input
                type="text"
                className="templateName"
                placeholder="템플릿 이름"
                name="TITLE"
                value={TITLE}
                onChange={handleOnChange}
              />
              <div className="template_width_tx">width</div>{" "}
              <input
                type="number"
                className="template_width"
                name="WIDTH"
                value={WIDTH}
                onChange={handleOnChange}
              />
              <div className="width_px">px</div>
              <div className="template_height_tx">height</div>{" "}
              <input
                type="number"
                className="template_height"
                name="HEIGHT"
                value={HEIGHT}
                onChange={handleOnChange}
              />
              <div className="height_px">px</div>
              <button
                className="NewTemplate_cancle"
                onClick={handleCloseDialog}
              >
                취소
              </button>
              <button
                className="NewTemplate_create"
                onClick={handleMakeNewTemplate}
              >
                생성
              </button>
            </div>
          </ReactModal>
        </div>
        <div className="openTemplateName">
          <span className="tName">{TITLE} </span>
          <span className="tSize">
            {WIDTH > 0 && HEIGHT > 0 ? "(" + WIDTH + " X " + HEIGHT + ")" : ""}
          </span>
        </div>
        <div className="openTemplateRegInfo"></div>
      </div>
      <div className="editorMain" ref={editorMainArea}>
        <div style={templateEditBoxStyle}>
          {isBeginning ? (
            <div className="dropZone">
              편집 작업을 진행할 템플릿을 좌측 목록에서 Drag하여 Drop하세요.
            </div>
          ) : (
            <Container
              groupName="dragndropArea"
              getChildPayload={i => COMPONENT[i]}
              onDrop={e => applyDragInEditor(COMPONENT, e)}
              render={ref => (
                <div style={dndContainerStyle} ref={ref}>
                  {COMPONENT.map(compo => (
                    <Draggable key={compo.ID}>
                      <div
                        className="draggable-item"
                        onDoubleClick={onDblClick}
                      >
                        {compo.TITLE}
                      </div>
                    </Draggable>
                  ))}
                </div>
              )}
            ></Container>
          )}
        </div>
      </div>
      <div className="editorFooter">
        <div className="actionBtn">
          <button className="reset">초기화</button>
          <button className="save">저장</button>
        </div>
      </div>
    </div>
  );
};

export default MainBodyCenterTemplateEditor;
