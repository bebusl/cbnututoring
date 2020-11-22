import React, { useContext, useState } from "react";
import { UserData } from "../App";
import { Table as TableUI, Button, Dialog, Pane, toaster } from "evergreen-ui";
import DialogContents from "./DialogContents";
import User from "../services/user.service";
import Axios from "axios";
const fileDownload = require("js-file-download");

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
    content: "",
  });

  const handleDialog = (newcontent) => {
    setDialog(Object.assign({}, dialog, newcontent));
  };

  const setIsShownFalse = () => {
    //console.log("상위컴포넌트로 넘기기 되나? ", text);//이게 되네 ㅎ
    setIsShown(false);
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
        hasFooter={false}
      >
        {dialog.content}
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
                <TableUI.TextCell>{data.grade}</TableUI.TextCell>
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
                          Axios({
                            url: `/api/courses/download/${data.fileId}`,
                            method: "GET",
                            responseType: "blob",
                          })
                            .then((res) => {
                              fileDownload(
                                res.data,
                                `${decodeURIComponent(
                                  res.headers["file-name"]
                                )}`
                              );
                            })
                            .catch((error) => console.log(error));
                        }}
                      >
                        운영 계획서
                      </Button>
                      {data.tutorNumber === userData._id ? (
                        <Button
                          appearance="minimal"
                          onClick={() => {
                            handleDialog({
                              title: "보고서 등록",
                              confirmLabel: "등록",
                              content: (
                                <DialogContents.ReportReg
                                  data={data.id}
                                  onSubmit={setIsShownFalse}
                                />
                              ),
                            });

                            setIsShown(true);
                          }}
                        >
                          보고서등록
                        </Button>
                      ) : (
                        <Button
                          appearance="minimal"
                          onClick={() => {
                            if (data.appliedCount < data.limit) {
                              handleDialog({
                                title: "수강신청",
                                confirmLabel: "신청",
                                content: (
                                  <DialogContents.Enrolment
                                    data={data}
                                    onSubmit={setIsShownFalse}
                                    readOnly
                                  />
                                ),
                              });
                              setIsShown(true);
                            } else {
                              toaster.warning(
                                "인원이 초과되어 신청할 수 없습니다.",
                                {
                                  duration: 3,
                                }
                              );
                            }
                            //User.regCourse(data.id);
                          }}
                        >
                          수강신청
                        </Button>
                      )}
                    </>
                  ) : undefined}
                  {isCourseManage ? (
                    <>
                      <Button
                        appearance="minimal"
                        onClick={() => {
                          handleDialog({
                            title: "강좌 수정",
                            confirmLabel: "수정",
                            content: (
                              <DialogContents.CourseModify
                                data={data}
                                onSubmit={setIsShownFalse}
                              />
                            ),
                          });

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
                          handleDialog({
                            title: "수강 신청 취소",
                            confirmLabel: "취소",
                            content: (
                              <div>
                                <p>
                                  {data.courseName}과목의 수강을
                                  취소하시겠습니까?
                                </p>
                                <Button onClick={() => setIsShownFalse()}>
                                  아니오
                                </Button>
                                <Button
                                  onClick={() => {
                                    User.cancleRegCourse(data.id).then(
                                      (res) => {
                                        if (res.data.success === true) {
                                          toaster.success(
                                            "수강 취소 완료되었습니다.",
                                            { duration: 3 }
                                          );
                                        } else {
                                          toaster.warning(
                                            "에러가 발생해 수강 취소를 하지 못했습니다.",
                                            {
                                              duration: 3,
                                            }
                                          );
                                        }
                                        setIsShownFalse();
                                      }
                                    );
                                  }}
                                >
                                  예, 수강 취소하겠습니다.
                                </Button>
                              </div>
                            ),
                          });
                          setIsShown(true);
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
