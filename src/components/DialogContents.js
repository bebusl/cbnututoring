import React, { useContext, useEffect, useState } from "react";
import { UserData } from "../App";
import { TextInputField, Button, toaster, Select } from "evergreen-ui";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import User from "../services/user.service";
import Axios from "axios";

const department = ["컴퓨터공학과", "소프트웨어학과", "정보통신학과", "로봇"];
const week = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const year = [2020, 2021, 2022, 2023, 2024, 2025, 2026];

const Enrolment = ({ onSubmit, data }) => {
  const { userData } = useContext(UserData);
  console.log("Enrolment : ", userData, data);
  const onenrolmentSubmit = () => {
    User.regCourse(data.id)
      .then((res) => {
        if (res.data.success === true) {
          toaster.success("코스 등록에 성공했습니다.", {
            duration: 3,
          });
          window.location.reload(false);
        } else {
          toaster.danger("코스 등록에 실패했습니다.", {
            duration: 5,
          });
        }
      })
      .catch((error) => {
        console.log("등록안됨");
        toaster.danger("코스 등록에 실패했습니다.", {
          duration: 5,
        });
      });
    onSubmit();
  };

  return (
    <div className="enrolment">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onenrolmentSubmit();
        }}
      >
        <TextInputField
          label="학과"
          defaultValue={department[userData.department]}
        />
        <TextInputField label="학번" defaultValue={userData._id} />
        <TextInputField label="이름" defaultValue={userData.name} />
        <TextInputField label="이메일" defaultValue={userData.email} />
        <TextInputField label="연락처" defaultValue={userData.phoneNumber} />
        <Button type="submit">제출</Button>
      </form>
    </div>
  );
};

const CourseModify = ({ onSubmit, data }) => {
  const [values, setValues] = useState({
    year: data.year,
    semester: data.semester,
    department: data.department,
    grade: data.grade,
    courseName: data.courseName,
    professorName: data.professorName,
    tutorName: data.tutorName,
    tutorNumber: data.tutorNumber,
    limit: data.limit,
    file: data.file,
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setValues({ ...values, file: e.target.files[0] });
  };

  const onmodifySubmit = () => {
    const sendForm = new FormData();
    for (const i in values) {
      sendForm.append(i, values[i]);
    }

    sendForm.append("courseId", data.id);
    for (let key of sendForm.keys()) {
      console.log("제출 키", key);
    }

    // FormData의 value 확인
    for (let value of sendForm.values()) {
      console.log("제출 값", value);
    }

    User.courseModify(sendForm)
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          toaster.success("코스 수정에 성공했습니다.", {
            duration: 3,
          });
          window.location.reload(false);
        } else {
          toaster.danger("코스 수정에 실패했습니다.", {
            duration: 3,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toaster.danger("코스 수정에 실패했습니다.", {
          duration: 3,
        });
      });
    onSubmit();
  };
  return (
    <div className="courseModify">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onmodifySubmit();
        }}
        encType="multipart/form-data"
      >
        <ul>
          <li>
            <label htmlFor="year">년도</label>
            <select name="year" value={values.year} onChange={handleChange}>
              {year.map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
              ))
            </select>
          </li>
          <li>
            <label htmlFor="semester">학기</label>
            <select
              name="semester"
              value={values.semester}
              onChange={handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </li>
          <li>
            <label htmlFor="department">소속</label>
            <select name="department" onChange={handleChange}>
              <option value="0">컴퓨터공학과</option>
              <option value="1">소프트웨어학과</option>
              <option value="2">정보통신공학부</option>
              <option value="3">지능로봇공학과</option>
            </select>
          </li>
          <li>
            <label htmlFor="grade">학년</label>
            <select name="grade" onChange={handleChange}>
              <option value="1">1학년</option>
              <option value="2">2학년</option>
              <option value="3">3학년</option>
              <option value="4">4학년</option>
            </select>
          </li>
          <li>
            <label htmlFor="courseName">교과목명</label>
            <input
              type="text"
              name="courseName"
              value={values.courseName}
              onChange={handleChange}
            ></input>
          </li>

          <li>
            <label htmlFor="professorName">담당교수</label>
            <input
              type="text"
              name="professorName"
              value={values.professorName}
              onChange={handleChange}
            ></input>
          </li>
          <li>
            <label htmlFor="tutorName">튜터이름</label>
            <input
              type="text"
              name="tutorName"
              value={values.tutorName}
              onChange={handleChange}
            ></input>
          </li>
          <li>
            <label htmlFor="tutorNumber">튜터학번</label>
            <input
              type="text"
              name="tutorNumber"
              value={values.tutorNumber}
              onChange={handleChange}
            ></input>
          </li>
          <li>
            <label htmlFor="limit">최대인원</label>
            <input
              type="text"
              name="limit"
              value={values.limit}
              onChange={handleChange}
            ></input>
          </li>
          <li>
            <label htmlFor="file">운영계획서</label>
            <input
              type="file"
              name="file"
              accept=".pdf,.hwp"
              onChange={handleFileChange}
            />
          </li>
          <li>
            <button type="submit">수정</button>
          </li>
        </ul>
      </form>
    </div>
  );
};

