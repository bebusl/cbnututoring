import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "evergreen-ui";
function Report({ years }) {
  const [year, setYear] = useState(2020);
  const [semester, setSemester] = useState(1);
  const [datas, setDatas] = useState();
  const week = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const X = "X";
  const check = [X, X, X, X, X, X, X, X, X, X, X, X, X, X, X];

  const yearChange = (e) => {
    if (e.target.name === "year") {
      setYear(e.target.value);
    } else {
      setSemester(e.target.value);
    }
  };

  useEffect(() => {
    axios
      .post("/api/reports/find/", { year: year, semester: semester })
      .then((res) => {
        setDatas(res.data.courseData);
      })
      .catch((error) => console.log(error));
  }, []);

  const search = (e) => {
    e.preventDefault();
    axios
      .post("/api/reports/find/", {
        year: year,
        semester: semester,
        week: week,
      })
      .then((res) => {
        console.log("이번엔 위크넣어서", res);

        if (datas !== res.data.courseData) {
          setDatas(res.data.courseData);
        }
      });
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
        <div className="dateWrap">
          <div className="yearWrap">
            년도{" "}
            <select name="year" value={year} onChange={yearChange}>
              <option value={2020}>2020</option>
              <option value={2021}>2021</option>
              ))
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
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>강좌이름</Table.TextHeaderCell>
          <Table.TextHeaderCell>튜터이름</Table.TextHeaderCell>
          {week.map((data) => (
            <Table.TextHeaderCell key={data}>{data}주차</Table.TextHeaderCell>
          ))}
        </Table.Head>
        <Table.Body>
          {datas &&
            datas.map((data) => (
              <Table.Row key={data.id}>
                <Table.TextCell>{data.courseName}</Table.TextCell>
                <Table.TextCell>{data.tutorName}</Table.TextCell>
                {week.map((date) => (
                  <Table.TextCell key={(data.id, "-", date)}>
                    {data.reports.some((e) => e.week === date) ? "O" : "X"}
                  </Table.TextCell>
                ))}
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <Button marginY={8} marginRight={12}>
        보고서 다운
      </Button>
    </div>
  );
}

export default Report;
