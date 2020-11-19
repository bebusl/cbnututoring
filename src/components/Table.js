import React, { useContext, useState } from "react";
import { UserData } from "../App";
import CourseReg from "./CourseReg";
import { Table as TableUI, Button, Dialog, Pane } from "evergreen-ui";
import User from "../services/user.service";
import fileDownload from "file-saver";

const departmentList = ["컴퓨터공학과", "소프트웨어", "정보통신", "로봇"];
function Table({
  datas,
  isAllList = false,
  isCourseManage = false,
  isMylist = false,
}) {
  const { userData } = useContext(UserData);
  const [isShown, setIsShown] = useState(false);
  const [dialog, setDialog] = useState({
    title: "",
    confirmLabel: "",
    content: {},
  });
  const [values, setValues] = useState({
    year: "2020",
    semester: "1",
    department: "0",
    courseName: "",
    professorName: "",
    tutorName: "",
    tutorNumber: "",
    limit: "",
    file: "",
  });

  const handleDialog = (name, value) => {
    setDialog(Object.assign({}, dialog, { [name]: value }));
    console.log(dialog);
  };
  //if (datas.tutorNumber === userData.studentNumber) {
  //  console.log("나 튜터임");
  //}
  //        <CourseReg years={[2020, 2021]}></CourseReg>

  return (
    <Pane>
      <Dialog
        isShown={isShown}
        title={dialog.title}
        onCloseComplete={() => {
          setIsShown(false);
        }}
        confirmLabel={dialog.confirmLabel}
      >
        {dialog.data}
      </Dialog>
      <TableUI>
        <TableUI.Head>
          <TableUI.TextHeaderCell>소속</TableUI.TextHeaderCell>
          <TableUI.TextHeaderCell>학년</TableUI.TextHeaderCell>
          <TableUI.TextHeaderCell>교과목명</TableUI.TextHeaderCell>
          <TableUI.TextHeaderCell>담당교수</TableUI.TextHeaderCell>
          <TableUI.TextHeaderCell>튜터명</TableUI.TextHeaderCell>
          <TableUI.TextHeaderCell>최대인원</TableUI.TextHeaderCell>
          {isAllList ? (
            <TableUI.TextHeaderCell>신청인원</TableUI.TextHeaderCell>
          ) : undefined}
          <TableUI.TextHeaderCell flexBasis={300} flexShrink={0} flexGrow={0}>
            버튼
          </TableUI.TextHeaderCell>
        </TableUI.Head>
        <TableUI.Body height={240}>
          {!datas ? (
            <TableUI.TextCell>내역이 없습니다.</TableUI.TextCell>
          ) : (
            datas.map((data, index) => (
              <TableUI.Row key={data.id}>
                <TableUI.TextCell>
                  {departmentList[data.department]}
                </TableUI.TextCell>
                <TableUI.TextCell>{data.tutorNumber}</TableUI.TextCell>
                <TableUI.TextCell>{data.courseName}</TableUI.TextCell>
                <TableUI.TextCell>{data.professorName}</TableUI.TextCell>
                <TableUI.TextCell>{data.tutorName}</TableUI.TextCell>
                <TableUI.TextCell>{data.limit}</TableUI.TextCell>
                {isAllList ? (
                  <TableUI.TextCell>{data.appliedCount}</TableUI.TextCell>
                ) : undefined}
                <TableUI.TextCell flexBasis={300} flexShrink={0} flexGrow={0}>
                  {isAllList ? (
                    <>
                      <Button
                        appearance="minimal"
                        onClick={() => {
                          User.regCourse(data.id);
                        }}
                      >
                        수강신청
                      </Button>
                      {data.tutorNumber === userData._id ? (
                        <Button
                          appearance="minimal"
                          onClick={() => {
                            handleDialog("title", "보고서 등록");
                            handleDialog("confirmLabel", "등록");

                            setIsShown(true);
                          }}
                        >
                          보고서등록
                        </Button>
                      ) : undefined}
                    </>
                  ) : undefined}
                  {isCourseManage ? (
                    <>
                      <Button
                        appearance="minimal"
                        onClick={() => {
                          setIsShown(true);
                        }}
                      >
                        수정
                      </Button>
                      <Button
                        appearance="minimal"
                        onClick={() => {
                          User.courseDelete(data.id);
                        }}
                      >
                        삭제
                      </Button>
                    </>
                  ) : undefined}
                  {isMylist ? (
                    <>
                      <Button
                        appearance="minimal"
                        onClick={() => {
                          console.log(data);
                          User.cancleRegCourse(data.id);
                        }}
                      >
                        신청취소
                      </Button>
                    </>
                  ) : undefined}
                </TableUI.TextCell>
              </TableUI.Row>
            ))
          )}
        </TableUI.Body>
      </TableUI>
    </Pane>
  );
}

export default Table;
