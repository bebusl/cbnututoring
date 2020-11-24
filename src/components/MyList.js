import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";

const MyList = ({ years }) => {
  const [datas, setDatas] = useState();
  const [myList, setMyList] = useState();
  useEffect(() => {
    axios
      .get(`/api/registration/`)
      .then(function (response) {
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
      <Table datas={datas} isMylist={true}></Table>
    </div>
  );
};

export default MyList;
