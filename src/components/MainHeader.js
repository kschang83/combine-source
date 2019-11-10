import React from "react";
import "./MainHeader.css";

const MainHeader = () => {
  return (
    <div className="title">
      <div className="title_main">DONG-A's Editor</div>
      <div className="title_template">Template Editor</div>
      <div className="title_layout">Layout Editor</div>
      <div className="title_package">Package Editor</div>
    </div>
  );
};

export default MainHeader;
