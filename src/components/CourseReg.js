import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { toaster } from "evergreen-ui";
import axios from "axios";

function useForm({ initialValues, history }) {
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFileChange = (e) => {
    setValues({ ...values, ["file"]: e.target.files[0] });
  };

  const duplicateInspection = () => {}; //강좌 중복된거없나 검사.

  const handleSubmit = async (event) => {
    setSubmitting(true);
    event.preventDefault();
    const sendForm = new FormData();
    for (const i in values) {
      console.log("제출데이터 : ", i, " ", values[i]);
      sendForm.append(i, values[i]);
    }

    await axios({
      url: "/api/courses/register",
      method: "POST",
      data: sendForm,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        console.log("코스등록 이벤트 : ", response);
        if (response.data.success === true) {
          toaster.success("강좌 등록을 성공했습니다.");
          history.push("/tutor/admin/coursemanage");
        } else {
          toaster.danger("강좌 등록을 실패했습니다." + response.data);
        }
      })
      .catch((error) => toaster.danger("에러가 발생했습니다." + error));
  };

  return {
    values,
    submitting,
    handleChange,
    handleSubmit,
    handleFileChange,
  };
}

export default function CourseReg({ years, history }) {
  const { handleChange, handleSubmit, handleFileChange } = useForm({
    initialValues: {
      year: "2021",
      semester: "1",
      department: "0",
      grade: "1",
      courseName: "",
      professorName: "",
      tutorName: "",
      tutorNumber: "",
      limit: "",
      file: "",
    },
    history,
  });

  return (
    <div>
      <form
        className="courseReg"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <ul>
          <li>
            <label htmlFor="year">년도</label>
            <select name="year" onChange={handleChange}>
              {years.map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
          </li>
          <li>
            <label htmlFor="semester">학기</label>

            <select name="semester" onChange={handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </li>
          <li>
            <label htmlFor="department">학과</label>
            <select name="department" onChange={handleChange}>
              <option value="0">컴퓨터공학과</option>
              <option value="1">소프트웨어학과</option>
              <option value="2">정보통신공학부</option>
              <option value="3">지능로봇공학과</option>
            </select>{" "}
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
              onChange={handleChange}
            ></input>
          </li>

          <li>
            <label htmlFor="professorName">담당교수</label>

            <input
              type="text"
              name="professorName"
              onChange={handleChange}
            ></input>
          </li>
          <li>
            <label htmlFor="tutorName">튜터이름</label>

            <input type="text" name="tutorName" onChange={handleChange}></input>
          </li>
          <li>
            <label htmlFor="tutorNumber">튜터학번</label>

            <input
              type="text"
              name="tutorNumber"
              onChange={handleChange}
            ></input>
          </li>
          <li>
            <label htmlFor="limit">최대인원</label>
            <input type="text" name="limit" onChange={handleChange}></input>
          </li>
          <li>
            <label htmlFor="profile">튜터프로필</label>
            <textarea
              id="profile"
              name="profile"
              rows="5"
              onChange={handleChange}
            ></textarea>
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
            <button type="submit">등록</button>
          </li>
        </ul>
      </form>
    </div>
  );
}
