import React from "react";
import { connect } from "react-redux";
import { insert, setActivePropTab, setInit } from "../modules/templatePropData";
import MainBodyCenterTemplateEditor from "../components/MainBodyCenterTemplateEditor";

const TemplateEditDataContainer = ({
  templateDatas,
  insert,
  setActivePropTab,
  setInit
}) => {
  return (
    <MainBodyCenterTemplateEditor
      editDatas={templateDatas}
      insert={insert}
      setActiveTab={setActivePropTab}
      setInit={setInit}
    />
  );
};

export default connect(
  state => ({
    templateDatas: state.templatePropData.templateDatas
  }),
  { insert, setActivePropTab, setInit }
)(TemplateEditDataContainer);
