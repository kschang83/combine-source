import React, { Component } from "react";
import "./TemplateEditor.css";
import "./TemplateEditorMain.css";

class ListTemplate extends Component {
  state = {
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
          },
          COMPONENT: {
            TEXT: [
              {
                ID: "C1",
                TITLE: "제목",
                COUNT: 1
              },
              {
                ID: "C8",
                TITLE: "관련기사",
                COUNT: 3
              }
            ],
            IMAGE: [
              {
                ID: "C15",
                TITLE: "일반",
                COUNT: 1
              }
            ]
          },
          REGDATE: "20190110",
          REGNAME: "조혜민",
          MAPPING: {
            FIELD: ""
          }
        }
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
          },
          COMPONENT: {
            TEXT: [
              {
                ID: "C1",
                TITLE: "제목",
                COUNT: 1
              },
              {
                ID: "C8",
                TITLE: "관련기사",
                COUNT: 3
              }
            ],
            IMAGE: [
              {
                ID: "C15",
                TITLE: "일반",
                COUNT: 1
              }
            ]
          },
          REGDATE: "20190110",
          REGNAME: "조혜민",
          MAPPING: {
            FIELD: ""
          }
        }
      }
    ]
  };

  prop_template = (template, firstId, lastId) => {
    const temp = document.getElementById(template.ID);
    const tempId = template.ID.substring(1, template.ID.length);

    const first = parseInt(firstId);
    const last = parseInt(lastId);

    for (var i = first; i <= last; i++) {
      if (i === parseInt(tempId)) {
        temp.style.backgroundColor = "#e0eaec";
        temp.style.fontWeight = "550";
        temp.style.bordercolor = "#909090";
        temp.style.color = "#20323a";
      } else {
        const oth_temp = document.getElementById("T" + i);
        oth_temp.style.backgroundColor = "white";
        oth_temp.style.fontWeight = "100";
        oth_temp.style.bordercolor = "#bbb8b8";
        oth_temp.style.color = "#bbb8b8";
      }
    }
  };

  render() {
    const templateData = this.state.DATA;
    const Id = templateData[0].ID;
    const firstId = Id.substring(1, Id.length);

    const Id2 = templateData[templateData.length - 1].ID;
    const lastId = Id2.substring(1, Id2.length);

    const templateList = templateData.map(template => (
      <button
        className="temp"
        key={template.ID}
        id={template.ID}
        onClick={() => this.prop_template(template, firstId, lastId)}
      >
        {template.TITLE} ({template.ID})
      </button>
    ));

    return (
      <div className="templateList">
        <input className="compoSearch" placeholder="Search Here" />
        {templateList}
      </div>
    );
  }
}

export default ListTemplate;
