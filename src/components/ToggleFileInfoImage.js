import React, { useState, useEffect } from "react";
import "./TemplateEditor.css";

//component image 속성 중, file 정보
const ToggleFileInfo = file => {
  const [valEdit, setValue] = useState({
    pop_file_name_input: file.fileInfo.FILENAME,
    pop_file_path_input: file.fileInfo.FILEPATH,
    pop_file_format_input: file.fileInfo.FILEFORMAT,
    pop_file_caption_input: file.fileInfo.CAPTION,
    pop_file_size_input: file.fileInfo.FILESIZE,
    pop_file_resolution_input: file.fileInfo.RESOLUTION,
    pop_file_description_tx: file.fileInfo.DESCRIPTION
  });

  const {
    pop_file_name_input,
    pop_file_path_input,
    pop_file_format_input,
    pop_file_caption_input,
    pop_file_size_input,
    pop_file_resolution_input,
    pop_file_description_tx
  } = valEdit;

  const handleVal = e => {
    const newVal = {
      ...valEdit,
      [e.target.className]: e.target.value
    };
    setValue(newVal);
  };

  //초기화
  useEffect(() => {
    //component 생성일 경우, 모든 값 빈 값으로 초기화
    if (
      file.isReset === true &&
      (file.isCreate === "copy" || file.isCreate === "create")
    ) {
      setValue({
        pop_file_name_input: "",
        pop_file_path_input: "",
        pop_file_format_input: "",
        pop_file_caption_input: "",
        pop_file_size_input: "",
        pop_file_resolution_input: "",
        pop_file_description_tx: ""
      });
      //component 편집일 경우, 기존 값으로 초기화
    } else if (file.isReset === true) {
      setValue({
        pop_file_name_input: file.fileInfo.FILENAME,
        pop_file_path_input: file.fileInfo.FILEPATH,
        pop_file_format_input: file.fileInfo.FILEFORMAT,
        pop_file_caption_input: file.fileInfo.CAPTION,
        pop_file_size_input: file.fileInfo.FILESIZE,
        pop_file_resolution_input: file.fileInfo.RESOLUTION,
        pop_file_description_tx: file.fileInfo.DESCRIPTION
      });
    }
  });

  useEffect(() => {
    setValue({
      pop_file_name_input: file.fileInfo.FILENAME,
      pop_file_path_input: file.fileInfo.FILEPATH,
      pop_file_format_input: file.fileInfo.FILEFORMAT,
      pop_file_caption_input: file.fileInfo.CAPTION,
      pop_file_size_input: file.fileInfo.FILESIZE,
      pop_file_resolution_input: file.fileInfo.RESOLUTION,
      pop_file_description_tx: file.fileInfo.DESCRIPTION
    });
  }, [file.title]);

  return (
    <div className="pop_file">
      <div className="pop_file_name">file name</div>
      <input
        className="pop_file_name_input"
        value={pop_file_name_input}
        onChange={handleVal}
      />
      <div className="pop_file_path">file path</div>
      <input
        className="pop_file_path_input"
        value={pop_file_path_input}
        onChange={handleVal}
      />
      <div className="pop_file_format">file format</div>
      <input
        className="pop_file_format_input"
        value={pop_file_format_input}
        onChange={handleVal}
      />
      <div className="pop_file_size">file size</div>
      <input
        className="pop_file_size_input"
        value={pop_file_size_input}
        onChange={handleVal}
      />
      <div className="pop_file_resolution">resolution</div>
      <input
        className="pop_file_resolution_input"
        value={pop_file_resolution_input}
        onChange={handleVal}
      />
      <div className="pop_file_caption">caption</div>
      <input
        className="pop_file_caption_input"
        value={pop_file_caption_input}
        onChange={handleVal}
      />
      <div className="pop_file_description">description</div>
      <textarea
        className="pop_file_description_tx"
        value={pop_file_description_tx}
        onChange={handleVal}
      />
    </div>
  );
};
export default ToggleFileInfo;
