import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import "./TemplateEditor.css";
import "./TemplateEditorMain.css";
import PropertyTemplate from "./PropertyTemplate.js";
import PropertyComponent from "./PropertyComponent.js";

import TemplatePropDataContainer from "../containers/TemplatePropDataContainer";
import ComponentPropDataContainer from "../containers/ComponentPropDataContainer";

const MainBodyRightPropertyArea = ({ activeTabDatas, setActiveTab }) => {
  const [tabActivation, setTabActivation] = useState({
    tabIndex: 0,
    tabChoiceType: ""
  });
  const { tabIndex, tabChoiceType } = tabActivation;

  useEffect(() => {
    const isActive = activeTabDatas.tabActive;
    const activeTabIndex = activeTabDatas.tabIndex;

    if (isActive) {
      switch (activeTabIndex) {
        case 0:
          setTabActivation({
            ...tabActivation,
            tabIndex: activeTabDatas.tabIndex
          });
          break;
        case 1:
          setTabActivation({
            tabIndex: activeTabDatas.tabIndex,
            tabChoiceType: activeTabDatas.tabType
          });
          break;
        default:
          break;
      }

      setActiveTab({
        tabIndex: activeTabIndex, // 0:템플릿속성Tab 1:컴포넌트속성Tab
        tabActive: false
      });
    }
  }, [activeTabDatas.tabActive]);

  const handleOnSelectTab = (idx, lastIdx, evt) => {
    setTabActivation({
      ...tabActivation,
      tabIndex: idx
    });
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
        <ComponentPropDataContainer choiceType={tabChoiceType} />
      </TabPanel>
    </Tabs>
  );
};

export default MainBodyRightPropertyArea;
