import React, { Component, Fragment } from "react";

class EnrolmentSeason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: "",
      end: ""
    };
  }

  onChangeStart = (e) => {
    console.log(e.type, ":", e.target.value);
    this.setState({
      start: e.target.value,
    });
  };

  onChangeEnd = (e) => {
    console.log(e.type, ":", e.target.value);
    this.setState({
      end: e.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <h5>수강신청 기간 설정</h5>
        <form>
          <input type="date" value={this.state.start} onChange={this.onChangeStart}></input>
          ~<input type="date" value={this.state.end} onChange={this.onChangeEnd}></input>
        <button type="submit">기간 변경</button>
        </form>
      </Fragment>
    );
  }
}

export default EnrolmentSeason;
