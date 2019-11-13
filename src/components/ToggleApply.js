import React, { Component } from "react";
//import ReactDOM from "react-dom";
import "./TemplateEditor.css";

//Component Editor Dialog - 속성 고정
class ToggleApply extends Component {
  state = {
    checkedCount: 0,
    options: [
      { id: "allCheck" },
      { id: "applyIcon" },
      { id: "boxWidth" },
      { id: "boxHeight" },
      { id: "boxBorder" },
      { id: "boxPadding" },
      { id: "boxMargin" },
      { id: "backGround" },
      { id: "boxArray" },
      { id: "fontSize" },
      { id: "lineHeight" },
      { id: "weight" },
      { id: "family" },
      { id: "fontStyle" },
      { id: "fontColor" },
      { id: "applyUrl" },
      { id: "applyTarget" },
      { id: "mapping" }
    ]
  };

  //check box 관리
  toggleChange = e => {
    let clickedId = e.target.id;

    //전체선택
    if (clickedId === "allCheck" && this.refs.allCheck.checked) {
      for (let i = 1; i < this.state.options.length; i++) {
        let id = this.state.options[i].id;
        this.refs[id].checked = true;
      }
      this.setState({
        checkedCount: this.state.options.length - 1
      });
      //전체해제
    } else if (clickedId === "allCheck" && !this.refs.allCheck.Checked) {
      for (let i = 1; i < this.state.options.length; i++) {
        let id = this.state.options[i].id;
        this.refs[id].checked = false;
      }
      this.setState({
        checkedCount: 0
      });
    }
  };

  //초기화
  componentWillReceiveProps(nextProps) {
    //if (nextProps.isReset === true && (nextProps.isCreate === 'copy' || nextProps.isCreate === 'create') ) {
    if (nextProps.isReset === true) {
      //저장된 json 파일 기반으로 수정해야함
      for (let i = 0; i < this.state.options.length; i++) {
        let id = this.state.options[i].id;
        this.refs[id].checked = false;
      }
      this.setState({
        checkedCount: 0
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="applyCreateBox">
          <input
            type="checkbox"
            id="allCheck"
            name="allCheck"
            onChange={this.toggleChange}
            ref="allCheck"
          />
          <label htmlFor="allCheck"></label>
          <div className="ApplyTitle">속성</div>
          <div className="ApplyList">
            <div className="applyIcon">Icon</div>
            <input
              type="checkbox"
              id="applyIcon"
              name="applyIcon"
              onChange={this.toggleChange}
              ref="applyIcon"
            />
            <label htmlFor="applyIcon"></label>
            <div className="applyBox">Box</div>
            <div className="apply_boxWidth">width</div>
            <input
              type="checkbox"
              id="boxWidth"
              name="boxWidth"
              onChange={this.toggleChange}
              ref="boxWidth"
            />
            <label htmlFor="boxWidth"></label>
            <div className="apply_boxHeight">height</div>
            <input
              type="checkbox"
              id="boxHeight"
              name="boxHeight"
              onChange={this.toggleChange}
              ref="boxHeight"
            />
            <label htmlFor="boxHeight"></label>
            <div className="apply_boxBorder">border</div>
            <input
              type="checkbox"
              id="boxBorder"
              name="boxBorder"
              onChange={this.toggleChange}
              ref="boxBorder"
            />
            <label htmlFor="boxBorder"></label>
            <div className="apply_boxPadding">padding</div>
            <input
              type="checkbox"
              id="boxPadding"
              name="boxPadding"
              onChange={this.toggleChange}
              ref="boxPadding"
            />
            <label htmlFor="boxPadding"></label>
            <div className="apply_boxMargin">margin</div>
            <input
              type="checkbox"
              id="boxMargin"
              name="boxMargin"
              onChange={this.toggleChange}
              ref="boxMargin"
            />
            <label htmlFor="boxMargin"></label>
            <div className="apply_backGround">Back-ground</div>
            <input
              type="checkbox"
              id="backGround"
              name="backGround"
              onChange={this.toggleChange}
              ref="backGround"
            />
            <label htmlFor="backGround"></label>
            <div className="apply_boxArray">정렬</div>
            <input
              type="checkbox"
              id="boxArray"
              name="boxArray"
              onChange={this.toggleChange}
              ref="boxArray"
            />
            <label htmlFor="boxArray"></label>

            <div className="applyFont">Font</div>
            <div className="apply_fontSize">size</div>
            <input
              type="checkbox"
              id="fontSize"
              name="fontSize"
              onChange={this.toggleChange}
              ref="fontSize"
            />
            <label htmlFor="fontSize"></label>
            <div className="apply_lineHeight">line height</div>
            <input
              type="checkbox"
              id="lineHeight"
              name="lineHeight"
              onChange={this.toggleChange}
              ref="lineHeight"
            />
            <label htmlFor="lineHeight"></label>
            <div className="apply_weight">weight</div>
            <input
              type="checkbox"
              id="weight"
              name="weight"
              onChange={this.toggleChange}
              ref="weight"
            />
            <label htmlFor="weight"></label>
            <div className="apply_family">family</div>
            <input
              type="checkbox"
              id="family"
              name="family"
              onChange={this.toggleChange}
              ref="family"
            />
            <label htmlFor="family"></label>
            <div className="apply_fontStyle">style</div>
            <input
              type="checkbox"
              id="fontStyle"
              name="fontStyle"
              onChange={this.toggleChange}
              ref="fontStyle"
            />
            <label htmlFor="fontStyle"></label>
            <div className="apply_fontColor">color</div>
            <input
              type="checkbox"
              id="fontColor"
              name="fontColor"
              onChange={this.toggleChange}
              ref="fontColor"
            />
            <label htmlFor="fontColor"></label>

            <div className="applyLink">Link</div>
            <div className="apply_url">URL</div>
            <input
              type="checkbox"
              id="applyUrl"
              name="applyUrl"
              onChange={this.toggleChange}
              ref="applyUrl"
            />
            <label htmlFor="applyUrl"></label>
            <div className="apply_target">Target</div>
            <input
              type="checkbox"
              id="applyTarget"
              name="applyTarget"
              onChange={this.toggleChange}
              ref="applyTarget"
            />
            <label htmlFor="applyTarget"></label>

            <div className="applyMapping">매핑정보</div>
            <input
              type="checkbox"
              id="mapping"
              name="mapping"
              onChange={this.toggleChange}
              ref="mapping"
            />
            <label htmlFor="mapping"></label>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default ToggleApply;
