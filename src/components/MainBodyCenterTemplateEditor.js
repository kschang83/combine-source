import React, { useState, useEffect, useRef } from "react";
import ReactModal from "react-modal";
import { Container, Draggable } from "react-smooth-dnd";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import "./TemplateEditor.css";
import "./TemplateEditorMain.css";
import "./MainBodyCenterTemplateEditor.css";

import newTemplateIcon from "../img/positive-sign.png";

const MainBodyCenterTemplateEditor = ({
  editDatas,
  insert,
  setActiveTab,
  setInit
}) => {
  const [isOpenDlg, setIsOpenDlg] = useState(false);
  const [editFlag, setEditFlag] = useState({
    isTemplate: true,
    isEmpty: true,
    isNew: true
  });
  const [inputDatas, setInputDatas] = useState({
    inputTitle: "",
    inputWidth: 0,
    inputHeight: 0
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
          MARGINRIGHT: 0,
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
    boxLeft: 300,
    boxTop: 0
  });
  const [innerComponent, setInnerComponent] = useState({
    choiceId: "",
    choiceData: {}
  });
  const editorMainArea = useRef(null);

  const { inputTitle, inputWidth, inputHeight } = inputDatas;
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
  const { isTemplate, isEmpty, isNew } = editFlag;
  const { boxWidth, boxHeight, boxLeft, boxTop } = areaSize;
  const { choiceId, choiceData } = innerComponent;

  useEffect(() => {
    setDatas({
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
    });

    if (WIDTH !== editDatas.WIDTH || HEIGHT !== editDatas.HEIGHT) {
      adjustBox(editDatas.WIDTH, editDatas.HEIGHT);
    }
  }, [editDatas]);

  // 에디팅 div 영역 가운데 정렬
  const adjustBox = (w, h) => {
    const cWidth = editorMainArea.current.clientWidth;
    const left = cWidth > w ? (cWidth - w) / 2 : 0;

    setAreaSize({
      boxWidth: editorMainArea.current.clientWidth,
      boxHeight: editorMainArea.current.clientHeight,
      boxLeft: left,
      boxTop: 0
    });
  };

  // 신규 템플릿 생성 다이얼로그 내 input 영역 Enter key 처리
  const handleOnKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleMakeNewTemplate(e);
    }
  };

  // 신규 템플릿 생성 다이얼로드 열기
  const handleOpenDialog = e => {
    setIsOpenDlg(true);
  };

  // 신규 템플릿 생성 다이얼로드 닫기
  const handleCloseDialog = e => {
    setInputDatas({
      inputTitle: "",
      inputWidth: 0,
      inputHeight: 0
    });
    setIsOpenDlg(false);
  };

  // 신규 템플릿 생성 다이얼로그 내 input 영역 state 업데이트
  const handleOnChange = e => {
    setInputDatas({
      ...inputDatas,
      [e.target.name]: e.target.value
    });
  };

  // 신규 템플릿 생성
  const handleMakeNewTemplate = e => {
    if (inputTitle.length === 0) {
      alert("템플릿 이름을 입력하세요.");
      return false;
    }

    if (inputWidth <= 0) {
      alert("템플릿 width를 정수로 입력하세요.");
      return false;
    }
    if (inputWidth < 300) {
      alert("템플릿 width 최소는 300px 입니다. 300px보다 크게 지정해주세요.");
      return false;
    }

    if (inputHeight <= 0) {
      alert("템플릿 height를 정수로 입력하세요.");
      return false;
    }
    if (inputHeight < 300) {
      alert("템플릿 height 최소는 300px 입니다. 300px보다 크게 지정해주세요.");
      return false;
    }

    // 신규 템플릿 생성 다이얼로그 닫기 (state)
    setIsOpenDlg(false);

    // 각종 flag 처리
    setEditFlag({
      isTemplate: true,
      isEmpty: false,
      isNew: true
    });

    // 우측 템플릿 속성영역 사용여부 (false로 셋팅해야 보임)
    setInit(false);

    // 우측 속성탭 활성화 여부
    setActiveTab({
      tabActive: true,
      tabIndex: 0 // 0:템플릿속성Tab 1:컴포넌트속성Tab
    });

    const newDatas = {
      ...datas,
      TITLE: inputTitle,
      WIDTH: inputWidth,
      HEIGHT: inputHeight
    };

    setDatas(newDatas); // state 반영
    insert(newDatas); // redux store 반영

    // 신규 생성 다이얼로그 input 값 초기화
    setInputDatas({
      inputTitle: "",
      inputWidth: 0,
      inputHeight: 0
    });

    adjustBox(inputWidth, inputHeight);
  };

  // 에디팅 영역 드롭되었을 때의 처리
  const applyDragInEditor = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    console.log("arr", arr);
    console.log("removedIndex", removedIndex);
    console.log("addedIndex", addedIndex);
    console.log("payload", payload);

    const result = [...arr];
    let itemToAdd = {
      ID: payload.ID,
      ORGID: payload.ORGID,
      TYPE: payload.TYPE,
      CATEGORY: payload.CATEGORY,
      TITLE: payload.TITLE,
      SORTIDX: addedIndex,
      ATTRIBUTE: payload.ATTRIBUTE
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

  // 템플릿 저장
  const save = () => {
    alert("저장완료!!");

    const resetDatas = {
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
            MARGINRIGHT: 0,
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
    };

    // 각종 flag 초기화
    setEditFlag({
      isTemplate: true,
      isEmpty: true,
      isNew: true
    });

    // 우측 템플릿 속성영역 초기화
    setInit(true);

    setDatas(resetDatas); // state 초기화
    insert(resetDatas); // redux store 값 초기화 반영

    // 에디팅영역 box 사이즈 초기화
    setAreaSize({
      boxWidth: 0,
      boxHeight: 0,
      boxLeft: 300,
      boxTop: 0
    });

    // 신규 생성 다이얼로그 input 값 초기화
    setInputDatas({
      inputTitle: "",
      inputWidth: 0,
      inputHeight: 0
    });
  };

  const dndContainerStyle = {
    minHeight: HEIGHT === 0 ? "100px" : HEIGHT + "px",
    minWidth: WIDTH === 0 ? "100px" : WIDTH + "px"
  };

  const templateEditBoxStyle = {
    position: "absolute",
    left: boxLeft + "px",
    border: "4px dashed #bcbcbc",
    width: WIDTH === 0 ? "500px" : WIDTH + "px",
    height: HEIGHT === 0 ? "600px" : HEIGHT + "px"
  };

  const makeInlineStyle = (type, infos) => {
    switch (type) {
      case "BORDER":
        const templateAreaBorderWidth =
          infos.BORDERWIDTH > 0 ? infos.BORDERWIDTH + "px" : "";
        const templateAreaBorderStyle =
          infos.BORDERSTYLE !== "" ? infos.BORDERSTYLE : "";
        const templateAreaBorderColor =
          infos.BORDERCOLOR !== "" ? infos.BORDERCOLOR : "";
        return (
          templateAreaBorderWidth +
          " " +
          templateAreaBorderStyle +
          " " +
          templateAreaBorderColor
        );
      case "PADDING":
        return (
          infos.PADDINGTOP +
          "px " +
          infos.PADDINGRIGHT +
          "px " +
          infos.PADDINGBOTTOM +
          "px " +
          infos.PADDINGLEFT +
          "px"
        );
      case "MARGIN":
        return (
          infos.MARGINTOP +
          "px " +
          infos.MARGINRIGHT +
          "px " +
          infos.MARGINBOTTOM +
          "px " +
          infos.MARGINLEFT +
          "px"
        );
      default:
        return "";
    }
  };
  const templateRealArea = {
    border: makeInlineStyle("BORDER", ATTRIBUTE.BOX.BORDER),
    padding: makeInlineStyle("PADDING", ATTRIBUTE.BOX.PADDING),
    margin: makeInlineStyle("MARGIN", ATTRIBUTE.BOX.MARGIN),
    width: WIDTH + "px",
    height: HEIGHT + "px"
  };

  const handleInnerComponent = (e, d, target) => {
    e.preventDefault();
    const action = d.action;
    const lookupData = COMPONENT.filter(list => list.ID === choiceId)[0];

    const infos = {
      removedIndex: lookupData.SORTIDX,
      addedIndex: null,
      payload: lookupData
    };

    switch (action) {
      case "edit":
        innerComponentEdit(lookupData);
        break;
      case "delete":
        applyDragInEditor(COMPONENT, infos);
        break;
      default:
        break;
    }
  };

  const innerComponentEdit = d => {
    alert("편집");
  };

  const makeInnerComponent = compo => {
    console.log(compo);

    let cWidth =
      compo.ATTRIBUTE.BOX.WIDTH > 0 ? compo.ATTRIBUTE.BOX.WIDTH + "px" : "";
    let cHeight =
      compo.ATTRIBUTE.BOX.HEIGHT > 0 ? compo.ATTRIBUTE.BOX.HEIGHT + "px" : "";
    const textAlign = compo.ATTRIBUTE.BOX.TEXTALIGN;
    const backgroundColor = compo.ATTRIBUTE.BOX.BACKGROUNDCOLOR;
    const lineHeight =
      compo.ATTRIBUTE.FONT.LINEHEIGHT > 0
        ? compo.ATTRIBUTE.FONT.LINEHEIGHT + "px"
        : "";
    const fontSize =
      compo.ATTRIBUTE.FONT.FONTSIZE > 0
        ? compo.ATTRIBUTE.FONT.FONTSIZE + "px"
        : "";
    const fontWeight = compo.ATTRIBUTE.FONT.FONTWEIGHT;
    const fontFamily = compo.ATTRIBUTE.FONT.FONTFAMILY;
    const fontStyle = compo.ATTRIBUTE.FONT.FONTSTYLE;
    const color = compo.ATTRIBUTE.FONT.COLOR;

    const border =
      compo.ATTRIBUTE.BOX.BORDER.BORDERWIDTH > 0
        ? makeInlineStyle("BORDER", compo.ATTRIBUTE.BOX.BORDER)
        : "";
    const padding = makeInlineStyle("PADDING", compo.ATTRIBUTE.BOX.PADDING);
    const margin = makeInlineStyle("MARGIN", compo.ATTRIBUTE.BOX.MARGIN);

    if (cWidth > WIDTH) cWidth = WIDTH;

    const innerComponentStyle = {
      width: cWidth + "px",
      height: cHeight + "px",
      textAlign: textAlign,
      backgroundColor: backgroundColor,
      lineHeight: lineHeight,
      fontSize: fontSize,
      fontWeight: fontWeight,
      fontFamily: fontFamily,
      fontStyle: fontStyle,
      color: color,
      border: border,
      padding: padding,
      margin: margin
    };

    /*
    return (
      <ContextMenuTrigger
        id="innerComponentContextMenu"
        key={"inner_" + compo.ID}
        collect={() =>
          setInnerComponent({
            ...innerComponent,
            choiceId: compo.ID
          })
        }
      >
        <div style={innerComponentStyle}>{compo.TITLE}</div>
      </ContextMenuTrigger>
    );
    */

    //return <div className="draggable-item">{compo.TITLE}</div>;

    return <div style={innerComponentStyle}>{compo.TITLE}</div>;
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
                name="inputTitle"
                value={inputTitle}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
              />
              <div className="template_width_tx">width</div>{" "}
              <input
                type="number"
                className="template_width"
                name="inputWidth"
                value={inputWidth}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
              />
              <div className="width_px">px</div>
              <div className="template_height_tx">height</div>{" "}
              <input
                type="number"
                className="template_height"
                name="inputHeight"
                value={inputHeight}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
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
          {isEmpty ? (
            <div className="dropZone">
              편집 작업을 진행할 템플릿을 좌측 목록에서 Drag하여 Drop하세요.
            </div>
          ) : (
            <div style={templateRealArea}>
              <Container
                groupName="dragndropArea"
                getChildPayload={i => COMPONENT[i]}
                onDrop={e => applyDragInEditor(COMPONENT, e)}
                render={ref => (
                  <div style={dndContainerStyle} ref={ref}>
                    {COMPONENT.map(compo => (
                      <Draggable
                        key={compo.ID}
                        render={() => makeInnerComponent(compo)}
                      ></Draggable>
                    ))}
                  </div>
                )}
              ></Container>
              <ContextMenu id="innerComponentContextMenu">
                <MenuItem
                  data={{ action: "edit" }}
                  onClick={handleInnerComponent}
                >
                  컴포넌트 편집
                </MenuItem>
                <MenuItem
                  data={{ action: "delete" }}
                  onClick={handleInnerComponent}
                >
                  컴포넌트 제거
                </MenuItem>
              </ContextMenu>
            </div>
          )}
        </div>
      </div>
      <div className="editorFooter">
        {isEmpty ? null : (
          <div className="actionBtn">
            <button className="reset">초기화</button>
            <button className="save" onClick={save}>
              저장
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainBodyCenterTemplateEditor;
