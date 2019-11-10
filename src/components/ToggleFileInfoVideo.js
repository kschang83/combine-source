import React, { useState, useEffect } from "react";
import "./TemplateEditor.css";

//component video 속성 중, file 정보
const FileInfoPop_video = file => {
  const [valEdit, setValue] = useState({
    pop_file_video_name_input: file.fileInfo.FILENAME,
    pop_file_video_path_input: file.fileInfo.FILEPATH,
    pop_file_video_format_input: file.fileInfo.FILEFORMAT,
    pop_file_video_size_input: file.fileInfo.FILESIZE,
    pop_file_video_resolution_input: file.fileInfo.RESOLUTION,
    pop_file_video_playtime_input: file.fileInfo.PLAYTIME,
    pop_file_video_headImage_input: file.fileInfo.HEADIMAGE,
    pop_file_video_description_tx: file.fileInfo.DESCRIPTION
  });

  const {
    pop_file_video_name_input,
    pop_file_video_path_input,
    pop_file_video_format_input,
    pop_file_video_size_input,
    pop_file_video_resolution_input,
    pop_file_video_playtime_input,
    pop_file_video_headImage_input,
    pop_file_video_description_tx
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
        pop_file_video_name_input: "",
        pop_file_video_path_input: "",
        pop_file_video_format_input: "",
        pop_file_video_size_input: "",
        pop_file_video_resolution_input: "",
        pop_file_video_playtime_input: "",
        pop_file_video_headImage_input: "",
        pop_file_video_description_tx: ""
      });
      //component 편집일 경우, 기존 값으로 초기화
    } else if (file.isReset === true) {
      setValue({
        pop_file_video_name_input: file.fileInfo.FILENAME,
        pop_file_video_path_input: file.fileInfo.FILEPATH,
        pop_file_video_format_input: file.fileInfo.FILEFORMAT,
        pop_file_video_size_input: file.fileInfo.FILESIZE,
        pop_file_video_resolution_input: file.fileInfo.RESOLUTION,
        pop_file_video_playtime_input: file.fileInfo.PLAYTIME,
        pop_file_video_headImage_input: file.fileInfo.HEADIMAGE,
        pop_file_video_description_tx: file.fileInfo.DESCRIPTION
      });
    }
  });

  useEffect(() => {
    setValue({
      pop_file_video_name_input: file.fileInfo.FILENAME,
      pop_file_video_path_input: file.fileInfo.FILEPATH,
      pop_file_video_format_input: file.fileInfo.FILEFORMAT,
      pop_file_video_size_input: file.fileInfo.FILESIZE,
      pop_file_video_resolution_input: file.fileInfo.RESOLUTION,
      pop_file_video_playtime_input: file.fileInfo.PLAYTIME,
      pop_file_video_headImage_input: file.fileInfo.HEADIMAGE,
      pop_file_video_description_tx: file.fileInfo.DESCRIPTION
    });
  }, [file.title]);

  return (
    <div className="pop_file_video">
      <div className="pop_file_video_name">file name</div>
      <input
        className="pop_file_video_name_input"
        value={pop_file_video_name_input}
        onChange={handleVal}
      />
      <div className="pop_file_video_path">file path</div>
      <input
        className="pop_file_video_path_input"
        value={pop_file_video_path_input}
        onChange={handleVal}
      />
      <div className="pop_file_video_format">file format</div>
      <input
        className="pop_file_video_format_input"
        value={pop_file_video_format_input}
        onChange={handleVal}
      />
      <div className="pop_file_video_size">size</div>
      <input
        className="pop_file_video_size_input"
        value={pop_file_video_size_input}
        onChange={handleVal}
      />
      <div className="pop_file_video_resolution">resolution</div>
      <input
        className="pop_file_video_resolution_input"
        value={pop_file_video_resolution_input}
        onChange={handleVal}
      />
      <div className="pop_file_video_playtime">playtime</div>
      <input
        className="pop_file_video_playtime_input"
        value={pop_file_video_playtime_input}
        onChange={handleVal}
      />
      <div className="pop_file_video_headImage">haed image</div>
      <input
        className="pop_file_video_headImage_input"
        value={pop_file_video_headImage_input}
        onChange={handleVal}
      />
      <div className="pop_file_video_description">description</div>
      <textarea
        className="pop_file_video_description_tx"
        value={pop_file_video_description_tx}
        onChange={handleVal}
      />
    </div>
  );
};

export default FileInfoPop_video;
