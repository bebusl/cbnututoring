import React, { useState, useEffect } from "react";
import Table from "./Table";
import axios from "axios";

const AllList = ({ years, isCourseManage = false }) => {
  const [year, setYear] = useState(2020);
  const [semester, setSemester] = useState(1);
  const [datas, setDatas] = useState();
  const isAlllist = !isCourseManage;
  console.log("isAllList?", isAlllist, isCourseManage);

  /*useEffect(() => {
    console.log("이때만해도 되겠닝..?");
    const tempYear = window.localStorage.getItem("year");
    const tempSemester = window.localStorage.getItem("semester");
    console.log(tempYear, tempSemester);
    if (
      tempYear !== null &&
      tempYear !== year &&
      tempSemester !== null &&
      tempSemester !== semester
    ) {
      setYear(tempYear);
      setSemester(tempSemester);
    }
    console.log("useEffect이후 year, semester", year, semester);
  })
*/
  const yearChange = (e) => {
    if (e.target.name === "year") {
      setYear(e.target.value);
    } else {
      setSemester(e.target.value);
    }
  };

  const search = (e) => {
    e.preventDefault();
    console.log(year, " ", semester);
    axios
      .get(`/api/courses/find/${year}/${semester}`)
      .then(function (response) {
        console.log("검색결과", response);
        setDatas(response.data.courseData);
      })
      .catch((error) => {
        console.log("erer : ", error.response);
      });
    window.localStorage.setItem("year", year);
    window.localStorage.setItem("semester", semester);
  };

  return (
    <div>
      <form onSubmit={search}>
        <div className="dateWrap">
          <div className="yearWrap">
            년도{" "}
            <select name="year" value={year} onChange={yearChange}>
              {years.map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="semesterWrap">
            학기{" "}
            <select name="semester" value={semester} onChange={yearChange}>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <button type="submit">검색</button>
        </div>
      </form>

      <Table
        datas={datas}
        isAllList={isAlllist}
        isCourseManage={isCourseManage}
      ></Table>
    </div>
  );
};

export default AllList;
