import Axios from "axios";
import React, { useState } from "react";
import { toaster } from "evergreen-ui";

const EnrolmentSeason = (props) => {
  const [values, setValues] = useState({
    start: "",
    end: "",
    year: 2020,
    semester: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(new Date(values.start).getTime());
          console.log(new Date(values.end).getTime());
          Axios.post("/api/systems/modify", {
            systemId: 1,
            year: values.year,
            semester: values.semester,
            start: new Date(values.start).getTime(),
            end: new Date(values.end).getTime(),
          }).then((res) => {
            toaster.success("기간 변경 성공");
            console.log("제출해봄", res);
          });
        }}
      >
        <div className="dateWrap">
          <div className="yearWrap">
            년도{" "}
            <select name="year" onChange={handleChange}>
              {props.years.map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="semesterWrap">
            학기{" "}
            <select name="semester" onChange={handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
        <h5>수강신청 기간 설정</h5>
        <input
          type="date"
          name="start"
          value={values.start}
          onChange={handleChange}
        ></input>
        ~
        <input
          type="date"
          name="end"
          value={values.end}
          onChange={handleChange}
        ></input>
        <button type="submit">기간 변경</button>
      </form>
    </>
  );
};

export default EnrolmentSeason;
