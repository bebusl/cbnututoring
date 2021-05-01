/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { UserData, IsLogin } from "../App";

import { toaster, Dialog } from "evergreen-ui";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import User from "../services/user.service";
import Axios from "axios";
import styled from "styled-components";

// const StudentList = ({ onSubmit, data, year, semester, history }) => {
//   const [infos, setInfo] = useState([]);
//   const { userData, setUserData } = useContext(UserData);
//   const { loginStatus, setLoginStatus } = useContext(IsLogin);
//   useEffect(() => {
//     console.log("courseID", data);
//     Axios.post("/api/registration/get", { courseId: data.id })
//       .then((res) => {
//         console.log(res);
//         if (res.data.success === false && res.data.msg === "인증 실패!") {
//           setLoginStatus(false);
//           setUserData({});
//           toaster.danger("다른 컴퓨터에서 로그인이 되어서 종료됩니다.");
//           history.push("/login");
//         } else if (infos !== res.data.result) {
//           setInfo(res.data.result);
//         }
//       })
//       .catch((err) => console.log("에러" + err));
//   }, []);

//   return (
//     <>
//       <div className="scroll-page">
//         <table id="student-list-to-xls">
//           <thead>
//             <tr>
//               <th className="hidden">소속</th>
//               <th className="hidden">학년</th>
//               <th className="hidden">교과목명</th>
//               <th className="hidden">담당교수</th>
//               <th className="hidden">튜터명</th>
//               <th>학번</th>
//               <th>학과</th>
//               <th>이름</th>
//               <th>이메일</th>
//             </tr>
//           </thead>
//           <tbody>
//             {infos &&
//               infos.map((info) => (
//                 <tr key={info.id}>
//                   <td className="hidden">{department[data.department]}</td>
//                   <td className="hidden">{data.grade}</td>
//                   <td className="hidden">{data.courseName}</td>
//                   <td className="hidden">{data.professorName}</td>
//                   <td className="hidden">{data.tutorName}</td>
//                   <td>{info._id}</td>
//                   <td>{department[info.department]}</td>
//                   <td>{info.name}</td>
//                   <td>{info.email}</td>
//                   <td>❌</td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//       <ReactHTMLTableToExcel
//         id="student-list-xls-button"
//         className="download-table-xls-button"
//         table="student-list-to-xls"
//         filename={`${year}_${semester}학기_${data.courseName}수강생`}
//         sheet="sheet1"
//         buttonText="수강생 목록 다운로드"
//       />
//       <Button onClick={onSubmit}>취소</Button>
//     </>
//   );
// };

const department = ["컴퓨터공학과", "소프트웨어학과", "정보통신학과", "로봇"];

function AttendeeAdmin({ location, history, match }) {
  const courseId = match.params.courseId;
  const data = location.state.data;
  const [infos, setInfo] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const { loginStatus, setLoginStatus } = useContext(IsLogin);
  const { userData, setUserData } = useContext(UserData);

  useEffect(() => {
    console.log(data);
    Axios.post("/api/registration/get", { courseId: courseId })
      .then((res) => {
        console.log(res);
        if (res.data.success === false && res.data.msg === "인증 실패!") {
          setLoginStatus(false);
          setUserData({});
          toaster.danger("다른 컴퓨터에서 로그인이 되어서 종료됩니다.");
          history.push("/login");
        } else if (infos !== res.data.result) {
          setInfo(res.data.result);
        }
      })
      .catch((err) => console.log("에러" + err));
  }, []);
  return (
    <>
      <Dialog
        isShown={isShown}
        title="수강생 삭제"
        onCloseComplete={() => {
          //예, 하면 그그 머시냐 삭제 요청 보내고 다시 useEffect에서 했던거 호출하면 됨!
          setIsShown(false);
        }}
        confirmLabel="예, 삭제하겠습니다."
        hasFooter={true}
      >
        삭제ㄱ?
      </Dialog>
      <div className="scroll-page">
        <h6>{data.courseName}</h6>
        <p>{data.professorName}교수님 과목</p>
        <table id="student-list-to-xls" className="hidden">
          <thead>
            <tr>
              <th>소속</th>
              <th>학년</th>
              <th>교과목명</th>
              <th>담당교수</th>
              <th>튜터명</th>
              <th className="hidden">학번</th>
              <th className="hidden">학과</th>
              <th className="hidden">이름</th>
              <th className="hidden">이메일</th>
            </tr>
          </thead>
          <tbody>
            {infos &&
              infos.map((info) => (
                <tr key={info.id}>
                  <td className="hidden">{department[data.department]}</td>
                  <td className="hidden">{data.grade}</td>
                  <td className="hidden">{data.courseName}</td>
                  <td className="hidden">{data.professorName}</td>
                  <td className="hidden">{data.tutorName}</td>
                  <td>{info._id}</td>
                  <td>{department[info.department]}</td>
                  <td>{info.name}</td>
                  <td>{info.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th className="hidden">소속</th>
              <th className="hidden">학년</th>
              <th className="hidden">교과목명</th>
              <th className="hidden">담당교수</th>
              <th className="hidden">튜터명</th>
              <th>학번</th>
              <th>학과</th>
              <th>이름</th>
              <th>이메일</th>
              <th>수강생 삭제</th>
            </tr>
          </thead>
          <tbody>
            {infos &&
              infos.map((info) => (
                <tr key={info.id}>
                  <td className="hidden">{department[data.department]}</td>
                  <td className="hidden">{data.grade}</td>
                  <td className="hidden">{data.courseName}</td>
                  <td className="hidden">{data.professorName}</td>
                  <td className="hidden">{data.tutorName}</td>
                  <td>{info._id}</td>
                  <td>{department[info.department]}</td>
                  <td>{info.name}</td>
                  <td>{info.email}</td>
                  <td>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setIsShown(true);
                      }}
                      className="cursor"
                    >
                      ❌
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ReactHTMLTableToExcel
        id="student-list-xls-button"
        className="download-table-xls-button"
        table="student-list-to-xls"
        filename={`${match.params.year}_${match.params.semester}학기_${data.courseName}수강생`}
        sheet="sheet1"
        buttonText="수강생 목록 다운로드"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          history.goBack();
        }}
      >
        뒤로가기
      </button>
    </>
  );
}

export default AttendeeAdmin;
