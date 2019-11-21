/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./TemplateEditor.css";
import "./Toggle.css";

//component 속성 - Margin
const ToggleMargin = margin => {
  const [valEdit, setValue] = useState({
    pop_margin_top_input: 0,
    pop_margin_right_input: 0,
    pop_margin_bottom_input: 0,
    pop_margin_left_input: 0
  });

  const {
    pop_margin_top_input,
    pop_margin_right_input,
    pop_margin_bottom_input,
    pop_margin_left_input
  } = valEdit;

  //input text 관리
  const handleVal = e => {
    const newVal = {
      ...valEdit,
      [e.target.className]: e.target.value
    };

    setValue(newVal);
  };

  //초기화
  useEffect(() => {
    //component 생성일 경우, 모든 값 0으로 초기화
    if (
      margin.isReset === true &&
      (margin.isCreate === "copy" || margin.isCreate === "create")
    ) {
      setValue({
        pop_margin_top_input: 0,
        pop_margin_right_input: 0,
        pop_margin_bottom_input: 0,
        pop_margin_left_input: 0
      });
      //component 편집일 경우, 기본 값으로 초기화
    } else if (margin.isReset === true) {
      setValue({
        pop_margin_top_input: margin.marginInfo.MARGINTOP,
        pop_margin_right_input: margin.marginInfo.MARGINRIGHT,
        pop_margin_bottom_input: margin.marginInfo.MARGINBOTTOM,
        pop_margin_left_input: margin.marginInfo.MARGINLEFT
      });
    }
  }, [margin.title]);

  return (
    <div className="toggleBox paddingArea">
      <div className="toggleContent">
        <span className="title">margin-top</span>
        <input
          type="number"
          className="togglePaddingTop"
          name="pop_margin_top_input"
          value={pop_margin_top_input}
          onChange={handleVal}
        />
        <span className="title">px</span>
      </div>
      <div className="toggleContent">
        <span className="title">margin-right</span>
        <input
          type="number"
          className="togglePaddingTop"
          name="pop_margin_right_input"
          value={pop_margin_right_input}
          onChange={handleVal}
        />
        <span className="title">px</span>
      </div>
      <div className="toggleContent">
        <span className="title">margin-bottom</span>
        <input
          type="number"
          className="togglePaddingTop"
          name="pop_margin_bottom_input"
          value={pop_margin_bottom_input}
          onChange={handleVal}
        />
        <span className="title">px</span>
      </div>
      <div className="toggleContent">
        <span className="title">margin-left</span>
        <input
          type="number"
          className="togglePaddingTop"
          name="pop_margin_left_input"
          value={pop_margin_left_input}
          onChange={handleVal}
        />
        <span className="title">px</span>
      </div>
    </div>
  );
};

export default ToggleMargin;
