import React, { useState, useContext, createContext, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import  AuthCheck from './services/auth-header';
import {Pane} from 'evergreen-ui';

import AuthService from "./services/auth.service";
import Menu from './components/Menu';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ProgramSelect from "./components/ProgramSelect";
import AllList from './components/AllList'
import MyList from './components/MyList'
import CourseReg from './components/CourseReg'
import CourseManage from './components/CourseManage'
import EnrolmentSeason from './components/EnrolmentSeason.js'
import Report from './components/Report'


export const IsLogin = createContext();
export const UserData = createContext();

const program="tutor"
const start_year = "2020";
const today = new Date();
const today_year = today.getFullYear()+1;
let years = [];
for (var y = start_year; y <= today_year; y++) {
  years.push(y);
}
const isAdminTest = true;
const studentNav = [
  { title: "강좌 조회", to: "/alllist", component: <AllList years={years}/> },
  {
    title: "내 수강 목록",
    to: "/mylist",
    component: <MyList years={years}/>,
  },
];
const adminNav = [
  {
    title: "강좌 등록",
    to: "/coursereg",
    component: <CourseReg years={years} />,
  },
  {
    title: "강좌 관리",
    to: "/coursemanage",
    component: <CourseManage years={years} />,
  },
  {
    title: "수강신청 관리",
    to: "/enrolmentseason",
    component: <EnrolmentSeason />,
  },
  { title: "보고서 관리", to: "/report", component: <Report /> },
];


const App = () => {
  const [loginStatus,setLoginStatus]=useState(false);
  const [userData, setUserData]=useState({
      "name":"",
      "department":"",
      "id":"",
      "phoneNumber":"",
      "role":"",
      "_id":""
  });


  useEffect(()=>{
    let result= AuthCheck(false);
    console.log("새로고침? : ", result);
    if(result.auth==true){
      setLoginStatus(true);
      setUserData(result.datas);
    };
    console.log(loginStatus);
    console.log(userData);
  })


  const logOut = () => {
    AuthService.logout();
    setLoginStatus=false;
  };

  return (
  <IsLogin.Provider value={[loginStatus,setLoginStatus]}>
    <UserData.Provider value={[userData, setUserData]}>
    <div>
      {AuthCheck}
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          sw튜터링 시스템
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>


          {loginStatus && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {loginStatus ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                USER님
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                로그아웃
              </a>
            </li>
            <li>
                <Link exact to="/select" className="nav-link">프로그램 변경</Link>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/select"component={ProgramSelect} />
          {studentNav.map((url, idx) => {
            return (
              <Route
                exact
                path={`/${program}/student${url.to}`}
              >
                <div className="menu">
                {loginStatus &&<Menu program={program}/>}
                </div>

                <div className="main-column">
                  <h3>{url.title}</h3>
                  {url.component}</div>
              </Route>
            );
          })}
          {adminNav.map((url, idx) => (
            <Route
              exact
              path={`/${program}/admin${url.to}`}
              render={() => (<div>
                <h3>{url.title}</h3>
                {url.component}</div>)}
            />
          ))}
          

        </Switch>
      </div>
    </div>
    </UserData.Provider>
    </IsLogin.Provider>
  );
};

export default App;
