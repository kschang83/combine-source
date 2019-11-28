const ACTIVE_PROP_TAB = "activePropTab/ACTIVE_PROP_TAB";
const SET_INIT_TEMPLATE = "activePropTab/SET_INIT_TEMPLATE";
const SET_INIT_COMPONENT = "activePropTab/SET_INIT_COMPONENT";

export const setActivePropTab = activeTabDatas => ({
  type: ACTIVE_PROP_TAB,
  activeTabDatas
});

export const setInitTemplate = initTemplate => ({
  type: SET_INIT_TEMPLATE,
  initTemplate
});

export const setInitComponent = initComponent => ({
  type: SET_INIT_COMPONENT,
  initComponent
});

const initialState = {
  activeTabDatas: {
    tabIndex: 0,
    tabActive: false,
    tabType: ""
  },
  initTemplate: true,
  initComponent: {
    empty: true
  }
};

function activePropTab(state = initialState, action) {
  switch (action.type) {
    case ACTIVE_PROP_TAB:
      return {
        ...state,
        activeTabDatas: {
          tabIndex: action.activeTabDatas.tabIndex,
          tabActive: action.activeTabDatas.tabActive,
          tabType: action.activeTabDatas.tabType
        }
      };
    case SET_INIT_TEMPLATE:
      return {
        ...state,
        initTemplate: action.initTemplate
      };
    case SET_INIT_COMPONENT:
      return {
        ...state,
        initComponent: {
          empty: action.initComponent.empty
        }
      };
    default:
      return state;
  }
}

export default activePropTab;
