import React from "react";
import { Table as TableUI, Button, IssueClosedIcon } from "evergreen-ui";
import User from "../services/user.service";
import axios from "axios";
import fileDownload from "file-saver";

const departmentList = ["컴퓨터공학과", "소프트웨어", "정보통신", "로봇"];

function Table({
  datas,
  isAllList = false,
  isCourseManage = false,
  isMylist = false,
}) {
  console.log("datas ", datas);
  return (
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
                    <Button
                      appearance="minimal"
                      onClick={() => {
                        User.reportUpload();
                      }}
                    >
                      보고서등록
                    </Button>
                  </>
                ) : undefined}
                {isCourseManage ? (
                  <>
                    <Button appearance="minimal">수정</Button>
                    <Button appearance="minimal">삭제</Button>
                  </>
                ) : undefined}
                {isMylist ? (
                  <>
                    <Button appearance="minimal" onClick={User.courseDelete}>
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
  );
}

export default Table;
