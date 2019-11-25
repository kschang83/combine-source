import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import "./TemplateEditor.css";
import "./TemplateEditorMain.css";
import PropertyTemplate from "./PropertyTemplate.js";
import PropertyComponent from "./PropertyComponent.js";

import TemplatePropDataContainer from "../containers/TemplatePropDataContainer";

const MainBodyRightPropertyArea = ({ activeTabDatas, setActiveTab }) => {
  //const [tabIndex, setTabIndex] = useState(0);
  const [tabIndex, setTabIndex] = useState(1);

  useEffect(() => {
    const isActive = activeTabDatas.tabActive;

    if (isActive) {
      setTabIndex(activeTabDatas.tabIndex);

      const activeTab = {
        tabActive: false,
        tabIndex: 0 // 0:템플릿속성Tab 1:컴포넌트속성Tab
      };
      setActiveTab(activeTab);
    }
  }, [activeTabDatas.tabActive]);

  const handleOnSelectTab = (idx, lastIdx, evt) => {
    setTabIndex(idx);
  };

  return (
    <Tabs selectedIndex={tabIndex} onSelect={handleOnSelectTab}>
      <TabList>
        <Tab className="temp_prop" selectedClassName="template_prop">
          Template 속성
        </Tab>
        <Tab className="component_prop" selectedClassName="com_prop">
          Component 속성
        </Tab>
      </TabList>
      <TabPanel forceRender={true}>
        <TemplatePropDataContainer />
      </TabPanel>
      <TabPanel forceRender={true}>
        <PropertyComponent />
      </TabPanel>
    </Tabs>
  );
};

export default MainBodyRightPropertyArea;
