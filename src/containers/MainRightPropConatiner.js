import React from "react";
import { connect } from "react-redux";
import { setActivePropTab } from "../modules/templatePropData";
import MainBodyRightPropertyArea from "../components/MainBodyRightPropertyArea";

const MainRightPropContainer = ({ activeTabDatas, setActivePropTab }) => {
  return (
    <MainBodyRightPropertyArea
      activeTabDatas={activeTabDatas}
      setActiveTab={setActivePropTab}
    />
  );
};

export default connect(
  state => ({
    activeTabDatas: state.templatePropData.activeTabDatas
  }),
  { setActivePropTab }
)(MainRightPropContainer);
