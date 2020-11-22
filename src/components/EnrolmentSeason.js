import React, { useState } from "react";

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
