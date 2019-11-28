import React, { useState, useEffect, Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import downArrow from "../img/arrow-down-sign-to-navigate.png";
import leftArray from "../img/aligned-to-the-left.png";
import centerArray from "../img/center-align.png";
import rightArray from "../img/align-text-right.png";
import justifyArray from "../img/justify.png";
import "./TemplateEditor.css";
import "./Property.css";

import ToggleBorder from "./ToggleBorder.js";
import TogglePadding from "./TogglePadding.js";
import ToggleMargin from "./ToggleMargin.js";
import ToggleColor from "./ToggleColor.js";

const PropertyComponentText = ({
  editDatasComponent,
  insertComponent,
  setInitComponent
}) => {
  const initialStateDatas = {
    isUse: true,
    type: "TEXT",
    id: "",
    orgid: "",
    title: "",
    category: "",
    sortidx: "",
    width: 0,
    height: 0,
    fontSize: 0,
    fontWeight: "",
    fontFamily: "",
    fontStyle: "",
    lineHeight: 0,
    url: "",
    urlTarget: "_blank",
    mappingField: "",
    iconType: "none",
    iconLocation: "",
    borderDatas: {},
    paddingDatas: {},
    marginDatas: {},
    attribute: {}
  };

  const [datas, setDatas] = useState(initialStateDatas);
  const [showPop, setShowPop] = useState({
    borderPop: false,
    paddingPop: false,
    marginPop: false,
    colorPop: false
  });
  const [isReset, setReset] = useState(false);

  const {
    isUse,
    type,
    id,
    orgid,
    title,
    category,
    sortidx,
    width,
    height,
    fontSize,
    fontWeight,
    fontFamily,
    fontStyle,
    lineHeight,
    url,
    urlTarget,
    mappingField,
    iconType,
    iconLocation,
    borderDatas,
    paddingDatas,
    marginDatas,
    attribute
  } = datas;
  const { borderPop, paddingPop, marginPop, colorPop } = showPop;

  useEffect(() => {
    setDatas({
      ...datas,
      type: editDatasComponent.TYPE,
      id: editDatasComponent.ID,
      orgid: editDatasComponent.ORGID,
      title: editDatasComponent.TITLE,
      category: editDatasComponent.CATEGORY,
      sortidx: editDatasComponent.SORTIDX,
      width: editDatasComponent.ATTRIBUTE.BOX.WIDTH,
      height: editDatasComponent.ATTRIBUTE.BOX.HEIGHT,
      fontSize: editDatasComponent.ATTRIBUTE.FONT.FONTSIZE,
      fontWeight: editDatasComponent.ATTRIBUTE.FONT.FONTWEIGHT,
      fontFamily: editDatasComponent.ATTRIBUTE.FONT.FONTFAMILY,
      fontStyle: editDatasComponent.ATTRIBUTE.FONT.FONTSTYLE,
      lineHeight: editDatasComponent.ATTRIBUTE.FONT.LINEHEIGHT,
      url: editDatasComponent.ATTRIBUTE.LINK.URL,
      urlTarget: editDatasComponent.ATTRIBUTE.LINK.TARGET,
      mappingField: editDatasComponent.ATTRIBUTE.MAPPING.FIELD,
      iconType: editDatasComponent.ATTRIBUTE.ICON.TYPE,
      iconLocation: editDatasComponent.ATTRIBUTE.ICON.LOCATION,
      borderDatas: editDatasComponent.ATTRIBUTE.BOX.BORDER,
      paddingDatas: editDatasComponent.ATTRIBUTE.BOX.PADDING,
      marginDatas: editDatasComponent.ATTRIBUTE.BOX.MARGIN,
      attribute: editDatasComponent.ATTRIBUTE
    });
  }, [editDatasComponent]);

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

  const reset = () => {
    alert("초기화");
  };

  // 저장
  const save = () => {
    if (window.confirm("컴포넌트 속성을 저장하여 반영하시겠습니까?")) {
      const saveData = {
        TYPE: type,
        ID: id,
        ORGID: orgid,
        CATEGORY: category,
        TITLE: title,
        SORTIDX: sortidx,
        ATTRIBUTE: {
          BOX: {
            WIDTH: width,
            HEIGHT: height,
            BORDER: borderDatas,
            PADDING: paddingDatas,
            MARGIN: marginDatas,
            BACKGROUNDCOLOR: "#FFFFFF",
            TEXTALIGN: ""
          },
          ICON: {
            TYPE: iconType,
            NUMBER: editDatasComponent.ATTRIBUTE.ICON.NUMBER, // 추후 수정
            LOCATION: iconLocation
          },
          FONT: {
            FONTFAMILY: fontFamily,
            FONTSIZE: fontSize,
            FONTSTYLE: fontStyle,
            FONTWEIGHT: fontWeight,
            COLOR: editDatasComponent.ATTRIBUTE.FONT.COLOR, // 추후 수정
            LINEHEIGHT: lineHeight
          },
          LINK: {
            URL: url,
            TARGET: urlTarget
          },
          MAPPING: {
            FIELD: mappingField
          }
        }
      };

      insertComponent(saveData);
      setInitComponent({
        empty: true,
        editInfo: {}
      });
    }
  };

  return (
    <Fragment>
      <div className="property_section">
        <div className="propertyArea">
          <input
            type="text"
            className="propertyTitle"
            name="title"
            value={title}
            onChange={handleOnChange}
          />
        </div>
        <div className="propertyArea">
          <div className="propertyLabel">Type</div>
          <div className="propertyContent">
            <span className="name">{type}</span>
            <span className="name">
              {category} {sortidx}
            </span>
          </div>
        </div>
        <div className="propertyArea">
          <div className="propertyLabel">Box</div>
          <div className="propertyContent">
            <span className="name">Width</span>
            <input
              type="number"
              className="propertyWidth"
              name="width"
              value={width}
              onChange={handleOnChange}
            />
            <span className="name">px</span>
            <span className="name">Height</span>
            <input
              type="number"
              className="propertyHeight"
              name="height"
              value={height}
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
                borderInfo={borderDatas}
                title={title}
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
                paddingInfo={paddingDatas}
                title={title}
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
                marginInfo={marginDatas}
                title={title}
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
          <div className="propertyContent">
            <span className="name">정렬</span>
            <img
              className="propertyArrayLeft"
              src={leftArray}
              alt={"leftArray"}
            />
            <img
              className="propertyArrayCenter"
              src={centerArray}
              alt={"centerArray"}
            />
            <img
              className="propertyArrayRight"
              src={rightArray}
              alt={"rightArray"}
            />
            <img
              className="propertyArrayJustify"
              src={justifyArray}
              alt={"justifyArray"}
            />
          </div>
        </div>
        <div className="propertyArea">
          <div className="propertyLabel">Icon</div>
          <div className="propertyContent">
            <select
              className="propertyIconType"
              name="iconType"
              value={iconType}
              onChange={handleOnChange}
            >
              <option value="none">none</option>
              <option value="PDF">PDF</option>
              <option value="instagram">instagram</option>
              <option value="facebook">facebook</option>
              <option value="push_news">push news</option>
            </select>
            <span className="propertyIconLoactionLabel">앞</span>
            <input
              type="radio"
              className="propertyIconLoaction"
              name="iconLocation"
              value="front"
              checked={iconLocation === "front"}
              onChange={handleOnChange}
            />
            <span className="propertyIconLoactionLabel">뒤</span>
            <input
              className="propertyIconLoaction"
              type="radio"
              name="iconLocation"
              value="back"
              checked={iconLocation === "back"}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="propertyArea">
          <div className="propertyLabel">Font</div>
          <div className="propertyContent">
            <span className="name">size</span>
            <input
              type="number"
              className="propertyFontSize"
              name="fontSize"
              value={fontSize}
              onChange={handleOnChange}
            />
            <span className="name">px</span>
            <span className="name">line height</span>
            <input
              type="number"
              className="propertyLineHeight"
              name="lineHeight"
              value={lineHeight}
              onChange={handleOnChange}
            />
            <span className="name">px</span>
          </div>
          <div className="propertyContent">
            <span className="name">weight</span>
            <select
              className="propertyFontWeight"
              name="fontWeight"
              value={fontWeight}
              onChange={handleOnChange}
            >
              <option value="normal">normal</option>
              <option value="lighter">lighter</option>
              <option value="bold">bold</option>
            </select>
            <span className="name">family</span>
            <select
              className="propertyFontFamily"
              name="fontFamily"
              value={fontFamily}
              onChange={handleOnChange}
            >
              <option value="돋음">돋음</option>
              <option value="궁서">궁서</option>
              <option value="굴림">굴림</option>
              <option value="맑음고딕">맑음고딕</option>
            </select>
          </div>
          <div className="propertyContent">
            <span className="name">style</span>
            <select
              className="propertyFontStyle"
              name="fontStyle"
              value={fontStyle}
              onChange={handleOnChange}
            >
              <option value="normal">normal</option>
              <option value="italic">italic</option>
              <option value="oblique">oblique</option>
            </select>
            <span className="name">color</span>
          </div>
        </div>
        <div className="propertyArea">
          <div className="propertyLabel">Link</div>
          <div className="propertyContent">
            <span className="name">URL</span>
            <input
              type="text"
              className="propertyUrl"
              name="url"
              value={url}
              onChange={handleOnChange}
            />
          </div>
          <div className="propertyContent">
            <span className="name">Target</span>
            <span className="propertyLinkTargetLabel">새 창</span>
            <input
              type="radio"
              className="propertyLinkTarget"
              name="urlTarget"
              value="_blank"
              checked={urlTarget === "_blank"}
              onChange={handleOnChange}
            />
            <span className="propertyLinkTargetLabel">현재 창</span>
            <input
              type="radio"
              className="propertyLinkTarget"
              name="urlTarget"
              value="_self"
              checked={urlTarget === "_self"}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="propertyArea">
          <div className="propertyLabel">매핑정보</div>
          <div className="propertyContent">
            <span className="name">필드명</span>
            <input
              type="text"
              className="propertyMappingField"
              name="mappingField"
              value={mappingField}
              onChange={handleOnChange}
            />
          </div>
        </div>
      </div>
      <div className="prop_button">
        <button className="prop_reset" onClick={reset}>
          초기화
        </button>
        <button className="prop_save" onClick={save}>
          저장
        </button>
      </div>
    </Fragment>
  );
};

export default PropertyComponentText;
