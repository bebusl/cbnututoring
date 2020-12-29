import Axios from "axios";
import React, { useState, useEffect } from "react";
import { toaster } from "evergreen-ui";

const EnrolmentSeason = (props) => {
  const [values, setValues] = useState({
    start: "",
    end: "",
    year: 2020,
    semester: 1,
  });

  const [setTime_start, settingStartTime] = useState(0);
  const [setTime_end, settingEndTime] = useState(0);

  useEffect(() => {
    Axios.get(`/api/systems/find/1/${values.year}/${values.semester}`)
      .then((res) => {
        if (res.data.result !== null) {
          settingEndTime(res.data.result.end);
          settingStartTime(res.data.result.start);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    Axios.get(`/api/systems/find/1/${values.year}/${values.semester}`)
      .then((res) => {
        if (
          res.data.result !== null &&
          res.data.result.start !== setTime_start &&
          res.data.result.end !== setTime_end
        ) {
          settingEndTime(res.data.result.end);
          settingStartTime(res.data.result.start);
          console.log("될까?", setTime_start, res.data.result.start);
        }
      })
      .catch((error) => console.log(error));
  }, [values.year, values.semester]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setValues({ ...values, [name]: value });
  };
  const toDate = (timestamp) => {
    const newDate = new Date(timestamp);
    return `${newDate.getFullYear()}년 ${
      newDate.getMonth() + 1
    }월 ${newDate.getDate()}일`;
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const start = new Date(values.start).getTime();
          const end = new Date(values.end).getTime();
          Axios.post("/api/systems/modify", {
            systemId: 1,
            year: values.year,
            semester: values.semester,
            start: start,
            end: end,
          }).then((res) => {
            toaster.success("기간 변경 성공");
            console.log("제출해봄", res);
            settingStartTime(start);
            settingEndTime(end);
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
        <p>
          현재기간 : {toDate(setTime_start)} ~ {toDate(setTime_end)}
        </p>
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
