import React from "react";
import { connect } from "react-redux";
import { insertComponent } from "../modules/componentPropData";
import { setInitComponent } from "../modules/activePropTab";
import PropertyComponent from "../components/PropertyComponent";

const ComponentPropDataContainer = ({
  initComponent,
  setInitComponent,
  componentDatas,
  insertComponent,
  choiceType
}) => {
  return (
    <PropertyComponent
      initComponent={initComponent}
      setInitComponent={setInitComponent}
      editDatasComponent={componentDatas}
      insertComponent={insertComponent}
      choiceType={choiceType}
    />
  );
};

export default connect(
  state => ({
    componentDatas: state.componentPropData.componentDatas,
    initComponent: state.activePropTab.initComponent
  }),
  { insertComponent, setInitComponent }
)(ComponentPropDataContainer);
