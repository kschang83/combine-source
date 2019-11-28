// 액션 타입 정의
const INSERT = "componentPropData/INSERT";

// 액션 생성 함수
export const insertComponent = componentDatas => ({
  type: INSERT,
  componentDatas
});

// 초기 상태
const initialState = {
  componentDatas: {
    TYPE: "",
    CATEGORY: "",
    ID: "",
    ORGID: "",
    TITLE: "",
    SORTIDX: "",
    ATTRIBUTE: {
      BOX: {
        WIDTH: 0,
        HEIGHT: 0,
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
          MARGINRIGHT: 0,
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
        FONTWEIGHT: "",
        COLOR: "#191919",
        LINEHEIGHT: 40
      },
      LINK: {
        URL: "",
        TARGET: "_blank"
      },
      MAPPING: {
        FIELD: ""
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
        RESOLUTION: "",
        DESCRIPTION: "",
        CAPTION: "",
        PLAYTIME: "",
        HEADIMAGE: ""
      }
    }
  }
};

// 리듀서
function componentPropData(state = initialState, action) {
  switch (action.type) {
    case INSERT:
      return {
        ...state,
        componentDatas: {
          TYPE: action.componentDatas.TYPE,
          CATEGORY: action.componentDatas.CATEGORY,
          ID: action.componentDatas.ID,
          ORGID: action.componentDatas.ORGID,
          TITLE: action.componentDatas.TITLE,
          SORTIDX: action.componentDatas.SORTIDX,
          ATTRIBUTE: {
            ...state.componentDatas.ATTRIBUTE,
            BOX: {
              ...state.componentDatas.ATTRIBUTE.BOX,
              WIDTH: action.componentDatas.ATTRIBUTE.BOX.WIDTH,
              HEIGHT: action.componentDatas.ATTRIBUTE.BOX.HEIGHT,
              BORDER: {
                BORDERWIDTH:
                  action.componentDatas.ATTRIBUTE.BOX.BORDER.BORDERWIDTH,
                BORDERSTYLE:
                  action.componentDatas.ATTRIBUTE.BOX.BORDER.BORDERSTYLE,
                BORDERCOLOR:
                  action.componentDatas.ATTRIBUTE.BOX.BORDER.BORDERCOLOR
              },
              PADDING: {
                PADDINGTOP:
                  action.componentDatas.ATTRIBUTE.BOX.PADDING.PADDINGTOP,
                PADDINGRIGHT:
                  action.componentDatas.ATTRIBUTE.BOX.PADDING.PADDINGRIGHT,
                PADDINGBOTTOM:
                  action.componentDatas.ATTRIBUTE.BOX.PADDING.PADDINGBOTTOM,
                PADDINGLEFT:
                  action.componentDatas.ATTRIBUTE.BOX.PADDING.PADDINGLEFT
              },
              MARGIN: {
                MARGINTOP: action.componentDatas.ATTRIBUTE.BOX.MARGIN.MARGINTOP,
                MARGINRIGHT:
                  action.componentDatas.ATTRIBUTE.BOX.MARGIN.MARGINRIGHT,
                MARGINBOTTOM:
                  action.componentDatas.ATTRIBUTE.BOX.MARGIN.MARGINBOTTOM,
                MARGINLEFT:
                  action.componentDatas.ATTRIBUTE.BOX.MARGIN.MARGINLEFT
              },
              BACKGROUNDCOLOR:
                action.componentDatas.ATTRIBUTE.BOX.BACKGROUNDCOLOR,
              TEXTALIGN: action.componentDatas.ATTRIBUTE.BOX.TEXTALIGN
            },
            ICON: {
              TYPE: action.componentDatas.ATTRIBUTE.ICON.TYPE,
              NUMBER: action.componentDatas.ATTRIBUTE.ICON.TYPE,
              LOCATION: action.componentDatas.ATTRIBUTE.ICON.LOCATION
            },
            FONT: {
              FONTFAMILY: action.componentDatas.ATTRIBUTE.FONT.FONTFAMILY,
              FONTSIZE: action.componentDatas.ATTRIBUTE.FONT.FONTSIZE,
              FONTSTYLE: action.componentDatas.ATTRIBUTE.FONT.FONTSTYLE,
              FONTWEIGHT: action.componentDatas.ATTRIBUTE.FONT.FONTWEIGHT,
              COLOR: action.componentDatas.ATTRIBUTE.FONT.COLOR,
              LINEHEIGHT: action.componentDatas.ATTRIBUTE.FONT.LINEHEIGHT
            },
            LINK: {
              URL: action.componentDatas.ATTRIBUTE.LINK.URL,
              TARGET: action.componentDatas.ATTRIBUTE.LINK.TARGET
            },
            MAPPING: {
              FIELD: action.componentDatas.ATTRIBUTE.MAPPING.FIELD
            },
            PHOTOINFO: {
              PHOTODATE:
                action.componentDatas.TYPE === "TEXT"
                  ? ""
                  : action.componentDatas.ATTRIBUTE.PHOTOINFO.PHOTODATE,
              PHOTOPLACE:
                action.componentDatas.TYPE === "TEXT"
                  ? ""
                  : action.componentDatas.ATTRIBUTE.PHOTOINFO.PHOTOPLACE
            },
            FILEINFO: {
              FILENAME:
                action.componentDatas.TYPE === "TEXT"
                  ? ""
                  : action.componentDatas.ATTRIBUTE.FILEINFO.FILENAME,
              FILEPATH:
                action.componentDatas.TYPE === "TEXT"
                  ? ""
                  : action.componentDatas.ATTRIBUTE.FILEINFO.FILEPATH,
              FILEFORMAT:
                action.componentDatas.TYPE === "TEXT"
                  ? ""
                  : action.componentDatas.ATTRIBUTE.FILEINFO.FILEFORMAT,
              FILESIZE:
                action.componentDatas.TYPE === "TEXT"
                  ? ""
                  : action.componentDatas.ATTRIBUTE.FILEINFO.FILESIZE,
              RESOLUTION:
                action.componentDatas.TYPE === "TEXT"
                  ? ""
                  : action.componentDatas.ATTRIBUTE.FILEINFO.RESOLUTION,
              DESCRIPTION:
                action.componentDatas.TYPE === "TEXT"
                  ? ""
                  : action.componentDatas.ATTRIBUTE.FILEINFO.DESCRIPTION,
              CAPTION:
                action.componentDatas.TYPE === "TEXT"
                  ? ""
                  : action.componentDatas.ATTRIBUTE.FILEINFO.CAPTION,
              PLAYTIME:
                action.componentDatas.TYPE === "TEXT"
                  ? ""
                  : action.componentDatas.ATTRIBUTE.FILEINFO.PLAYTIME,
              HEADIMAGE:
                action.componentDatas.TYPE === "TEXT"
                  ? ""
                  : action.componentDatas.ATTRIBUTE.FILEINFO.HEADIMAGE
            }
          }
        }
      };
    default:
      return state;
  }
}

export default componentPropData;
