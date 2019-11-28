import React, { useState, useEffect, useRef, Fragment } from "react";
import ReactModal from "react-modal";
import { Container, Draggable } from "react-smooth-dnd";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import "./TemplateEditor.css";
import "./TemplateEditorMain.css";
import "./MainBodyCenterTemplateEditor.css";

import newTemplateIcon from "../img/positive-sign.png";
import deleteIcon from "../img/wastebasket.png";
import editIcon from "../img/editIcon.png";

const MainBodyCenterTemplateEditor = ({
  editDatas,
  insert,
  editDatasComponent,
  insertComponent,
  setActiveTab,
  setInitTemplate,
  setInitComponent,
  initComponent
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
    choiceData: {},
    choiceSortId: "",
    isChoice: false
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
  const { choiceId, choiceData, choiceSortId, isChoice } = innerComponent;

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

  useEffect(() => {
    const innerCompoId = editDatasComponent.ID;
    const innerCompoSortIdx = editDatasComponent.SORTIDX;

    // 아이디와 정렬순서를 가지고, COMPONENT 에서 일치하는 배열위치를 찾고, editDatasComponent 로 내용을 변경
    // const lookupData = COMPONENT.filter(list => list.ID === innerCompoId && list.SORTIDX === innerCompoSortIdx)[0];

    const change = [];
    COMPONENT.forEach(function(item, index) {
      let arr = {};
      if (item.ID === innerCompoId && item.SORTIDX === innerCompoSortIdx) {
        arr = editDatasComponent;
      } else {
        arr = { ...item };
      }

      change.push(arr);
    });

    const newDatas = {
      ...datas,
      COMPONENT: change
    };

    setDatas(newDatas);
    insert(newDatas);
  }, [editDatasComponent]);

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

    if (!isEmpty) {
      if (
        !window.confirm(
          "아직 편집 중인 템플릿이 배치되어 있습니다.\r\n그래도 신규 템플릿을 생성하시겠습니까? (확인을 클릭하면, 기존 편집 중인 템플릿 정보가 모두 소실됩니다.)"
        )
      ) {
        setIsOpenDlg(false);
        return false;
      }
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
    setInitTemplate(false);

    // 우측 속성탭 활성화 여부
    setActiveTab({
      tabActive: true,
      tabIndex: 0 // 0:템플릿속성Tab 1:컴포넌트속성Tab
    });

    const newDatas = {
      ID: "",
      TITLE: inputTitle,
      DESCRIPTION: "",
      WIDTH: inputWidth,
      HEIGHT: inputHeight,
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

    let changeId = "";
    const sortResult = [];
    result.forEach(function(item, index) {
      if (!initComponent.empty) {
        const innerCompoId = editDatasComponent.ID;
        const innerCompoSortIdx = editDatasComponent.SORTIDX;

        if (innerCompoId === item.ID && innerCompoSortIdx === item.SORTIDX) {
          changeId = index + "_" + item.ORGID;
        }
      }

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

    if (!initComponent.empty && changeId !== "") {
      // 컴포넌트 속성탭이 열려있을때...(아직 편집 및 저장 전 상태)
      // 템플릿 내 컴포넌트를 추가하거나 재배치하면 ID와 SORTIDX가 변동됨
      // 이에 맞춰서 editDatasComponent 를 수정해야함

      sortResult.forEach(function(item, index) {
        if (item.ID === changeId) {
          insertComponent({ ...item });
        }
      });
    }

    setInnerComponent({
      ...innerComponent,
      choiceId: payload.ID,
      choiceSortId: addedIndex,
      isChoice: false
    });
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
    setInitTemplate(true);

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

  const innerComponentClick = (id, sortIdx) => {
    setInnerComponent({
      ...innerComponent,
      choiceId: id,
      choiceSortId: sortIdx,
      isChoice: choiceId !== id ? true : !isChoice
    });
  };

  const innerComponentDelete = () => {
    if (window.confirm("배치된 컴포넌트를 제거하시겠습니까?")) {
      const lookupData = COMPONENT.filter(list => list.ID === choiceId)[0];
      const infos = {
        removedIndex: lookupData.SORTIDX,
        addedIndex: null,
        payload: lookupData
      };

      if (!initComponent.empty) {
        // 컴포넌트 속성탭이 열려있을때...(아직 편집 및 저장 전 상태)
        // 제거를 하고자 하는 컴포넌트와 editDatasComponent 를 비교하여 동일하면 setInitComponent 를 클리어
        if (choiceId === editDatasComponent.ID) {
          if (
            window.confirm(
              "편집이 완료되지 않은 상태입니다.(오른쪽 Component 속성탭을 확인하세요.) 그래도 제거하시겠습니까?"
            )
          ) {
            setInitComponent({
              empty: true
            });
          }
        }
      }

      applyDragInEditor(COMPONENT, infos);
    }
  };

  const innerComponentEdit = () => {
    if (window.confirm("배치된 컴포넌트를 편집하시겠습니까?")) {
      const lookupData = COMPONENT.filter(list => list.ID === choiceId)[0];

      setActiveTab({
        tabIndex: 1,
        tabActive: true,
        tabType: lookupData.TYPE
      });

      setInitComponent({
        empty: false // false로  해야 보임
      });
      insertComponent(lookupData);
    }
  };

  const makeInnerComponent = compo => {
    let cWidth =
      compo.ATTRIBUTE.BOX.WIDTH === 0
        ? ""
        : compo.ATTRIBUTE.BOX.WIDTH > WIDTH
        ? WIDTH + "px"
        : compo.ATTRIBUTE.BOX.WIDTH + "px";
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

    const outline =
      choiceSortId === compo.SORTIDX && isChoice ? "red dashed 3px" : "";
    const layerIcon =
      choiceSortId === compo.SORTIDX && isChoice
        ? "layerIcon"
        : "layerIcon hidden";

    const innerComponentStyle = {
      width: cWidth,
      height: cHeight,
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
      margin: margin,
      outline: outline
    };

    return (
      <div
        style={innerComponentStyle}
        onClick={() => innerComponentClick(compo.ID, compo.SORTIDX)}
      >
        {compo.TITLE}

        <div className={layerIcon}>
          <div className="compoDelete" onClick={innerComponentDelete}>
            <img src={deleteIcon} alt="deleteIcon" title="컴포넌트 제거" />
          </div>
          <div className="compoEdit" onClick={innerComponentEdit}>
            <img src={editIcon} alt="editIcon" title="컴포넌트 편집" />
          </div>
        </div>
      </div>
    );
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
