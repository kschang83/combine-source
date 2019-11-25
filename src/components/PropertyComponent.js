import React, { useState, useEffect, Fragment } from "react";

import PropertyComponentText from "./PropertyComponentText.js";
import PropertyComponentImage from "./PropertyComponentImage.js";
import PropertyComponentVideo from "./PropertyComponentVideo.js";

const PropertyComponent = () => {
  const [selectDatas, setSelectDatas] = useState({
    selectType: "text",
    isText: true,
    isImage: false,
    isVideo: false,
    selectedEditingData: {}
  });

  const {
    selectType,
    isText,
    isImage,
    isVideo,
    selectedEditingData
  } = selectDatas;

  return (
    <Fragment>
      {isText ? <PropertyComponentText /> : null}
      {isImage ? <PropertyComponentImage /> : null}
      {isVideo ? <PropertyComponentVideo /> : null}
    </Fragment>
  );
};

export default PropertyComponent;
