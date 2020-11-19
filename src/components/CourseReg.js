import React, { useState } from "react";
import axios from "axios";

function useForm({ initialValues, onSubmit, validate }) {
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFileChange = (e) => {
    setValues({ ...values, ["file"]: e.target.files[0] });
  };

  const handleSubmit = async (event) => {
    setSubmitting(true);
    event.preventDefault();
    const sendForm = new FormData();
    for (const i in values) {
      console.log("제출데이터 : ", i, " ", values[i]);
      sendForm.append(i, values[i]);
    }

    axios({
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
          window.alert("코스 등록 성공");
        } else {
          window.alert("코스 등록 실패");
        }
      })
      .catch((error) => window.alert("코스 등록 실패"));
    await new Promise((r) => setTimeout(r, 1000));
  };

  return {
    values,
    submitting,
    handleChange,
    handleSubmit,
    handleFileChange,
  };
}

export default function CourseReg({ years }) {
  const { handleChange, handleSubmit, handleFileChange } = useForm({
    initialValues: {
      year: "2020",
      semester: "1",
      department: "0",
      courseName: "",
      professorName: "",
      tutorName: "",
      tutorNumber: "",
      limit: "",
      file: "",
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <ul>
          <li>
            년도{" "}
            <select name="year" onChange={handleChange}>
              {years.map((year) => (
                <option value={year}>{year}</option>
              ))}
            </select>
          </li>
          <li>
            학기
            <select name="semester" onChange={handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </li>
          <li>
            소속
            <select name="department" onChange={handleChange}>
              <option value="0">컴퓨터공학과</option>
              <option value="1">소프트웨어학과</option>
              <option value="2">정보통신공학부</option>
              <option value="3">지능로봇학과</option>
            </select>{" "}
          </li>
          <li>
            교과목명
            <input
              type="text"
              name="courseName"
              onChange={handleChange}
            ></input>
          </li>

          <li>
            담당교수
            <input
              type="text"
              name="professorName"
              onChange={handleChange}
            ></input>
          </li>
          <li>
            튜터명
            <input type="text" name="tutorName" onChange={handleChange}></input>
          </li>
          <li>
            튜터학번
            <input
              type="text"
              name="tutorNumber"
              onChange={handleChange}
            ></input>
          </li>
          <li>
            최대인원
            <input type="text" name="limit" onChange={handleChange}></input>
          </li>
          <li>
            운영계획서
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
