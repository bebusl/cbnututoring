import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  Router,
} from "react-router-dom";
import "./App.css";
import Base from "./components/layout/Base";
import Admin from "./components/routes/admin/index";
import Student from "./components/routes/student/index";
import User from "./components/routes/user/index";

import Menu from "./components/layout/Menu";

// const program = "tutor";
// const start_year = "2021";
// const today = new Date();
// //const today_year = today.getFullYear() + 1;
// let years = [];
// for (var y = start_year; y <= 2026; y++) {
//   years.push(y);
// }
const studentNav = [
  {
    title: "수강신청(강좌조회)",
    to: "courselist",
    component: <Student.CourseList />,
  },
  {
    title: "내 수강 목록",
    to: "mycourses",
    component: <Student.MyCourses />,
  },
  {
    title: "보고서 등록",
    to: "reportsubmit",
    component: <Student.ReportSubmit />,
  },
];
const adminNav = [
  {
    title: "강좌 등록",
    to: "/coursereg",
    component: <Admin.CourseReg />,
  },
  {
    title: "강좌 관리",
    to: "/coursemanage",
    component: <Admin.CourseManage />,
  },
  {
    title: "수강생 관리",
    to: "/attendee-admin/:year/:semester/:courseId",
    component: <Admin.AttendeeAdmin />,
  },
  // {
  //   title: "수강신청 기간 설정",
  //   to: "/enrolmentseason",
  //   component: (props) => <EnrolmentSeason years={years} {...props} />,
  // },
  {
    title: "보고서 관리",
    to: "/reportdownload",
    component: <Admin.ReportDownload />,
  },
];

const App = (props) => {
  // const [loginStatus, setLoginStatus] = useState(false);
  // const [userData, setUserData] = useState({
  //   name: "name",
  // });
  // const [hasRequired, setHasRequired] = useState(false);
  // const history = useHistory();

  // const handleChangeUserData = (newData) => {
  //   setUserData((state) => {
  //     return Object.assign({}, state, newData);
  //   });
  // };

  // useEffect(() => {
  //   axios
  //     .get("/api/accounts/auth")
  //     .then((res) => {
  //       console.log("어쓰 성공여부", res);
  //       if (res.data.success) {
  //         setLoginStatus(true);
  //         handleChangeUserData(res.data.account);
  //       } else {
  //         setLoginStatus(false);
  //         handleChangeUserData({});
  //       }
  //     })
  //     .catch((err) => console.log("로그인 에러", err));
  // }, [loginStatus]);

  // const logOut = () => {
  //   AuthService.logout()
  //     .then((res) => {
  //       if (res.data.success == true) {
  //         setLoginStatus(false);
  //         handleChangeUserData({});
  //         history.push("/login");
  //       }
  //     })
  //     .catch((e) => console.log("로그아웃에러", e));
  // };

  return (
    <Base>
      <Switch>
        <Route exact path={["/", "/login"]} component={User.Login} />
        <Route exact path="/register" component={User.Register} />
        <Route exact path="/profile" component={User} />
        <Route exact path="/findpassword" component={User.ForgotPassword} />
        {studentNav.map((url, idx) => (
          <Route exact path={`/tutor/student${url.to}`} key={idx} />
        ))}
        {adminNav.map((url, idx) => (
          <Route exact path={`/tutor/admin/${url.to}`} key={idx} />
        ))}
      </Switch>
    </Base>
    //<Base>마 안녕하십니꺼~</Base>
    // <IsLogin.Provider value={{ loginStatus, setLoginStatus }}>
    //   <UserData.Provider value={{ userData, setUserData }}>
    //     <div>
    //       <nav className="navbar navbar-expand navbar-dark bg-dark">
    //         <Link to={loginStatus ? "#" : "/"} className="navbar-brand">
    //           충북대학교 SW중심대학사업단 Keep-UpⓇ 관리 시스템
    //         </Link>
    //         <div className="navbar-nav mr-auto">
    //           {loginStatus && (
    //             <li className="nav-item">
    //               <Link to={"/user"} className="nav-link">
    //                 회원정보
    //               </Link>
    //             </li>
    //           )}
    //         </div>

    //         {loginStatus ? (
    //           <div className="navbar-nav ml-auto">
    //             <li className="nav-item">
    //               <Link to={"/profile"} className="nav-link">
    //                 {userData.name}님
    //               </Link>
    //             </li>
    //             <li className="nav-item">
    //               <a
    //                 href="/login"
    //                 className="nav-link"
    //                 onClick={(e) => {
    //                   e.preventDefault();
    //                   logOut();
    //                 }}
    //               >
    //                 로그아웃
    //               </a>
    //             </li>
    //           </div>
    //         ) : (
    //           <div className="navbar-nav ml-auto">
    //             <li className="nav-item">
    //               <Link to={"/login"} className="nav-link">
    //                 로그인
    //               </Link>
    //             </li>

    //             <li className="nav-item">
    //               <Link to={"/register"} className="nav-link">
    //                 회원가입
    //               </Link>
    //             </li>
    //           </div>
    //         )}
    //       </nav>

    //       <div className="container">
    //         <Switch>
    //           <Route exact path={["/", "/home"]} component={Login} />
    //           <Route exact path="/login" component={Login}>
    //             {loginStatus ? <Redirect to="/user" /> : undefined}
    //           </Route>
    //           <Route exact path="/register" component={Register} />
    //           <Route exact path="/user" component={User} />
    //           <Route exact path="/forgotpassword" component={ForgotPassword} />
    //           {loginStatus &&
    //             studentNav.map((url, idx) => {
    //               return (
    //                 <Route exact path={`/tutor/student${url.to}`} key={idx}>
    //                   {!loginStatus ? props.history.push("/login") : undefined}
    //                   <div className="menu">
    //                     {loginStatus && <Menu program={program} />}
    //                   </div>

    //                   <div className="main-column">
    //                     <h3>{url.title}</h3>
    //                     {url.component(props)}
    //                   </div>
    //                 </Route>
    //               );
    //             })}
    //           {loginStatus &&
    //             adminNav.map((url, idx) => (
    //               <Route
    //                 exact
    //                 path={`/tutor/admin${url.to}`}
    //                 key={idx}
    //                 render={(props) => {
    //                   return (
    //                     <>
    //                       <div className="menu">
    //                         {loginStatus && <Menu program={program} />}
    //                       </div>

    //                       <div className="main-column">
    //                         <h3>{url.title}</h3>
    //                         {url.component(props)}
    //                       </div>
    //                     </>
    //                   );
    //                 }}
    //               />
    //             ))}
    //         </Switch>
    //       </div>
    //     </div>
    //   </UserData.Provider>
    // </IsLogin.Provider>
  );
};

export default App;
