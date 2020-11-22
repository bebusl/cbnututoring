import React from "react";

const dateSelect = () => {
  const start_year = "2020";
  const today = new Date();
  const today_year = today.getFullYear() + 1;
  let years = [];
  for (var y = start_year; y <= today_year; y++) {
    years.push(y);
  }

  return (
    <form onSubmit={s}>
      <div className="yearwrap">
        <label for="year">년도</label>
        <select name="year" onChange={handleChange}>
          {props.years.map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="semesterwrap">
        <label for="semester">학기</label>
        <select name="semester" onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
    </form>
  );
};
