/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./TemplateEditor.css";

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
    <div className="pop_padding">
      <div className="pop_padding_top">padding-top</div>
      <input
        type="number"
        className="pop_padding_top_input"
        name="pop_padding_top_input"
        value={pop_padding_top_input}
        onChange={handleVal}
      />
      <div className="pop_padding_top_px">px</div>
      <div className="pop_padding_right">padding-right</div>
      <input
        className="pop_padding_right_input"
        value={pop_padding_right_input}
        onChange={handleVal}
      />
      <div className="pop_padding_right_px">px</div>
      <div className="pop_padding_bottom">padding-bottom</div>
      <input
        className="pop_padding_bottom_input"
        value={pop_padding_bottom_input}
        onChange={handleVal}
      />
      <div className="pop_padding_bottom_px">px</div>
      <div className="pop_padding_left">padding-left</div>
      <input
        className="pop_padding_left_input"
        value={pop_padding_left_input}
        onChange={handleVal}
      />
      <div className="pop_padding_left_px">px</div>
    </div>
  );
};

export default TogglePadding;
