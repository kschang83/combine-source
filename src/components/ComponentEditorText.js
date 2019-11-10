import React, { useState, useEffect } from "react";
import "./TemplateEditor.css";
import downArrow from "../img/arrow-down-sign-to-navigate.png";
import leftArray from "../img/aligned-to-the-left.png";
import centerArray from "../img/center-align.png";
import rightArray from "../img/align-text-right.png";
import justifyArray from "../img/justify.png";

import ToggleApply from "./ToggleApply.js";
import ToggleBorder from "./ToggleBorder.js";
import TogglePadding from "./TogglePadding.js";
import ToggleMargin from "./ToggleMargin.js";
import ToggleColor from "./ToggleColor.js";

const ComponentEditorText = ({ editingType, editingDatas }) => {
  const initialStateDatas = {
    isUse: true,
    id: "",
    title: "",
    category: "",
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
  const initialStateShowPop = {
    applyPop: false,
    borderPop: false,
    paddingPop: false,
    marginPop: false,
    colorPop: false
  };

  const [datas, setDatas] = useState(initialStateDatas);
  const [showPop, setShowPop] = useState(initialStateShowPop);
  const [isCreate, setCreate] = useState("new");
  const [isReset, setReset] = useState(false);

  const {
    isUse,
    id,
    title,
    category,
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
  const { applyPop, borderPop, paddingPop, marginPop, colorPop } = showPop;

  useEffect(() => {
    setDatas({
      ...datas,
      id: editingDatas.ID,
      title: editingDatas.TITLE,
      category: editingDatas.CATEGORY,
      width: editingDatas.ATTRIBUTE.BOX.WIDTH,
      height: editingDatas.ATTRIBUTE.BOX.HEIGHT,
      fontSize: editingDatas.ATTRIBUTE.FONT.FONTSIZE,
      fontWeight: editingDatas.ATTRIBUTE.FONT.FONTWEIGHT,
      fontFamily: editingDatas.ATTRIBUTE.FONT.FONTFAMILY,
      fontStyle: editingDatas.ATTRIBUTE.FONT.FONTSTYLE,
      lineHeight: editingDatas.ATTRIBUTE.FONT.LINEHEIGHT,
      url: editingDatas.ATTRIBUTE.LINK.URL,
      urlTarget: editingDatas.ATTRIBUTE.LINK.TARGET,
      mappingField: editingDatas.ATTRIBUTE.MAPPING.FIELD,
      iconType: editingDatas.ATTRIBUTE.ICON.TYPE,
      iconLocation: editingDatas.ATTRIBUTE.ICON.LOCATION,
      borderDatas: editingDatas.ATTRIBUTE.BOX.BORDER,
      paddingDatas: editingDatas.ATTRIBUTE.BOX.PADDING,
      marginDatas: editingDatas.ATTRIBUTE.BOX.MARGIN,
      attribute: editingDatas.ATTRIBUTE
    });

    setCreate(editingType);
  }, [editingType, editingDatas.CATEGORY]);

  const handleOnClick = flag => {
    switch (flag) {
      case "applyPop":
        setShowPop({
          ...showPop,
          applyPop: !applyPop
        });
        break;
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
  const styleApplyPop = applyPop ? {} : { display: "none" };
  const styleBorderPop = borderPop ? {} : { display: "none" };
  const stylePaddingPop = paddingPop ? {} : { display: "none" };
  const styleMarginPop = marginPop ? {} : { display: "none" };
  const styleColorPop = colorPop ? {} : { display: "none" };

  const handleCheckBox = e => {
    const name = e.target.name;
    const val = e.target.value;

    switch (name) {
      case "isUse":
        setDatas({
          ...datas,
          [name]: !isUse
        });
        break;
      default:
        break;
    }
  };

  const handleVal = e => {
    setDatas({
      ...datas,
      [e.target.name]: e.target.value
    });
  };

  const reset = () => {
    alert("초기화");
    console.log("컴포넌트 초기화 처리");
  };

  const save = () => {
    alert("저장");
    console.log("컴포넌트 저장 처리");
  };

  const deleteComponent = () => {
    window.confirm("정말로 컴포넌트를 삭제하시겠습니까?");
    console.log("컴포넌트 삭제(사용안함) 처리");
  };

  return (
    <div className="AddingDiv">
      <div className="AddTitle">{title}</div>
      <div className="Apply">아래 속성의 일부를 템플릿에 적용</div>{" "}
      <img className="applyPop" src={downArrow} alt={"down"} />
      <div className="useSection">
        <div className="CompoUse">사용</div>
        <input
          id="iconUse"
          type="checkbox"
          name="isUse"
          checked={isUse}
          onChange={handleCheckBox}
        />
        <label htmlFor="iconUse"></label>
      </div>
      <div className="Add_property_section">
        <div className="ArrayLeft">
          <div className="NameTitle">Component Name</div>
          <div className="fullName">
            TEXT-{category}-({id})
          </div>
          <input
            type="text"
            className="Name"
            name="title"
            value={title}
            onChange={handleVal}
          />
          <div className="default">Component 속성 고정</div>{" "}
          <img
            className="default_pop"
            src={downArrow}
            alt={"down"}
            onClick={() => handleOnClick("applyPop")}
          />
          <div className="ApplyPop" style={styleApplyPop}>
            <ToggleApply isReset={isReset} isCreate={isCreate} />
          </div>
          <div className="boxTitle">Box</div>
          <div className="prop_width_tx">width</div>{" "}
          <input
            type="number"
            className="prop_width"
            name="width"
            value={width}
            onChange={handleVal}
          />
          <div className="prop_width_px">px</div>
          <div className="prop_height_tx">height</div>{" "}
          <input
            type="number"
            className="prop_height"
            name="height"
            value={height}
            onChange={handleVal}
          />
          <div className="prop_height_px">px</div>
          <div className="borderTitle">border</div>{" "}
          <img
            className="border_pop"
            src={downArrow}
            alt={"down"}
            onClick={() => handleOnClick("borderPop")}
          />
          <div style={styleBorderPop}>
            <ToggleBorder
              borderInfo={borderDatas}
              title={category}
              isReset={isReset}
              isCreate={isCreate}
            />
          </div>
          <div className="paddingTitle">padding</div>{" "}
          <img
            className="padding_pop"
            src={downArrow}
            alt={"down"}
            onClick={() => handleOnClick("paddingPop")}
          />
          <div style={stylePaddingPop}>
            <TogglePadding
              paddingInfo={paddingDatas}
              title={category}
              isReset={isReset}
              isCreate={isCreate}
            />
          </div>
          <div className="marginTitle">margin</div>{" "}
          <img
            className="margin_pop"
            src={downArrow}
            alt={"down"}
            onClick={() => handleOnClick("marginPop")}
          />
          <div style={styleMarginPop}>
            <ToggleMargin
              marginInfo={marginDatas}
              title={category}
              isReset={isReset}
              isCreate={isCreate}
            />
          </div>
          <div className="backgroundTitle">background-color</div>{" "}
          <img
            className="color_pop"
            src={downArrow}
            alt={"down"}
            onClick={() => handleOnClick("colorPop")}
          />
          <div style={styleColorPop}>
            <ToggleColor />
          </div>
          <div className="arrayBox">
            <div className="arrayTitle">정렬</div>
            <img id="img_left_array" src={leftArray} alt={"leftArray"} />
            <img id="img_center_array" src={centerArray} alt={"centerArray"} />
            <img id="img_right_array" src={rightArray} alt={"rightArray"} />
            <img
              id="img_justify_array"
              src={justifyArray}
              alt={"justifyArray"}
            />
            <div className="arraySection"></div>
          </div>
          <div className="iconTitle">Icon</div>
          <select
            className="iconSection"
            name="iconType"
            value={iconType}
            onChange={handleVal}
          >
            <option value="none">none</option>
            <option value="PDF">PDF</option>
            <option value="instagram">instagram</option>
            <option value="facebook">facebook</option>
            <option value="push_news">push news</option>
          </select>
          <input
            id="iconFront"
            type="radio"
            name="iconLocation"
            value="front"
            checked={iconLocation === "front"}
            onChange={handleVal}
          />{" "}
          <div className="front_tx">앞</div>
          <div className="back_tx">뒤</div>{" "}
          <input
            id="iconBack"
            type="radio"
            name="iconLocation"
            value="back"
            checked={iconLocation === "back"}
            onChange={handleVal}
          />
        </div>
        <div className="ArrayRight">
          <div className="fontTitle">Font</div>
          <div className="size">size</div>
          <input
            type="number"
            className="size_input"
            name="fontSize"
            value={fontSize}
            onChange={handleVal}
          />
          <div className="size_px">px</div>
          <div className="line_height">line height</div>
          <input
            type="number"
            className="line_height_input"
            name="lineHeight"
            value={lineHeight}
            onChange={handleVal}
          />
          <div className="line_height_px">px</div>
          <div className="weight">weight</div>
          <select
            className="weightSection"
            name="fontWeight"
            value={fontWeight}
            onChange={handleVal}
          >
            <option value="normal">normal</option>
            <option value="lighter">lighter</option>
            <option value="bold">bold</option>
          </select>
          <div className="family">family</div>{" "}
          <select
            className="familySection"
            name="fontFamily"
            value={fontFamily}
            onChange={handleVal}
          >
            <option value="돋음">돋음</option>
            <option value="궁서">궁서</option>
            <option value="굴림">굴림</option>
            <option value="맑음고딕">맑음고딕</option>
          </select>
          <div className="style">style</div>{" "}
          <select
            className="styleSection"
            name="fontStyle"
            value={fontStyle}
            onChange={handleVal}
          >
            <option value="normal">normal</option>
            <option value="italic">italic</option>
            <option value="oblique">oblique</option>
          </select>
          <div className="color">color</div>{" "}
          <div className="colorSection"></div>
          <div className="linkTitle">Link</div>
          <div className="url_tx">URL</div>{" "}
          <input
            className="url_input"
            type="text"
            name="url"
            value={url}
            onChange={handleVal}
          />
          <div className="target_tx">Target</div>
          <div className="targetNew_tx">새 창</div>{" "}
          <input
            id="targetNew"
            type="radio"
            name="urlTarget"
            value="_blank"
            checked={urlTarget === "_blank"}
            onChange={handleVal}
          ></input>
          <div className="targetNow_tx">현재 창</div>{" "}
          <input
            id="targetNow"
            type="radio"
            name="urlTarget"
            value="_self"
            checked={urlTarget === "_self"}
            onChange={handleVal}
          ></input>
          <div className="urlSection"></div>
          <div className="mappingTitle">매핑정보</div>
          <div className="field_tx">필드명</div>{" "}
          <input
            type="text"
            className="field_input"
            name="mappingField"
            value={mappingField}
            onChange={handleVal}
          />
        </div>
      </div>
      <div className="prop_button">
        <button className="prop_reset" onClick={reset}>
          초기화
        </button>
        <button className="prop_delete" onClick={deleteComponent}>
          삭제
        </button>
        <button className="prop_save" onClick={save}>
          저장
        </button>
      </div>
    </div>
  );
};

export default ComponentEditorText;
