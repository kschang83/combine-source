import React from "react";
import { connect } from "react-redux";
import { insert } from "../modules/templatePropData";
import PropertyTemplate from "../components/PropertyTemplate";

const TemplatePropDataContainer = ({ templateDatas, insert }) => {
  return <PropertyTemplate editDatas={templateDatas} onInsert={insert} />;
};

export default connect(
  state => ({
    templateDatas: state.templatePropData.templateDatas
  }),
  { insert }
)(TemplatePropDataContainer);
