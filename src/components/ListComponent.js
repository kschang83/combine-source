import React, { useState, useEffect } from "react";
import "./TemplateEditor.css";
import "./TemplateEditorMain.css";

import ListComponentText from "./ListComponentText.js";
import ListComponentImage from "./ListComponentImage.js";
import ListComponentVideo from "./ListComponentVideo.js";

const ListComponent = ({
  isPopupUse,
  showList,
  callbackPropsEditData,
  selectedEditDatas
}) => {
  const [componentDatas, setComponentDatas] = useState({
    TEXT: [
      {
        TYPE: "TEXT",
        CATEGORY: "제목",
        ID: "TX1",
        ORGID: "TX1",
        TITLE: "제목",
        ATTRIBUTE: {
          BOX: {
            WIDTH: 550,
            HEIGHT: 40,
            BORDER: {
              BORDERWIDTH: 0,
              BORDERSTYLE: "none",
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
            BACKGROUNDCOLOR: "#FFFFFF",
            TEXTALIGN: ""
          },
          ICON: {
            TYPE: "none",
            NUMBER: "",
            LOCATION: "front"
          },
          FONT: {
            FONTFAMILY: "맑은 고딕",
            FONTSIZE: 19,
            FONTSTYLE: "normal",
            FONTWEIGHT: "bold",
            COLOR: "#191919",
            LINEHEIGHT: 40
          },
          LINK: {
            URL: "",
            TARGET: "_blank"
          },
          MAPPING: {
            FIELD: "TITLE"
          }
        }
      },
      {
        TYPE: "TEXT",
        CATEGORY: "부제목",
        ID: "TX2",
        ORGID: "TX2",
        TITLE: "부제목",
        ATTRIBUTE: {
          BOX: {
            WIDTH: 550,
            HEIGHT: 40,
            BORDER: {
              BORDERWIDTH: 0,
              BORDERSTYLE: "none",
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
            "BACKGROUND-COLOR": "#FFFFFF",
            TEXTALIGN: ""
          },
          ICON: {
            NUMBER: "",
            LOCATION: "front"
          },
          FONT: {
            FONTFAMILY: "맑은 고딕",
            FONTSIZE: 17,
            FONTSTYLE: "normal",
            FONTWEIGHT: "bold",
            COLOR: "#191919",
            LINEHEIGHT: 40
          },
          LINK: {
            URL: "",
            TARGET: "_blank"
          },
          MAPPING: {
            FIELD: "SUBTITLE"
          }
        }
      },
      {
        TYPE: "TEXT",
        CATEGORY: "소제목",
        ID: "TX3",
        ORGID: "TX3",
        TITLE: "소제목",
        ATTRIBUTE: {
          BOX: {
            WIDTH: 550,
            HEIGHT: 40,
            BORDER: {
              BORDERWIDTH: 0,
              BORDERSTYLE: "none",
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
            "BACKGROUND-COLOR": "#FFFFFF",
            TEXTALIGN: ""
          },
          ICON: {
            NUMBER: "",
            LOCATION: "front"
          },
          FONT: {
            FONTFAMILY: "맑은 고딕",
            FONTSIZE: 17,
            FONTSTYLE: "normal",
            FONTWEIGHT: "bold",
            COLOR: "#191919",
            LINEHEIGHT: 40
          },
          LINK: {
            URL: "",
            TARGET: "_blank"
          },
          MAPPING: {
            FIELD: "STRAPLINE"
          }
        }
      },
      {
        TYPE: "TEXT",
        CATEGORY: "표제",
        ID: "TX4",
        ORGID: "TX4",
        TITLE: "표제",
        ATTRIBUTE: {
          BOX: {
            WIDTH: 550,
            HEIGHT: 80,
            BORDER: {
              BORDERWIDTH: 0,
              BORDERSTYLE: "none",
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
            "BACKGROUND-COLOR": "#FFFFFF",
            TEXTALIGN: "center"
          },
          ICON: {
            NUMBER: "",
            LOCATION: "front"
          },
          FONT: {
            FONTFAMILY: "맑은 고딕",
            FONTSIZE: 15,
            FONTSTYLE: "normal",
            FONTWEIGHT: "bold",
            COLOR: "#191919",
            LINEHEIGHT: 40
          },
          LINK: {
            URL: "",
            TARGET: "_blank"
          },
          MAPPING: {
            FIELD: "HEADLINE"
          }
        }
      },
      {
        TYPE: "TEXT",
        CATEGORY: "본문",
        ID: "TX5",
        ORGID: "TX5",
        TITLE: "본문",
        ATTRIBUTE: {
          BOX: {
            WIDTH: 600,
            HEIGHT: 800,
            BORDER: {
              BORDERWIDTH: 0,
              BORDERSTYLE: "none",
              BORDERCOLOR: ""
            },
            PADDING: {
              PADDINGTOP: 10,
              PADDINGRIGHT: 20,
              PADDINGBOTTOM: 10,
              PADDINGLEFT: 20
            },
            MARGIN: {
              MARGINTOP: 0,
              MARGINRIGHT: 30,
              MARGINBOTTOM: 0,
              MARGINLEFT: 0
            },
            "BACKGROUND-COLOR": "#FFFFFF",
            TEXTALIGN: "center"
          },
          ICON: {
            NUMBER: "",
            LOCATION: "front"
          },
          FONT: {
            FONTFAMILY: "맑은 고딕",
            FONTSIZE: 14,
            FONTSTYLE: "normal",
            FONTWEIGHT: "bold",
            COLOR: "#363636",
            LINEHEIGHT: 20
          },
          LINK: {
            URL: "",
            TARGET: "_blank"
          },
          MAPPING: {
            FIELD: "BODY"
          }
        }
      },
      {
        TYPE: "TEXT",
        CATEGORY: "발문",
        ID: "TX6",
        ORGID: "TX6",
        TITLE: "발문",
        ATTRIBUTE: {
          BOX: {
            WIDTH: 500,
            HEIGHT: 60,

            BORDER: {
              BORDERWIDTH: 0,
              BORDERSTYLE: "none",
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
            "BACKGROUND-COLOR": "#FFFFFF",
            TEXTALIGN: "center"
          },
          ICON: {
            NUMBER: "",
            LOCATION: "front"
          },
          FONT: {
            FONTFAMILY: "맑은 고딕",
            FONTSIZE: 14,
            FONTSTYLE: "normal",
            FONTWEIGHT: "",
            COLOR: "#191919",
            LINEHEIGHT: 40
          },
          LINK: {
            URL: "",
            TARGET: "_blank"
          },
          MAPPING: {
            FIELD: "EPILOGUE"
          }
        }
      },
      {
        TYPE: "TEXT",
        CATEGORY: "날짜",
        ID: "TX7",
        ORGID: "TX7",
        TITLE: "날짜",
        ATTRIBUTE: {
          BOX: {
            WIDTH: 200,
            HEIGHT: 30,

            BORDER: {
              BORDERWIDTH: 0,
              BORDERSTYLE: "none",
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
            "BACKGROUND-COLOR": "#FFFFFF",
            TEXTALIGN: "center"
          },
          ICON: {
            NUMBER: "",
            LOCATION: "front"
          },
          FONT: {
            FONTFAMILY: "돋움",
            FONTSIZE: 12,
            FONTSTYLE: "normal",
            FONTWEIGHT: "",
            COLOR: "#8b8b8b",
            LINEHEIGHT: 0
          },
          LINK: {
            URL: "",
            TARGET: "_blank"
          },
          MAPPING: {
            FIELD: "REGDATE"
          }
        }
      },
      {
        TYPE: "TEXT",
        CATEGORY: "관련기사",
        ID: "TX8",
        ORGID: "TX8",
        TITLE: "관련기사",
        ATTRIBUTE: {
          BOX: {
            WIDTH: 500,
            HEIGHT: 40,

            BORDER: {
              BORDERWIDTH: 0,
              BORDERSTYLE: "none",
              BORDERCOLOR: ""
            },
            PADDING: {
              PADDINGTOP: 0,
              PADDINGRIGHT: 39,
              PADDINGBOTTOM: 0,
              PADDINGLEFT: 42
            },
            MARGIN: {
              MARGINTOP: 0,
              MARGINRIGHT: 30,
              MARGINBOTTOM: 0,
              MARGINLEFT: 0
            },
            "BACKGROUND-COLOR": "#FFFFFF",
            TEXTALIGN: "center"
          },
          ICON: {
            NUMBER: "",
            LOCATION: "front"
          },
          FONT: {
            FONTFAMILY: "맑은 고딕",
            FONTSIZE: 14,
            FONTSTYLE: "normal",
            FONTWEIGHT: "",
            COLOR: "#191919",
            "LINE-HEIGHT": 0
          },
          LINK: {
            URL: "",
            TARGET: "_blank"
          },
          MAPPING: {
            FIELD: "RELATE_NEWS"
          }
        }
      },
      {
        TYPE: "TEXT",
        CATEGORY: "주요기사",
        ID: "TX9",
        ORGID: "TX9",
        TITLE: "주요기사",
        ATTRIBUTE: {
          BOX: {
            WIDTH: 500,
            HEIGHT: 61,
            BORDER: {
              BORDERWIDTH: 1,
              BORDERSTYLE: "solid",
              BORDERCOLOR: "#f2f3f5"
            },
            PADDING: {
              PADDINGTOP: 4,
              PADDINGRIGHT: 0,
              PADDINGBOTTOM: 4,
              PADDINGLEFT: 0
            },
            MARGIN: {
              MARGINTOP: 0,
              MARGINRIGHT: 30,
              MARGINBOTTOM: 0,
              MARGINLEFT: 0
            },
            "BACKGROUND-COLOR": "#FFFFFF",
            TEXTALIGN: "center"
          },
          ICON: {
            NUMBER: "",
            LOCATION: "front"
          },
          FONT: {
            FONTFAMILY: "맑은 고딕",
            FONTSIZE: 15,
            FONTSTYLE: "normal",
            FONTWEIGHT: "bold",
            COLOR: "#191919",
            LINEHEIGHT: 20
          },
          LINK: {
            URL: "",
            TARGET: "_blank"
          },
          MAPPING: {
            FIELD: "LEADING_NEWS"
          }
        }
      },
      {
        TYPE: "TEXT",
        CATEGORY: "바이라인",
        ID: "TX10",
        ORGID: "TX10",
        TITLE: "바이라인",
        ATTRIBUTE: {
          BOX: {
            WIDTH: 200,
            HEIGHT: 30,
            BORDER: {
              BORDERWIDTH: 0,
              BORDERSTYLE: "none",
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
            "BACKGROUND-COLOR": "#FFFFFF",
            TEXTALIGN: "center"
          },
          ICON: {
            NUMBER: "",
            LOCATION: "front"
          },
          FONT: {
            FONTFAMILY: "돋움",
            FONTSIZE: 12,
            FONTSTYLE: "normal",
            FONTWEIGHT: "",
            COLOR: "#191919",
            LINEHEIGHT: 0
          },
          LINK: {
            URL: "",
            TARGET: "_blank"
          },
          MAPPING: {
            FIELD: "BYLINE"
          }
        }
      },
      {
        TYPE: "TEXT",
        CATEGORY: "출처",
        ID: "TX11",
        ORGID: "TX11",
        TITLE: "출처",
        ATTRIBUTE: {
          BOX: {
            WIDTH: 200,
            HEIGHT: 30,

            BORDER: {
              BORDERWIDTH: 0,
              BORDERSTYLE: "none",
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
            "BACKGROUND-COLOR": "#FFFFFF",
            TEXTALIGN: "center"
          },
          ICON: {
            NUMBER: "",
            LOCATION: "front"
          },
          FONT: {
            FONTFAMILY: "돋움",
            FONTSIZE: 12,
            FONTSTYLE: "normal",
            FONTWEIGHT: "",
            COLOR: "#191919",
            LINEHEIGHT: 0
          },
          LINK: {
            URL: "",
            TARGET: "_blank"
          },
          MAPPING: {
            FIELD: "COPYRIGHT"
          }
        }
      },
      {
        TYPE: "TEXT",
        CATEGORY: "분류",
        ID: "TX12",
        ORGID: "TX12",
        TITLE: "분류",
        ATTRIBUTE: {
          BOX: {
            WIDTH: 200,
            HEIGHT: 30,
            BORDER: {
              BORDERWIDTH: 1,
              BORDERSTYLE: "none",
              BORDERCOLOR: "#4762ae"
            },
            PADDING: {
              PADDINGTOP: 0,
              PADDINGRIGHT: 3,
              PADDINGBOTTOM: 0,
              PADDINGLEFT: 0
            },
            MARGIN: {
              MARGINTOP: 0,
              MARGINRIGHT: 30,
              MARGINBOTTOM: 0,
              MARGINLEFT: 0
            },
            "BACKGROUND-COLOR": "#FFFFFF",
            TEXTALIGN: "center"
          },
          ICON: {
            NUMBER: "",
            LOCATION: "front"
          },
          FONT: {
            FONTFAMILY: "맑은 고딕",
            FONTSIZE: 14,
            FONTSTYLE: "normal",
            FONTWEIGHT: "bold",
            COLOR: "#4762ae",
            LINEHEIGHT: 0
          },
          LINK: {
            URL: "",
            TARGET: "_blank"
          },
          MAPPING: {
            FIELD: "CATEGORY"
          }
        }
      },
      {
        TYPE: "TEXT",
        CATEGORY: "라벨",
        ID: "TX13",
        ORGID: "TX13",
        TITLE: "라벨",
        ATTRIBUTE: {
          BOX: {
            WIDTH: 200,
            HEIGHT: 30,
            BORDER: {
              BORDERWIDTH: 1,
              BORDERSTYLE: "none",
              BORDERCOLOR: "#4762ae"
            },
            PADDING: {
              PADDINGTOP: 0,
              PADDINGRIGHT: 3,
              PADDINGBOTTOM: 0,
              PADDINGLEFT: 0
            },
            MARGIN: {
              MARGINTOP: 0,
              MARGINRIGHT: 30,
              MARGINBOTTOM: 0,
              MARGINLEFT: 0
            },
            "BACKGROUND-COLOR": "#FFFFFF",
            TEXTALIGN: "center"
          },
          ICON: {
            NUMBER: "",
            LOCATION: "front"
          },
          FONT: {
            FONTFAMILY: "맑은 고딕",
            FONTSIZE: 14,
            FONTSTYLE: "normal",
            FONTWEIGHT: "bold",
            COLOR: "#4762ae",
            LINEHEIGHT: 0
          },
          LINK: {
            URL: "",
            TARGET: "_blank"
          },
          MAPPING: {
            FIELD: "LABEL"
          }
        }
      }
    ],
    IMAGE: [
      {
        TYPE: "IMAGE",
        CATEGORY: "이미지일반",
        ID: "I1",
        ORGID: "I1",
        TITLE: "이미지일반",
        ATTRIBUTE: {
          BOX: {
            WIDTH: 180,
            HEIGHT: 120,

            BORDER: {
              BORDERWIDTH: 0,
              BORDERSTYLE: "none",
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
            "BACKGROUND-COLOR": "#e5e5e5",
            TEXTALIGN: "left"
          },
          ICON: {
            NUMBER: "",
            LOCATION: "front"
          },
          FONT: {
            FONTFAMILY: "맑은 고딕",
            FONTSIZE: 14,
            FONTSTYLE: "normal",
            FONTWEIGHT: "bold",
            COLOR: "#4762ae",
            LINEHEIGHT: 0
          },
          LINK: {
            URL: "",
            TARGET: "_blank"
          },
          MAPPING: {
            FIELD: "LABEL"
          },
          PHOTOINFO: {
            PHOTODATE: "20191110",
            PHOTOPLACE: "저기"
          },
          FILEINFO: {
            FILENAME: "1.jpg",
            FILEPATH: "/data/image/2019/11/10/1.jpg",
            FILEFORMAT: "jpg",
            DESCRIPTION: "이건몬가요?",
            CAPTION: "ㅋㅋㅋㅋ",
            FILESIZE: "1044",
            RESOLUTION: "80"
          },
          WATERMARK: false
        }
      },
      {
        TYPE: "IMAGE",
        CATEGORY: "이미지일반",
        ID: "I2",
        ORGID: "I2",
        TITLE: "이미지일반2",
        ATTRIBUTE: {
          BOX: {
            WIDTH: 180,
            HEIGHT: 120,

            BORDER: {
              BORDERWIDTH: 0,
              BORDERSTYLE: "none",
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
            "BACKGROUND-COLOR": "#e5e5e5",
            TEXTALIGN: "left"
          },
          ICON: {
            NUMBER: "",
            LOCATION: "front"
          },
          FONT: {
            FONTFAMILY: "맑은 고딕",
            FONTSIZE: 14,
            FONTSTYLE: "normal",
            FONTWEIGHT: "bold",
            COLOR: "#4762ae",
            LINEHEIGHT: 0
          },
          LINK: {
            URL: "",
            TARGET: "_blank"
          },
          MAPPING: {
            FIELD: "LABEL"
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
            RESOLUTION: ""
          },
          WATERMARK: false
        }
      }
    ],
    VIDEO: [
      {
        TYPE: "VIDEO",
        CATEGORY: "동영상일반",
        ID: "V1",
        ORGID: "V1",
        TITLE: "동영상일반",
        ATTRIBUTE: {
          BOX: {
            WIDTH: 840,
            HEIGHT: 470,

            BORDER: {
              BORDERWIDTH: 0,
              BORDERSTYLE: "none",
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
            "BACKGROUND-COLOR": "#000000",
            TEXTALIGN: "left"
          },
          ICON: {
            NUMBER: "",
            LOCATION: "front"
          },
          FONT: {
            FONTFAMILY: "맑은 고딕",
            FONTSIZE: 14,
            FONTSTYLE: "normal",
            FONTWEIGHT: "bold",
            COLOR: "#4762ae",
            LINEHEIGHT: 0
          },
          LINK: {
            URL: "",
            TARGET: "_blank"
          },
          MAPPING: {
            FIELD: "LABEL"
          },
          PHOTOINFO: {
            PHOTODATE: "",
            PHOTOPLACE: ""
          },
          FILEINFO: {
            FILENAME: "",
            FILEPATH: "",
            FILEFORMAT: "",
            FILESIZE: "",
            DESCRIPTION: "",
            RESOLUTION: "",
            PLAYTIME: "",
            HEADIMAGE: ""
          },
          AUTOPLAY: false
        }
      },
      {
        TYPE: "VIDEO",
        CATEGORY: "동영상일반",
        ID: "V2",
        ORGID: "V2",
        TITLE: "동영상일반2",
        ATTRIBUTE: {
          BOX: {
            WIDTH: 840,
            HEIGHT: 470,

            BORDER: {
              BORDERWIDTH: 0,
              BORDERSTYLE: "none",
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
            "BACKGROUND-COLOR": "#000000",
            TEXTALIGN: "left"
          },
          ICON: {
            NUMBER: "",
            LOCATION: "front"
          },
          FONT: {
            FONTFAMILY: "맑은 고딕",
            FONTSIZE: 14,
            FONTSTYLE: "normal",
            FONTWEIGHT: "bold",
            COLOR: "#4762ae",
            LINEHEIGHT: 0
          },
          LINK: {
            URL: "",
            TARGET: "_blank"
          },
          MAPPING: {
            FIELD: "LABEL"
          },
          PHOTOINFO: {
            PHOTODATE: "",
            PHOTOPLACE: ""
          },
          FILEINFO: {
            FILENAME: "",
            FILEPATH: "",
            FILEFORMAT: "",
            FILESIZE: "",
            DESCRIPTION: "",
            RESOLUTION: "",
            PLAYTIME: "",
            HEADIMAGE: ""
          },
          AUTOPLAY: false
        }
      }
    ]
  });

  const [selectDatas, setSelectDatas] = useState({
    selectType: "text",
    isText: true,
    isImage: false,
    isVideo: false,
    selectedEditingData: {}
  });

  const { TEXT, IMAGE, VIDEO } = componentDatas;
  const {
    selectType,
    isText,
    isImage,
    isVideo,
    selectedEditingData
  } = selectDatas;

  const handleComponentSel = e => {
    const name = e.target.name;
    const val = e.target.value;

    if (name === "selectType") {
      switch (val) {
        case "text":
          setSelectDatas({
            ...selectDatas,
            selectType: val,
            isText: true,
            isImage: false,
            isVideo: false
          });
          break;
        case "image":
          setSelectDatas({
            ...selectDatas,
            selectType: val,
            isText: false,
            isImage: true,
            isVideo: false
          });
          break;
        case "video":
          setSelectDatas({
            ...selectDatas,
            selectType: val,
            isText: false,
            isImage: false,
            isVideo: true
          });
          break;
        default:
          break;
      }
    } else {
      setSelectDatas({
        ...selectDatas,
        [name]: val
      });
    }
  };

  useEffect(() => {
    if (isPopupUse) {
      switch (showList) {
        case "text":
          setSelectDatas({
            ...selectDatas,
            selectType: showList,
            isText: true,
            isImage: false,
            isVideo: false
          });
          break;
        case "image":
          setSelectDatas({
            ...selectDatas,
            selectType: showList,
            isText: false,
            isImage: true,
            isVideo: false
          });
          break;
        case "video":
          setSelectDatas({
            ...selectDatas,
            selectType: showList,
            isText: false,
            isImage: false,
            isVideo: true
          });
          break;
        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    setSelectDatas({
      ...selectDatas,
      selectedEditingData: selectedEditDatas
    });
  }, [selectedEditDatas.ID, selectedEditDatas.ACTION]);

  const callbackEditData = (editingTarget, editingType, editingDatas) => {
    callbackPropsEditData(editingTarget, editingType, editingDatas);
  };

  return (
    <div>
      <select
        className={isPopupUse ? "pop_component_type" : "component_type"}
        onChange={handleComponentSel}
        name="selectType"
        value={selectType}
      >
        <option value="text">Text</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>
      <div>
        {isText ? (
          <ListComponentText
            textData={TEXT}
            isPopupUse={isPopupUse}
            callbackEditData={callbackEditData}
            selectedEditDatas={selectedEditingData}
          />
        ) : null}
        {isImage ? (
          <ListComponentImage imageData={IMAGE} isPopupUse={isPopupUse} />
        ) : null}
        {isVideo ? (
          <ListComponentVideo videoData={VIDEO} isPopupUse={isPopupUse} />
        ) : null}
      </div>
    </div>
  );
};

export default ListComponent;
