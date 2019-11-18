import React from "react";
import { connect } from "react-redux";
import { insert } from "../modules/templatePropData";
import PropertyTemplate from "../components/PropertyTemplate";

const TemplatePropDataContainer = ({
  initialStatus,
  templateDatas,
  insert
}) => {
  return (
    <PropertyTemplate
      initialStatus={initialStatus}
      editDatas={templateDatas}
      insert={insert}
    />
  );
};

export default connect(
  state => ({
    templateDatas: state.templatePropData.templateDatas,
    initialStatus: state.templatePropData.initialStatus
  }),
  { insert }
)(TemplatePropDataContainer);
