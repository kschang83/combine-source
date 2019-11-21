/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./TemplateEditor.css";
import "./Toggle.css";

//component 속성 - padding
const TogglePadding = padding => {
  const [valEdit, setValue] = useState({
    pop_padding_top_input: 0,
    pop_padding_right_input: 0,
    pop_padding_bottom_input: 0,
    pop_padding_left_input: 0
  });

  const {
    pop_padding_top_input,
    pop_padding_right_input,
    pop_padding_bottom_input,
    pop_padding_left_input
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
      padding.isReset === true &&
      (padding.isCreate === "copy" || padding.isCreate === "create")
    ) {
      setValue({
        pop_padding_top_input: 0,
        pop_padding_right_input: 0,
        pop_padding_bottom_input: 0,
        pop_padding_left_input: 0
      });
      //component 편집일 경우, 기본 값으로 초기화
    } else if (padding.isReset === true) {
      setValue({
        pop_padding_top_input: padding.paddingInfo.PADDINGTOP,
        pop_padding_right_input: padding.paddingInfo.PADDINGRIGHT,
        pop_padding_bottom_input: padding.paddingInfo.PADDINGBOTTOM,
        pop_padding_left_input: padding.paddingInfo.PADDINGLEFT
      });
    }
  }, [padding.title]);

  return (
    <div className="toggleBox paddingArea">
      <div className="toggleContent">
        <span className="title">padding-top</span>
        <input
          type="number"
          className="togglePaddingTop"
          name="pop_padding_top_input"
          value={pop_padding_top_input}
          onChange={handleVal}
        />
        <span className="title">px</span>
      </div>
      <div className="toggleContent">
        <span className="title">padding-right</span>
        <input
          type="number"
          className="togglePaddingTop"
          name="pop_padding_right_input"
          value={pop_padding_right_input}
          onChange={handleVal}
        />
        <span className="title">px</span>
      </div>
      <div className="toggleContent">
        <span className="title">padding-bottom</span>
        <input
          type="number"
          className="togglePaddingTop"
          name="pop_padding_bottom_input"
          value={pop_padding_bottom_input}
          onChange={handleVal}
        />
        <span className="title">px</span>
      </div>
      <div className="toggleContent">
        <span className="title">padding-left</span>
        <input
          type="number"
          className="togglePaddingTop"
          name="pop_padding_left_input"
          value={pop_padding_left_input}
          onChange={handleVal}
        />
        <span className="title">px</span>
      </div>
    </div>
  );
};

export default TogglePadding;
