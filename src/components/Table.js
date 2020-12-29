import React, { useContext, useState, useEffect } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { UserData } from "../App";
import {
  Table as TableUI,
  Button,
  Dialog,
  Pane,
  toaster,
  Alert,
} from "evergreen-ui";
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
  year,
  semester,
}) {
  const { userData } = useContext(UserData);
  const [mylistData, setmylistdata] = useState();
  const [accessSeason, setAccessSeason] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [dialog, setDialog] = useState({
    title: "",
    confirmLabel: "",
    content: "",
  });

  useEffect(() => {
    Axios.get(`/api/systems/find/1/${year}/${semester}`)
      .then((res) => {
        if (
          res.data.result.start > Date.now() ||
          Date.now() > res.data.result.end
        ) {
          setAccessSeason(false);
        }
        console.log(res.data.result.start, res.data.result.end, Date.now());
      })
      .catch((error) => console.log(error));
  }, [year, semester]);
  useEffect(() => {
    //push

    Axios.get(`/api/registration/`)
      .then(function (response) {
        setmylistdata(response.data.result);
      })
      .catch((error) => console.log("whyrano", error));
  }, []);

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
      {isAllList && !accessSeason && (
        <Alert intent="warning" title="수강신청 기간이 아닙니다."></Alert>
      )}
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
      <div className="scroll-page">
        <TableUI>
          <TableUI.Head>
            <TableUI.TextHeaderCell>소속</TableUI.TextHeaderCell>
            <TableUI.TextHeaderCell flexBasis={50} flexShrink={0} flexGrow={0}>
              학년
            </TableUI.TextHeaderCell>
            <TableUI.TextHeaderCell>교과목명</TableUI.TextHeaderCell>
            <TableUI.TextHeaderCell>담당교수</TableUI.TextHeaderCell>
            <TableUI.TextHeaderCell>튜터명</TableUI.TextHeaderCell>
            <TableUI.TextHeaderCell flexBasis={50} flexShrink={0} flexGrow={0}>
              최대인원
            </TableUI.TextHeaderCell>
            {isAllList ? (
              <TableUI.TextHeaderCell
                flexBasis={50}
                flexShrink={0}
                flexGrow={0}
              >
                신청인원
              </TableUI.TextHeaderCell>
            ) : undefined}
            <TableUI.TextHeaderCell flexBasis={220} flexShrink={0} flexGrow={0}>
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
                  <TableUI.TextCell flexBasis={50} flexShrink={0} flexGrow={0}>
                    {data.grade}
                  </TableUI.TextCell>
                  <TableUI.TextCell>{data.courseName}</TableUI.TextCell>
                  <TableUI.TextCell>{data.professorName}</TableUI.TextCell>
                  <TableUI.TextCell>{data.tutorName}</TableUI.TextCell>
                  <TableUI.TextCell flexBasis={50} flexShrink={0} flexGrow={0}>
                    {data.limit}
                  </TableUI.TextCell>
                  {isAllList ? (
                    <TableUI.TextCell
                      flexBasis={50}
                      flexShrink={0}
                      flexGrow={0}
                    >
                      {data.appliedCount}
                    </TableUI.TextCell>
                  ) : undefined}
                  {isAllList ? (
                    <TableUI.TextCell
                      flexBasis={220}
                      flexShrink={0}
                      flexGrow={0}
                    >
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
                          disabled={
                            !accessSeason ||
                            (mylistData &&
                              mylistData.some((e) => e.id === data.id))
                              ? true
                              : false
                          }
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
                              console.log(
                                "왜 안되는 거쥬",
                                data.appliedCount,
                                data.limit
                              );
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
                    </TableUI.TextCell>
                  ) : undefined}
                  {isCourseManage ? (
                    <TableUI.TextCell
                      flexBasis={250}
                      flexShrink={0}
                      flexGrow={0}
                    >
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
                          handleDialog({
                            title: "코스 삭제",
                            confirmLabel: "삭제",
                            content: (
                              <div>
                                <p>{data.courseName}과목을 삭제하시겠습니까?</p>
                                <Button onClick={() => setIsShownFalse()}>
                                  아니오
                                </Button>
                                <Button
                                  intent="danger"
                                  onClick={() => {
                                    User.courseDelete(data.id)
                                      .then((res) => {
                                        console.log("코스삭제 오류 확인", res);
                                        if (res.data.success === true) {
                                          toaster.success(
                                            "코스 삭제 완료되었습니다.",
                                            { duration: 3 }
                                          );
                                        } else {
                                          toaster.warning(
                                            "에러가 발생해 코스 삭제를 실패 했습니다.",
                                            {
                                              duration: 3,
                                            }
                                          );
                                        }
                                        setIsShownFalse();
                                      })
                                      .catch((error) => console.log(error));
                                    window.location.reload(false);
                                  }}
                                >
                                  예, 삭제하겠습니다.
                                </Button>
                              </div>
                            ),
                          });
                          setIsShown(true);
                        }}
                      >
                        삭제
                      </Button>
                      <Button
                        appearance="minimal"
                        disabled={data.appliedCount > 0 ? false : true}
                        onClick={() => {
                          handleDialog({
                            title: "수강생 목록 확인",
                            confirmLabel: "나가기",
                            content: (
                              <DialogContents.StudentList
                                data={data}
                                year={year}
                                semester={semester}
                                onSubmit={setIsShownFalse}
                              />
                            ),
                          });
                          setIsShown(true);
                        }}
                      >
                        수강생 목록
                      </Button>
                    </TableUI.TextCell>
                  ) : undefined}
                  {isMylist ? (
                    <TableUI.TextCell
                      flexBasis={220}
                      flexShrink={0}
                      flexGrow={0}
                    >
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
                                          console.log(res.data);
                                          toaster.success(
                                            "수강 취소 완료되었습니다.",
                                            { duration: 3 }
                                          );
                                          window.location.reload(false);
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
                        }}
                      >
                        신청취소
                      </Button>
                    </TableUI.TextCell>
                  ) : undefined}
                </TableUI.Row>
              ))
            )}
          </TableUI.Body>
        </TableUI>
      </div>
    </Pane>
  );
}

export default Table;
