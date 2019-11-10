import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";

import "./TemplateEditor.css";
import "./TemplateEditorMain.css";
import "./MainBodyCenterTemplateEditor.css";

import newTemplateIcon from "../img/positive-sign.png";
import rightArrow from "../img/right-arrow.png";
import leftArrow from "../img/left-arrow.png";

const MainBodyCenterTemplateEditor = ({
  editDatas,
  onInsert,
  setActiveTab
}) => {
  const [isOpenDlg, setIsOpenDlg] = useState(false);
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
      },
      COMPONENT: {
        TEXT: [
          {
            ID: "",
            TITLE: "",
            COUNT: 0
          }
        ],
        IMAGE: [
          {
            ID: "",
            TITLE: "",
            COUNT: 0
          }
        ]
      },
      REGDATE: "",
      REGNAME: "",
      MAPPING: {
        FIELD: ""
      }
    }
  });

  const { ID, TITLE, DESCRIPTION, WIDTH, HEIGHT, ATTRIBUTE } = datas;

  useEffect(() => {
    const propEditDatas = {
      ID: editDatas.ID,
      TITLE: editDatas.TITLE,
      DESCRIPTION: editDatas.DESCRIPTION,
      WIDTH: editDatas.WIDTH,
      HEIGHT: editDatas.HEIGHT,
      ATTRIBUTE: editDatas.ATTRIBUTE
    };
    setDatas(propEditDatas);
  }, [editDatas.TITLE, editDatas.WIDTH, editDatas.HEIGHT]);

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
    onInsert(datas);

    const activeTab = {
      tabActive: true,
      tabIndex: 0 // 0:템플릿속성Tab 1:컴포넌트속성Tab
    };
    setActiveTab(activeTab);
  };

  return (
    <div>
      <div className="editorHeader" id="editorHeader">
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
      <div className="editorMain" id="TemplateEditorAreaMain"></div>
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
