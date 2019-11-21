/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./TemplateEditor.css";
import "./Toggle.css";

//component 속성 - Border
const ToggleBorder = border => {
  const [width, setValue] = useState(0);
  const [borderStyle, setStyle] = useState("none");

  //초기화
  useEffect(() => {
    //component 생성일 경우, 모든 값 0으로 초기화
    if (
      border.isReset === true &&
      (border.isCreate === "copy" || border.isCreate === "create")
    ) {
      setValue(0);
      setStyle("none");
      //component 편집일 경우, 기존 값으로 초기화
    } else if (border.isReset === true) {
      setValue(border.borderInfo.BORDERWIDTH);
      setStyle(border.borderInfo.BORDERSTYLE);
    }
  }, [border.title]);

  //select option 관리 (border style)
  const handleChange = e => {
    setStyle(e.target.value);
  };

  //input text 관리 (border width)
  const handleVal = e => {
    setValue(e.target.value);
  };

  return (
    <div className="toggleBox">
      <div className="toggleContent">
        <span className="title">border-width</span>
        <input
          type="number"
          className="toggleBorderWidth"
          name="width"
          value={width}
          onChange={handleVal}
        />
        <span className="title">px</span>
      </div>
      <div className="toggleContent">
        <span className="title">border-style</span>
        <select
          className="pop_border_style_section"
          value={borderStyle}
          onChange={handleChange}
        >
          <option value="none">none</option>
          <option value="dashed">dashed</option>
          <option value="dotted">dotted</option>
          <option value="double">double</option>
          <option value="groove">groove</option>
        </select>
      </div>
      <div className="toggleContent">
        <span className="title">border-color</span>
      </div>
    </div>
  );
};
export default ToggleBorder;
