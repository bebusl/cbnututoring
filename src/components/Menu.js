import React, { Component, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu as MenuUI } from "evergreen-ui";

function Menu({ program }) {
  const isAdminTest = true;
  const studentNav = [
    { title: "강좌 조회", to: "/alllist", component: <div>강좌 조회</div> },
    {
      title: "내 수강 목록",
      to: "/mylist",
      component: <div>내 수강 목록</div>,
    },
  ];
  const adminNav = [
    { title: "강좌 등록", to: "/coursereg", component: <div>강좌 등록</div> },
    {
      title: "강좌 관리",
      to: "/coursemanage",
      component: <div>강좌 관리</div>,
    },
    {
      title: "수강신청 관리",
      to: "/enrolmentseason",
      component: <div>수강신청 관리</div>,
    },
    { title: "보고서 관리", to: "/report", component: <div>보고서 관리</div> },
  ];

  const Navtitle = { tutor: "학부생 튜터링", ta: "TA프로그램" };

  const activeStyle = {
    color: "green",
    fontSize: "2rem",
  };

  useEffect(() => {
    console.log("나 업데이트 되고 이쏘요");
  });

  return (
    <div className="navigation">
      <MenuUI title={Navtitle[program]}>
        <MenuUI.Group title="학생">
          {studentNav.map((nav, index) => {
            console.log(`/${program}/student${nav.to}`);
            return (
              <MenuUI.Item key={index}>
                <NavLink exact to={`/${program}/student${nav.to}`}>
                  {nav.title}
                </NavLink>
              </MenuUI.Item>
            );
          })}
        </MenuUI.Group>
        <MenuUI.Divider />
        {isAdminTest ? (
          <MenuUI.Group title="관리자">
            {adminNav.map((nav, index) => {
              return (
                  <MenuUI.Item>
                  <NavLink exact to={`/${program}/admin${nav.to}`}>
                    {nav.title}</NavLink>
                  </MenuUI.Item>

              );
            })}
          </MenuUI.Group>
        ) : undefined}
      </MenuUI>

    </div>
  );
}

export default Menu;
