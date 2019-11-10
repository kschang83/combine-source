import React from "react";
import "./TemplateEditor.css";
import "./TemplateEditorMain.css";
import MainBodyLeftListArea from "./MainBodyLeftListArea.js";
import MainBodyCenterTemplateEditor from "./MainBodyCenterTemplateEditor.js";
import MainBodyRightPropertyArea from "./MainBodyRightPropertyArea.js";

import TemplateEditDataContainer from "../containers/TemplateEditDataContainer";
import MainRightPropContainer from "../containers/MainRightPropConatiner";

const MainBody = () => {
  return (
    <div className="editing_full">
      <div className="list">
        <MainBodyLeftListArea />
      </div>
      <div className="editing">
        <TemplateEditDataContainer />
      </div>
      <div className="properties">
        <MainRightPropContainer />
      </div>
    </div>
  );
};

export default MainBody;
