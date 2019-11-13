import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import "./TemplateEditor.css";

import OpenDialogComponentEditor from "./OpenDialogComponentEditor.js";

const OpenDialogNewComponent = ({ openType }) => {
  const [editDatas, setEditDatas] = useState({
    ID: "",
    TITLE: "",
    CATEGORY: "",
    ATTRIBUTE: {
      BOX: {
        WIDTH: 0,
        HEIGHT: 0,
        BORDER: {},
        PADDING: {},
        MARGIN: {}
      },
      FONT: {
        FONTSIZE: 0,
        FONTWEIGHT: "",
        FONTFAMILY: "",
        FONTSTYLE: "",
        LINEHEIGHT: 0
      },
      LINK: {
        URL: "",
        TARGET: "_blank"
      },
      MAPPING: {
        FIELD: ""
      },
      ICON: {
        TYPE: "",
        LOCATION: "front"
      },
      PHOTOINFO: {
        PHOTODATE: "",
        PHOTOPLACE: ""
      },
      FILEINFO: {
        FILENAME: "",
        FILEPATH: "",
        FILEFORMAT: "",
        DESCRIPTION: "",
        CAPTION: "",
        FILESIZE: "",
        RESOLUTION: "",
        PLAYTIME: "",
        HEADIMAGE: ""
      },
      WATERMARK: false,
      AUTOPLAY: false
    }
  });
  const [datas, setDatas] = useState({
    componentName: "",
    componentType: "text",
    componentPattern: "제목",
    isText: false,
    isImage: false,
    isVideo: false,
    isOpenEditor: false,
    choiceInfo: {
      target: ""
    },
    TEXT: [
      "제목",
      "부제목",
      "소제목",
      "표제",
      "본문",
      "발문",
      "날짜",
      "관련기사",
      "주요기사",
      "바이라인",
      "출처",
      "분류",
      "라벨"
    ],
    IMAGE: ["이미지일반"],
    VIDEO: ["동영상일반"]
  });
  const [isOpenDlg, setIsOpenDlg] = useState(false);

  const {
    componentName,
    componentType,
    componentPattern,
    isText,
    isImage,
    isVideo,
    isOpenEditor,
    choiceInfo,
    TEXT,
    IMAGE,
    VIDEO
  } = datas;

  useEffect(() => {
    switch (openType) {
      case "text":
        setDatas({
          ...datas,
          componentType: openType,
          isText: true,
          isImage: false,
          isVideo: false,
          isOpenEditor: false,
          choiceInfo: {
            target: "text"
          }
        });
        break;
      case "image":
        setDatas({
          ...datas,
          componentType: openType,
          isText: false,
          isImage: true,
          isVideo: false,
          isOpenEditor: false,
          choiceInfo: {
            target: "image"
          }
        });
        break;
      case "video":
        setDatas({
          ...datas,
          componentType: openType,
          isText: false,
          isImage: false,
          isVideo: true,
          isOpenEditor: false,
          choiceInfo: {
            target: "video"
          }
        });
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openType]);

  const handleOnChange = e => {
    const name = e.target.name;
    const val = e.target.value;

    if (name === "componentType") {
      switch (val) {
        case "text":
          setDatas({
            ...datas,
            componentType: val,
            componentPattern: "제목",
            isText: true,
            isImage: false,
            isVideo: false,
            choiceInfo: {
              target: "text"
            }
          });
          break;
        case "image":
          setDatas({
            ...datas,
            componentType: val,
            componentPattern: "이미지일반",
            isText: false,
            isImage: true,
            isVideo: false,
            choiceInfo: {
              target: "image"
            }
          });
          break;
        case "video":
          setDatas({
            ...datas,
            componentType: val,
            componentPattern: "동영상일반",
            isText: false,
            isImage: false,
            isVideo: true,
            choiceInfo: {
              target: "video"
            }
          });
          break;
        default:
          break;
      }
    } else {
      setDatas({
        ...datas,
        [name]: val
      });
    }
  };

  const handleOpenDialogNewComponent = e => {
    setIsOpenDlg(true);
  };

  const handleCloseDialogNewComponent = e => {
    setIsOpenDlg(false);
    // state 초기화
  };

  const handleOpenComponentEditDialog = e => {
    setIsOpenDlg(false);
    setDatas({
      ...datas,
      isOpenEditor: true
    });

    setEditDatas({
      ...editDatas,
      ID: "",
      TITLE: componentName,
      CATEGORY: componentPattern
    });
  };

  const callbackSetFlag = flag => {
    console.log("newcomponent dialog 콜백");
    setDatas({
      ...datas,
      isOpenEditor: flag
    });
  };

  const openEditorType = "new";

  return (
    <div>
      <button className="compoAdd" onClick={handleOpenDialogNewComponent}>
        Componenet Type 추가
      </button>
      <ReactModal
        isOpen={isOpenDlg}
        contentLabel="신규 컴포넌트 생성"
        className="newComponentModalOveray"
        ariaHideApp={false}
      >
        <div className="createBox">
          <div className="PopAddTitle">Component 추가</div>
          <input
            type="text"
            className="PopAddName"
            onChange={handleOnChange}
            placeholder="컴포넌트 이름"
            name="componentName"
            value={componentName}
          />
          <div className="componentAdd_type_tx">종류</div>
          <select
            className="componentAdd_type"
            onChange={handleOnChange}
            name="componentType"
            value={componentType}
          >
            <option value="text">TEXT</option>
            <option value="image">IMAGE</option>
            <option value="video">VIDEO</option>
          </select>
          <div className="componentAdd_cate_tx">유형</div>
          <select
            className="componentAdd_cate"
            onChange={handleOnChange}
            name="componentPattern"
            value={componentPattern}
          >
            {isText
              ? TEXT.map(list => (
                  <option key={list} value={list}>
                    {list}
                  </option>
                ))
              : null}
            {isImage
              ? IMAGE.map(list => (
                  <option key={list} value={list}>
                    {list}
                  </option>
                ))
              : null}
            {isVideo
              ? VIDEO.map(list => (
                  <option key={list} value={list}>
                    {list}
                  </option>
                ))
              : null}
          </select>
          <button
            className="compoAdd_cancle"
            onClick={handleCloseDialogNewComponent}
          >
            취소
          </button>
          <button
            className="compoAdd_create"
            onClick={handleOpenComponentEditDialog}
          >
            확인
          </button>
        </div>
      </ReactModal>
      {isOpenEditor ? (
        <OpenDialogComponentEditor
          isOpen={isOpenEditor}
          openType={openEditorType}
          editInfos={choiceInfo}
          editDatas={editDatas}
          callbackFunc={callbackSetFlag}
        />
      ) : null}
    </div>
  );
};

export default OpenDialogNewComponent;
