import React from "react";
import { connect } from "react-redux";
import { insert, setActivePropTab } from "../modules/templatePropData";
import MainBodyCenterTemplateEditor from "../components/MainBodyCenterTemplateEditor";

const TemplateEditDataContainer = ({
  templateDatas,
  insert,
  setActivePropTab
}) => {
  return (
    <MainBodyCenterTemplateEditor
      editDatas={templateDatas}
      onInsert={insert}
      setActiveTab={setActivePropTab}
    />
  );
};

export default connect(
  state => ({
    templateDatas: state.templatePropData.templateDatas
  }),
  { insert, setActivePropTab }
)(TemplateEditDataContainer);
