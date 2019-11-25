import React, { useState, useEffect, Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import downArrow from "../img/arrow-down-sign-to-navigate.png";
import "./TemplateEditor.css";
import "./TemplateEditorMain.css";
import "./Property.css";

import ToggleBorder from "./ToggleBorder.js";
import TogglePadding from "./TogglePadding.js";
import ToggleMargin from "./ToggleMargin.js";
import ToggleColor from "./ToggleColor.js";

const PropertyTemplate = ({ initialStatus, editDatas, insert }) => {
  const [datas, setDatas] = useState({
    ID: "",
    TITLE: "",
    DESCRIPTION: "",
    WIDTH: 0,
    HEIGHT: 0,
    ATTRIBUTE: {
      BOX: {
        BORDER: {
          BORDERWIDTH: 0,
          BORDERSTYLE: "",
          BORDERCOLOR: ""
        },
        PADDING: {
          PADDINGTOP: 0,
          PADDINGRIGHT: 0,
          PADDINGBOTTOM: 0,
          PADDINGLEFT: 0
        },
        MARGIN: {
          MARGINTOP: 0,
          MARGINRIGHT: 30,
          MARGINBOTTOM: 0,
          MARGINLEFT: 0
        },
        BACKGROUNDCOLOR: "",
        TEXTALIGN: ""
      }
    },
    COMPONENT: [],
    REGDATE: "",
    REGNAME: "",
    MAPPINGFIELD: ""
  });

  const [startDate, setStartDate] = useState(new Date()); // 추후 데이터 활용 (REGDATE)
  const [isReset, setReset] = useState(false);
  const [showPop, setShowPop] = useState({
    borderPop: false,
    paddingPop: false,
    marginPop: false,
    colorPop: false
  });

  const {
    ID,
    TITLE,
    DESCRIPTION,
    WIDTH,
    HEIGHT,
    ATTRIBUTE,
    COMPONENT,
    REGDATE,
    REGNAME,
    MAPPINGFIELD
  } = datas;
  const { borderPop, paddingPop, marginPop, colorPop } = showPop;

  useEffect(() => {
    const propEditDatas = {
      ID: editDatas.ID,
      TITLE: editDatas.TITLE,
      DESCRIPTION: editDatas.DESCRIPTION,
      WIDTH: editDatas.WIDTH,
      HEIGHT: editDatas.HEIGHT,
      ATTRIBUTE: editDatas.ATTRIBUTE,
      COMPONENT: editDatas.COMPONENT,
      REGDATE: editDatas.REGDATE,
      REGNAME: editDatas.REGNAME,
      MAPPINGFIELD: editDatas.MAPPINGFIELD
    };
    setDatas(propEditDatas);
  }, [editDatas]);

  const handleOnChange = e => {
    setDatas({
      ...datas,
      [e.target.name]: e.target.value
    });
  };

  //border, padding, margin pop -> show / hide 관리
  const handleOnClick = flag => {
    switch (flag) {
      case "borderPop":
        setShowPop({
          ...showPop,
          borderPop: !borderPop
        });
        break;
      case "paddingPop":
        setShowPop({
          ...showPop,
          paddingPop: !paddingPop
        });
        break;
      case "marginPop":
        setShowPop({
          ...showPop,
          marginPop: !marginPop
        });
        break;
      case "colorPop":
        setShowPop({
          ...showPop,
          colorPop: !colorPop
        });
        break;
      default:
        break;
    }
  };
  const styleBorderPop = borderPop ? {} : { display: "none" };
  const stylePaddingPop = paddingPop ? {} : { display: "none" };
  const styleMarginPop = marginPop ? {} : { display: "none" };
  const styleColorPop = colorPop ? {} : { display: "none" };

  const textComponents = COMPONENT.map(component =>
    component.TYPE === "TEXT" ? (
      <li className="propertyComponentElement" key={component.ID}>
        {component.SORTIDX + "."} {component.TITLE} ({component.CATEGORY})
      </li>
    ) : null
  );

  const imageComponents = COMPONENT.map(component =>
    component.TYPE === "IMAGE" ? (
      <li className="propertyComponentElement" key={component.ID}>
        {component.SORTIDX + "."}
        {component.TITLE} ({component.CATEGORY}) {component.SORTIDX}{" "}
      </li>
    ) : null
  );

  const videoComponents = COMPONENT.map(component =>
    component.TYPE === "VIDEO" ? (
      <li className="propertyComponentElement" key={component.ID}>
        {component.SORTIDX + "."}
        {component.TITLE} ({component.CATEGORY}) {component.SORTIDX}{" "}
      </li>
    ) : null
  );

  //초기화
  const reset = () => {
    setDatas({
      ID: editDatas.ID,
      TITLE: editDatas.TITLE,
      DESCRIPTION: editDatas.DESCRIPTION,
      WIDTH: editDatas.WIDTH,
      HEIGHT: editDatas.HEIGHT,
      ATTRIBUTE: editDatas.ATTRIBUTE,
      COMPONENT: editDatas.COMPONENT,
      REGDATE: editDatas.REGDATE,
      REGNAME: editDatas.REGNAME,
      MAPPINGFIELD: editDatas.MAPPINGFIELD
    });

    setShowPop({
      borderPop: false,
      paddingPop: false,
      marginPop: false,
      colorPop: false
    });

    setStartDate(new Date());
    setReset(true);
  };

  // 저장
  const save = () => {
    alert("템플릿 속성 저장");
    insert(datas);
  };

  return (
    <div className="TemplateProp">
      {initialStatus ? null : (
        <Fragment>
          <div className="property_section">
            <div className="propertyArea">
              <input
                type="text"
                className="propertyTitle"
                name="TITLE"
                value={TITLE}
                onChange={handleOnChange}
              />
            </div>
            <div className="propertyArea">
              <div className="propertyLabel">Box</div>
              <div className="propertyContent">
                <span className="name">Width</span>
                <input
                  type="number"
                  className="propertyWidth"
                  name="WIDTH"
                  value={WIDTH}
                  onChange={handleOnChange}
                />
                <span className="name">px</span>
                <span className="name">Height</span>
                <input
                  type="number"
                  className="propertyHeight"
                  name="HEIGHT"
                  value={HEIGHT}
                  onChange={handleOnChange}
                />
                <span className="name">px</span>
              </div>
              <div className="propertyContent">
                <span className="name">Border</span>
                <img
                  className="toggleBtn"
                  src={downArrow}
                  alt={"down"}
                  onClick={() => handleOnClick("borderPop")}
                />
                <div style={styleBorderPop}>
                  <ToggleBorder
                    borderInfo={ATTRIBUTE.BOX.BORDER}
                    title={TITLE}
                    isReset={isReset}
                  />
                </div>
              </div>
              <div className="propertyContent">
                <span className="name">Padding</span>
                <img
                  className="toggleBtn"
                  src={downArrow}
                  alt={"down"}
                  onClick={() => handleOnClick("paddingPop")}
                />
                <div style={stylePaddingPop}>
                  <TogglePadding
                    paddingInfo={ATTRIBUTE.BOX.PADDING}
                    title={TITLE}
                    isReset={isReset}
                  />
                </div>
              </div>
              <div className="propertyContent">
                <span className="name">Margin</span>
                <img
                  className="toggleBtn"
                  src={downArrow}
                  alt={"down"}
                  onClick={() => handleOnClick("marginPop")}
                />
                <div style={styleMarginPop}>
                  <ToggleMargin
                    marginInfo={ATTRIBUTE.BOX.MARGIN}
                    title={TITLE}
                    isReset={isReset}
                  />
                </div>
              </div>
              <div className="propertyContent">
                <span className="name">Background-Color</span>
                <img
                  className="toggleBtn"
                  src={downArrow}
                  alt={"down"}
                  onClick={() => handleOnClick("colorPop")}
                />
                <div style={styleColorPop}>
                  <ToggleColor />
                </div>
              </div>
            </div>
            <div className="propertyArea">
              <div className="propertyLabel">구성 컴포넌트</div>
              <div className="propertyContent clearFix">
                <div className="propertyComponentType">TEXT</div>
                <div className="propertyComponentPart">
                  <ul>{textComponents}</ul>
                </div>
              </div>
              <div className="propertyContent clearFix">
                <div className="propertyComponentType">IMAGE</div>
                <div className="propertyComponentPart">
                  <ul>{imageComponents}</ul>
                </div>
              </div>
              <div className="propertyContent clearFix">
                <div className="propertyComponentType">VIDEO</div>
                <div className="propertyComponentPart">
                  <ul>{videoComponents}</ul>
                </div>
              </div>
            </div>
            <div className="propertyArea clearFix">
              <div className="propertyLabel">등록정보</div>
              <div className="propertyContent">
                <span className="name">등록일</span>
                <input
                  type="text"
                  className="propertyRegDate"
                  name="REGDATE"
                  value={REGDATE}
                  onChange={handleOnChange}
                />
              </div>
              <div className="propertyContent">
                <span className="name">등록자</span>
                <input
                  type="text"
                  className="propertyRegName"
                  name="REGNAME"
                  value={REGNAME}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="propertyArea">
              <div className="propertyLabel">설명</div>
              <div className="propertyContent">
                <div className="propertyDescription">
                  <textarea
                    rows="6"
                    cols="35"
                    name="DESCRIPTION"
                    value={DESCRIPTION}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="prop_button">
            <button className="prop_reset" onClick={reset}>
              초기화
            </button>
            <button className="prop_delete">삭제</button>
            <button className="prop_save" onClick={save}>
              저장
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default PropertyTemplate;
