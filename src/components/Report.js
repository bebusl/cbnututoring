import React, { useState, useEffect, useContext } from "react";
import { IsLogin, UserData } from "../App";
import axios from "axios";
import { Table, Button, Select, toaster } from "evergreen-ui";
import Axios from "axios";
const fileDownload = require("js-file-download");

function Report({ years, history }) {
  const [year, setYear] = useState(window.localStorage.getItem("year"));
  const [semester, setSemester] = useState(
    window.localStorage.getItem("semester")
  );
  const [datas, setDatas] = useState();
  const [selectWeek, setWeek] = useState(1);
  const { loginStatus, setLoginStatus } = useContext(IsLogin);
  const { userData, setUserData } = useContext(UserData);
  const week = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const X = "X";

  const yearChange = (e) => {
    if (e.target.name === "year") {
      setYear(e.target.value);
      window.localStorage.setItem("year", year);
    } else {
      setSemester(e.target.value);
      window.localStorage.setItem("semester", semester);
    }
  };

  const reportDown = (date, data) => {
    console.log(data.fileId);
    Axios({
      url: `/api/reports/download`,
      method: "POST",
      responseType: "blob",
      data: {
        fileId: data.fileId,
      },
    })
      .then((res) => {
        if (res.data.success === false && res.data.msg === "인증 실패!") {
          setLoginStatus(false);
          setUserData({});
          toaster.danger("다른 컴퓨터에서 로그인이 되어서 종료됩니다.");
          history.push("/login");
        }

        fileDownload(
          res.data,
          `${decodeURIComponent(res.headers["file-name"])}`
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .post("/api/reports/find/", { year: year, semester: semester })
      .then((res) => {
        if (res.data.success === false && res.data.msg === "인증 실패!") {
          setLoginStatus(false);
          setUserData({});
          toaster.danger("다른 컴퓨터에서 로그인이 되어서 종료됩니다.");
          history.push("/login");
        }
        setDatas(res.data.courseData);
        console.log("네가 찾는 바로 그것!", res.data);
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
        if (res.data.success === false && res.data.msg === "인증 실패!") {
          setLoginStatus(false);
          setUserData({});
          toaster.danger("다른 컴퓨터에서 로그인이 되어서 종료됩니다.");
          history.push("/login");
        }
        if (datas !== res.data.courseData) {
          setDatas(res.data.courseData);
        }
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
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
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
      <div>
        <table>
          <thead>
            <tr>
          <th>강좌이름</th>
          <th>튜터이름</th>
          {week.map((data) => (
            <th key={data}>{data}주차</th>
          ))}
            <th>다운로드</th>
            </tr>
            </thead>
    
        <tbody>
          {datas &&
            datas.map((data) => (
              <tr key={data.id}>
                <td>{data.courseName}</td>
                <td>{data.tutorName}</td>
                {week.map((date) => (
                  <td key={(data.id, "-", date)}>
                    {data.reports.some((e) => e.week === date) ? (
                      <Button
                        onClick={() =>
                          reportDown(
                            date,
                            data.reports.find(
                              (element) => element.week === date
                            )
                          )
                        }
                      >
                        O
                      </Button>
                    ) : (
                      "X"
                    )}
                  </td>
                ))}
                <td>
                  <Button
                    onClick={() => {
                      console.log("전체 다운로드 : ", data);
                      Axios({
                        url: `/api/reports/downloads`,
                        method: "POST",
                        responseType: "blob",
                        data: {
                          year: year,
                          semester: semester,
                          _id: data.tutorNumber,
                          courseId: data.id,
                        },
                      })
                        .then((res) => {
                          if (
                            res.data.success === false &&
                            res.data.msg === "인증 실패!"
                          ) {
                            setLoginStatus(false);
                            setUserData({});
                            toaster.danger(
                              "다른 컴퓨터에서 로그인이 되어서 종료됩니다."
                            );
                            history.push("/login");
                          }
                          console.log("집파일 맞나유~", res);
                          fileDownload(
                            res.data,
                            `${decodeURIComponent(res.headers["file-name"])}`
                          );
                        })
                        .catch((err) => toaster.warning("다운로드 실패" + err));
                    }}
                  >
                    다운로드
                  </Button>
                </td>
              </tr>
            ))}
          <tr>
            <td></td><td></td>
            {week.map((sweek) => {
              return (
                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("qhsoTjdyd");
                      Axios({
                        url: `/api/reports/downloads`,
                        method: "POST",
                        responseType: "blob",
                        data: {
                          week: sweek,
                          year: year,
                          semester: semester,
                        },
                      })
                        .then((res) => {
                          console.log("");
                          if (
                            res.data.success === false &&
                            res.data.msg === "인증 실패!"
                          ) {
                            setLoginStatus(false);
                            setUserData({});
                            toaster.danger(
                              "다른 컴퓨터에서 로그인이 되어서 종료됩니다."
                            );
                            history.push("/login");
                          }
                          fileDownload(
                            res.data,
                            `${decodeURIComponent(res.headers["file-name"])}`
                          );
                        })
                        .catch((err) => toaster.warning("다운로드 실패" + err));
                    }}
                  >
                    다운
                  </Button>
                </td>
              );
            })}
          </tr>
          </tbody>
          </table>
      </div>
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("보내는데이터", selectWeek, year, semester);
          Axios({
            url: `/api/reports/downloads`,
            method: "POST",
            responseType: "blob",
            data: {
              week: selectWeek,
              year: year,
              semester: semester,
            },
          })
            .then((res) => {
              if (res.data.success === false && res.data.msg === "인증 실패!") {
                setLoginStatus(false);
                setUserData({});
                toaster.danger("다른 컴퓨터에서 로그인이 되어서 종료됩니다.");
                history.push("/login");
              }
              fileDownload(
                res.data,
                `${decodeURIComponent(res.headers["file-name"])}`
              );
            })
            .catch((err) => toaster.warning("다운로드 실패" + err));
        }}
      >
        <Select
          value={selectWeek}
          onChange={(event) => {
            setWeek(event.target.value);
          }}
        >
          {week.map((data, idx) => (
            <option value={data} key={idx}>
              {data}
            </option>
          ))}
        </Select>
        <span>주차</span>
        <Button type="submit" marginY={8} marginLeft="1rem">
          보고서 다운로드
        </Button>
      </form> */}
    </div>
  );
}

export default Report;
