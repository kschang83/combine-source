import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import "./TemplateEditor.css";
import "./TemplateEditorMain.css";
import ListTemplate from "./ListTemplate.js";
import ListComponent from "./ListComponent.js";

const MainBodyLeftListArea = () => {
  //const [tabIndex, setTabIndex] = useState(0);
  const [tabIndex, setTabIndex] = useState(1);

  const handleOnSelectTab = (idx, lastIdx, evt) => {
    setTabIndex(idx);
  };

  return (
    <Tabs selectedIndex={tabIndex} onSelect={handleOnSelectTab}>
      <TabList>
        <Tab className="temp_tab" selectedClassName="template_tab">
          Template 목록
        </Tab>
        <Tab className="component_tab" selectedClassName="com_tab">
          Component 목록
        </Tab>
      </TabList>
      <TabPanel forceRender={true}>
        <ListTemplate />
      </TabPanel>
      <TabPanel forceRender={true}>
        <ListComponent isPopupUse={false} />
      </TabPanel>
    </Tabs>
  );
};

export default MainBodyLeftListArea;