const ReportReg = ({ onSubmit, data }) => {
  const [values, setValues] = useState({
    file: "",
    week: 1,
  });

  const handleChange = (e) => {
    setValues({ ...values, week: e.target.value });
  };

  const handleFileChange = (e) => {
    setValues({ ...values, file: e.target.files[0] });
  };

  const onreportSubmit = (e) => {
    const sendForm = new FormData();
    sendForm.append("file", values.file);
    sendForm.append("week", values.week);
    sendForm.append("courseId", data);

    e.preventDefault();
    User.reportUpload(sendForm)
      .then((res) => {
        if (res.data.success === true) {
          console.log(res);
          toaster.success("보고서 등록에 성공했습니다.", {
            duration: 3,
          });
          onSubmit();
        } else {
          toaster.danger("보고서 등록에 실패했습니다." + res.data.success, {
            duration: 3,
          });
        }
      })
      .catch((error) => {
        toaster.danger("보고서 등록에 실패했습니다." + error, {
          duration: 3,
        });
      });
  };
  return (
    <div>
      <form onSubmit={onreportSubmit}>
        <label htmlFor="reportWeek">기간</label>
        <select name="reportWeek" onChange={handleChange}>
          {week.map((data, idx) => {
            return (
              <option value={data} key={idx}>
                {data}주차
              </option>
            );
          })}
        </select>
        <label htmlFor="file">보고서</label>
        <input
          type="file"
          name="file"
          accept=".pdf,.hwp"
          onChange={handleFileChange}
        />
        <button type="submit">제출</button>
      </form>
    </div>
  );
};
/*user정보는 context에서 들고옴. 그 외에 정보는 props로 전달 받음 user정보에 있는건 바로 출력되도록 하기*/

const StudentList = ({ onSubmit, data, year, semester }) => {
  const [infos, setInfo] = useState([]);

  useEffect(() => {
    console.log("courseID", data);
    Axios.post("/api/registration/get", { courseId: data.id })
      .then((res) => {
        console.log(res);
        if (infos !== res.data.result) {
          setInfo(res.data.result);
        }
      })
      .catch((err) => console.log("에러" + err));
  }, []);
  return (
    <>
      <ReactHTMLTableToExcel
        id="student-list-xls-button"
        className="download-table-xls-button"
        table="student-list-to-xls"
        filename={`${year}_${semester}학기_${data.courseName}수강생`}
        sheet="sheet1"
        buttonText="수강생 목록 다운로드"
      />
      <table id="student-list-to-xls">
        <thead>
          <tr>
            <th>학번</th>
            <th>학과</th>
            <th>이름</th>
            <th>이메일</th>
          </tr>
        </thead>
        <tbody>
          {infos &&
            infos.map((info) => (
              <tr key={info.id}>
                <td>{info._id}</td>
                <td>{department[info.department]}</td>
                <td>{info.name}</td>
                <td>{info.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default { Enrolment, CourseModify, ReportReg, StudentList };
