import React from "react";
import { connect } from "react-redux";
import { insert } from "../modules/templatePropData";
import PropertyTemplate from "../components/PropertyTemplate";

const TemplatePropDataContainer = ({ initTemplate, templateDatas, insert }) => {
  return (
    <PropertyTemplate
      initTemplate={initTemplate}
      editDatas={templateDatas}
      insert={insert}
    />
  );
};

export default connect(
  state => ({
    templateDatas: state.templatePropData.templateDatas,
    initTemplate: state.activePropTab.initTemplate
  }),
  { insert }
)(TemplatePropDataContainer);
