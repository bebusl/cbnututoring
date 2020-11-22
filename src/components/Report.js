import React, { useState } from "react";
import axios from "axios";
import { Table } from "evergreen-ui";
function Report({ years }) {
  const [year, setYear] = useState(2020);
  const [semester, setSemester] = useState(1);
  const [datas, setDatas] = useState();
  const week = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const yearChange = (e) => {
    if (e.target.name === "year") {
      setYear(e.target.value);
    } else {
      setSemester(e.target.value);
    }
  };

  const search = (e) => {
    e.preventDefault();

    /* axios
      .get(`/api/courses/find/${year}/${semester}`)
      .then(function (response) {
        console.log("검색결과", response);
        setDatas(response.data.courseData);
        console.log(datas);
      })
      .catch((error) => {
        console.log("erer : ", error.response);
      }); 이거 보고서 목록 */
    window.localStorage.setItem("year", year);
    window.localStorage.setItem("semester", semester);
  };
  return (
    <div>
      <form onSubmit={search}>
        <p>
          년도{" "}
          <select name="year" value={year} onChange={yearChange}>
            <option value={2020}>2020</option>
            <option value={2021}>2021</option>
            ))
          </select>
        </p>
        <p>
          학기{" "}
          <select name="semester" value={semester} onChange={yearChange}>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </p>
        <button type="submit">검색</button>
      </form>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>튜터이름</Table.TextHeaderCell>
          {week.map((data) => (
            <Table.TextHeaderCell key={data}>{data}주차</Table.TextHeaderCell>
          ))}
        </Table.Head>
      </Table>
    </div>
  );
}

export default Report;
