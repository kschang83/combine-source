import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import downArrow from "../img/arrow-down-sign-to-navigate.png";
import "./TemplateEditor.css";
import "./TemplateEditorMain.css";

import ToggleBorder from "./ToggleBorder.js";
import TogglePadding from "./TogglePadding.js";
import ToggleMargin from "./ToggleMargin.js";
import ToggleColor from "./ToggleColor.js";

const PropertyTemplate = ({ editDatas, onInsert, activeTab }) => {
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
      },
      COMPONENT: {
        TEXT: [
          {
            ID: "",
            TITLE: "",
            COUNT: 0
          }
        ],
        IMAGE: [
          {
            ID: "",
            TITLE: "",
            COUNT: 0
          }
        ]
      },
      REGDATE: "",
      REGNAME: "",
      MAPPING: {
        FIELD: ""
      }
    }
  });

  const [startDate, setStartDate] = useState(new Date()); // 추후 데이터 활용 (REGDATE)
  const [isReset, setReset] = useState(false);
  const [showPop, setShowPop] = useState({
    borderPop: false,
    paddingPop: false,
    marginPop: false,
    colorPop: false
  });

  const { ID, TITLE, DESCRIPTION, WIDTH, HEIGHT, ATTRIBUTE } = datas;
  const { borderPop, paddingPop, marginPop, colorPop } = showPop;

  useEffect(() => {
    const propEditDatas = {
      ID: editDatas.ID,
      TITLE: editDatas.TITLE,
      DESCRIPTION: editDatas.DESCRIPTION,
      WIDTH: editDatas.WIDTH,
      HEIGHT: editDatas.HEIGHT,
      ATTRIBUTE: editDatas.ATTRIBUTE
    };
    setDatas(propEditDatas);
  }, [editDatas.TITLE, editDatas.WIDTH, editDatas.HEIGHT]);

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

  //구성 컴포넌트 정리 (추후 데이터 활용 ATTRIBUTE-COMPONENT-TEXT/IMAGE/VIDEO)
  let txComponents = "";
  let imgComponents = "";
  let vidComponents = "";
  /*
  if (attr.COMPONENT.TEXT !== undefined) {
    txComponents = (attr.COMPONENT.TEXT).map(
      (txComponent) => (<ul className="ulTx">{txComponent.TITLE} ({txComponent.ID}) {txComponent.COUNT} </ul>));
  }

  if (attr.COMPONENT.IMAGE !== undefined) {
    imgComponents = (attr.COMPONENT.IMAGE).map(
      (imgComponent) => (<ul className="ulTx">{imgComponent.TITLE} ({imgComponent.ID}) {imgComponent.COUNT} </ul>));
  }

  if (attr.COMPONENT.VIDEO !== undefined) {
    vidComponents = (attr.COMPONENT.VIDEO).map(
      (vidComponent) => (<ul className="ulTx">{vidComponent.TITLE} ({vidComponent.ID}) {vidComponent.COUNT} </ul>));
  }
  */

  //기타 (추후 데이터 활용)
  const boxBorder = {
    BORDERWIDTH: 0,
    BORDERSTYLE: "",
    BORDERCOLOR: ""
  };
  const boxPadding = {
    PADDINGTOP: 0,
    PADDINGRIGHT: 0,
    PADDINGBOTTOM: 0,
    PADDINGLEFT: 0
  };
  const boxMargin = {
    MARGINTOP: 0,
    MARGINRIGHT: 30,
    MARGINBOTTOM: 0,
    MARGINLEFT: 0
  };
  const regName = "";
  const mappingField = "";

  //초기화
  const reset = () => {
    const propEditDatas = {
      ID: editDatas.ID,
      TITLE: editDatas.TITLE,
      DESCRIPTION: editDatas.DESCRIPTION,
      WIDTH: editDatas.WIDTH,
      HEIGHT: editDatas.HEIGHT,
      ATTRIBUTE: editDatas.ATTRIBUTE
    };
    setDatas(propEditDatas);

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
    onInsert(datas);
  };

  return (
    <div className="TemplateProp">
      <div className="property_section">
        <input
          type="text"
          className="propName"
          name="TITLE"
          value={TITLE}
          onChange={handleOnChange}
        />
        <div className="propTitle">{ID}</div>
        <div className="boxTitle">Box</div>
        <div className="prop_width_tx">width</div>{" "}
        <input
          type="number"
          className="prop_width"
          name="WIDTH"
          value={WIDTH}
          onChange={handleOnChange}
        />
        <div className="prop_width_px">px</div>
        <div className="prop_height_tx">height</div>{" "}
        <input
          type="number"
          className="prop_height"
          name="HEIGHT"
          value={HEIGHT}
          onChange={handleOnChange}
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
            borderInfo={boxBorder}
            title={TITLE}
            isReset={isReset}
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
            paddingInfo={boxPadding}
            title={TITLE}
            isReset={isReset}
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
            marginInfo={boxMargin}
            title={TITLE}
            isReset={isReset}
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
        <div className="composition">구성 컴포넌트</div>
        <div className="tx">TEXT</div>{" "}
        <div className="txComp">{txComponents} </div>
        <div className="img">IMAGE</div>{" "}
        <div className="imgComp">{imgComponents}</div>
        <div className="vid">VIDEO</div>{" "}
        <div className="vidComp">{vidComponents}</div>
        <div className="regTitle">등록정보</div>
        <div className="regDateTx">등록일</div>
        <DatePicker
          className="regDate"
          dateFormat="yyyy/MM/dd"
          selected={startDate}
          onChange={date => setStartDate(date)}
        />
        <div className="regNameTx">등록자</div>
        <input
          className="propRegName"
          value={regName}
          onChange={handleOnChange}
        />
        <div className="mappingTitle">매핑정보</div>
        <div className="field_tx">필드명</div>{" "}
        <input
          className="field_input"
          value={mappingField}
          onChange={handleOnChange}
        />
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
    </div>
  );
};

export default PropertyTemplate;
