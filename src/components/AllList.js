import React, { useState } from "react";
import Table from "./Table";
import axios from "axios";

const AllList = ({ years, isCourseManage = false }) => {
  const [year, setYear] = useState(2020);
  const [semester, setSemester] = useState(1);
  const [datas, setDatas] = useState();
  const isAlllist = !isCourseManage;
  console.log("isAllList?", isAlllist, isCourseManage);

  const yearChange = (e) => {
    if (e.target.name === "year") {
      setYear(e.target.value);
    } else setSemester(e.target.value);
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
  };

  return (
    <div>
      <form onSubmit={search}>
        <p>
          년도{" "}
          <select name="year" onChange={yearChange}>
            {years.map((year) => (
              <option value={year}>{year}</option>
            ))}
          </select>
        </p>
        <p>
          학기{" "}
          <select name="semester" onChange={yearChange}>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </p>
        <button type="submit">검색</button>
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
