import React, { useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";

import "./TemplateEditor.css";
import "./TemplateEditorMain.css";

const ListTemplate = () => {
  // 추후 서버와의 통신(axios)으로 데이터가 오면, 이를 받아서 props로 처리하도록
  const [templateDatas, setTemplageDatas] = useState({
    DATA: [
      {
        ID: "T1",
        TITLE: "템플릿1",
        DESCRIPTION: "1번 템플릿입니다!!",
        WIDTH: 550,
        HEIGHT: 40,
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
            BACKGROUNDCOLOR: "#FFFFFF",
            TEXTALIGN: ""
          }
        },
        COMPONENT: [
          {
            ID: "TX1",
            ORGID: "TX1",
            TYPE: "TEXT",
            CATEGORY: "제목",
            TITLE: "제목영역",
            SORTIDX: 0
          },
          {
            ID: "TX2",
            ORGID: "TX2",
            TYPE: "TEXT",
            CATEGORY: "부제목",
            TITLE: "부제목을 넣어주세요",
            SORTIDX: 1
          },
          {
            ID: "TX5",
            ORGID: "TX5",
            TYPE: "TEXT",
            CATEGORY: "본문",
            TITLE: "본문을 입력하는 곳!!!",
            SORTIDX: 2
          }
        ],
        REGDATE: "20190110",
        REGNAME: "조혜민",
        MAPPINGFIELD: ""
      },
      {
        ID: "T2",
        TITLE: "템플릿2",
        DESCRIPTION: "2번 TEMPLATE~~",
        WIDTH: 550,
        HEIGHT: 40,
        ATTRIBUTE: {
          BOX: {
            WIDTH: 550,
            HEIGHT: 40,
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
            BACKGROUNDCOLOR: "#FFFFFF",
            TEXTALIGN: ""
          }
        },
        COMPONENT: [
          {
            ID: "TX7",
            ORGID: "TX7",
            TYPE: "TEXT",
            CATEGORY: "날짜",
            TITLE: "2019-11-19 12:15:00",
            SORTIDX: 0
          },
          {
            ID: "TX10",
            ORGID: "TX10",
            TYPE: "TEXT",
            CATEGORY: "바이라인",
            TITLE: "donga@donga.com",
            SORTIDX: 1
          },
          {
            ID: "I1",
            ORGID: "I1",
            TYPE: "IMAGE",
            CATEGORY: "이미지일반",
            TITLE: "이미지제목OR캡션",
            SORTIDX: 2
          }
        ],
        REGDATE: "20190110",
        REGNAME: "조혜민",
        MAPPINGFIELD: ""
      }
    ]
  });

  const { DATA } = templateDatas;

  const templateList = (
    <Container
      groupName="dragndropArea"
      behaviour="copy"
      getChildPayload={i => DATA[i]}
    >
      {DATA.map(template => (
        <Draggable key={template.ID}>
          <div className="temp">
            {template.TITLE} ({template.ID})
          </div>
        </Draggable>
      ))}
    </Container>
  );

  return (
    <div className="templateList">
      <input className="compoSearch" placeholder="Search Here" />
      {templateList}
    </div>
  );
};

export default ListTemplate;
