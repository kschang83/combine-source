import React from "react";
import { connect } from "react-redux";
import { insert } from "../modules/templatePropData";
import { insertComponent } from "../modules/componentPropData";
import {
  setActivePropTab,
  setInitTemplate,
  setInitComponent
} from "../modules/activePropTab";
import MainBodyCenterTemplateEditor from "../components/MainBodyCenterTemplateEditor";

const TemplateEditDataContainer = ({
  templateDatas,
  insert,
  componentDatas,
  insertComponent,
  setActivePropTab,
  setInitTemplate,
  setInitComponent,
  initComponent
}) => {
  return (
    <MainBodyCenterTemplateEditor
      editDatas={templateDatas}
      insert={insert}
      editDatasComponent={componentDatas}
      insertComponent={insertComponent}
      setActiveTab={setActivePropTab}
      setInitTemplate={setInitTemplate}
      setInitComponent={setInitComponent}
      initComponent={initComponent}
    />
  );
};

export default connect(
  state => ({
    templateDatas: state.templatePropData.templateDatas,
    componentDatas: state.componentPropData.componentDatas,
    activeTabDatas: state.activePropTab.activeTabDatas,
    initComponent: state.activePropTab.initComponent
  }),
  {
    insert,
    insertComponent,
    setActivePropTab,
    setInitTemplate,
    setInitComponent
  }
)(TemplateEditDataContainer);
