import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";

const ReportReg = ({ years }) => {
  const [datas, setDatas] = useState();
  const [myList, setMyList] = useState();
  useEffect(() => {
    console.log("TUTORLIST");
    axios
      .get(`/api/registration/tutor/2021/1`)
      .then(function (response) {
        console.log("tutor 테스트", response);
        if (response.data.result !== datas) {
          setDatas(response.data.result);
        }
      })
      .catch((error) => {
        console.log("erer : ", error.response);
      });
  }, []);

  return (
    <div>
      <Table
        datas={datas}
        isAlllist={false}
        isMylist={false}
        isReportReg={true}
      ></Table>
    </div>
  );
};

export default ReportReg;
