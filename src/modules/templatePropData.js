// 액션 타입 정의
const INSERT = "templatePropData/INSERT";
const ACTIVE_PROP_TAB = "templatePropData/ACTIVE_PROP_TAB";
const SET_INIT = "templatePropData/SET_INIT";

// 액션 생성 함수
export const insert = templateDatas => ({
  type: INSERT,
  templateDatas
});

export const setActivePropTab = activeTabDatas => ({
  type: ACTIVE_PROP_TAB,
  activeTabDatas
});

export const setInit = initialStatus => ({
  type: SET_INIT,
  initialStatus
});

// 초기 상태
const initialState = {
  templateDatas: {
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
  },
  activeTabDatas: {
    tabActive: false,
    tabIndex: 0
  },
  initialStatus: true
};

// 리듀서
function templatePropData(state = initialState, action) {
  switch (action.type) {
    case INSERT:
      return {
        ...state,
        templateDatas: {
          ID: action.templateDatas.ID,
          TITLE: action.templateDatas.TITLE,
          DESCRIPTION: action.templateDatas.DESCRIPTION,
          WIDTH: action.templateDatas.WIDTH,
          HEIGHT: action.templateDatas.HEIGHT,
          ATTRIBUTE: action.templateDatas.ATTRIBUTE,
          COMPONENT: action.templateDatas.COMPONENT,
          REGDATE: action.templateDatas.REGDATE,
          REGNAME: action.templateDatas.REGNAME,
          MAPPINGFIELD: action.templateDatas.MAPPINGFIELD
        }
      };
    case ACTIVE_PROP_TAB:
      return {
        ...state,
        activeTabDatas: {
          tabActive: action.activeTabDatas.tabActive,
          tabIndex: action.activeTabDatas.tabIndex
        }
      };
    case SET_INIT:
      return {
        ...state,
        initialStatus: action.initialStatus
      };
    default:
      return state;
  }
}

export default templatePropData;
