import React, { useState, useEffect, Fragment } from "react";

import PropertyComponentText from "./PropertyComponentText.js";
import PropertyComponentImage from "./PropertyComponentImage.js";
import PropertyComponentVideo from "./PropertyComponentVideo.js";

const PropertyComponent = ({
  initComponent,
  setInitComponent,
  editDatasComponent,
  insertComponent,
  choiceType
}) => {
  const [selectDatas, setSelectDatas] = useState({
    selectType: "TEXT",
    isText: false,
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

  useEffect(() => {
    switch (choiceType) {
      case "TEXT":
        setSelectDatas({
          ...selectDatas,
          isText: true,
          isImage: false,
          isVideo: false
        });
        break;
      case "IMAGE":
        setSelectDatas({
          ...selectDatas,
          isText: false,
          isImage: true,
          isVideo: false
        });
        break;
      case "VIDEO":
        setSelectDatas({
          ...selectDatas,
          isText: false,
          isImage: false,
          isVideo: true
        });
        break;
      default:
        break;
    }
  }, [choiceType]);

  return (
    <Fragment>
      {initComponent.empty ? null : (
        <div>
          {isText ? (
            <PropertyComponentText
              editDatasComponent={editDatasComponent}
              insertComponent={insertComponent}
              setInitComponent={setInitComponent}
            />
          ) : null}
          {isImage ? (
            <PropertyComponentImage
              editDatasComponent={editDatasComponent}
              insertComponent={insertComponent}
              setInitComponent={setInitComponent}
            />
          ) : null}
          {isVideo ? (
            <PropertyComponentVideo
              editDatasComponent={editDatasComponent}
              insertComponent={insertComponent}
              setInitComponent={setInitComponent}
            />
          ) : null}
        </div>
      )}
    </Fragment>
  );
};

export default PropertyComponent;
