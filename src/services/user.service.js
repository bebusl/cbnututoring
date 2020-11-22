import axios from "axios";

const courseInfo = (year, semester) => {
  return axios
    .get("/api/" + `courses/${year}/${semester}`)
    .then((response) => console.log("코스정보 불러오기 ", response));
};

const courseRegister = (sendForm) => {
  axios({
    url: "/api/" + "courses/register",
    method: "POST",
    data: sendForm,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then(function (response) {
      console.log("코스등록 이벤트 : ", response);
    })
    .catch((error) => console.log("error : ", error.response));
};
const courseDelete = (id) => {
  return axios
    .get("/api/" + `courses/delete/${id}`)
    .then((response) => console.log("코스정보 삭제"))
    .catch((error) => console.log("코스 정보 삭제 에러 ", error));
};

const registrationInfo = () => {
  return axios
    .get("/api/" + "registration")
    .then((response) => console.log("등록한 코스정보 확인"))
    .catch((error) => console.log("등록한 코스 정보 확인 에러 ", error));
};

const cancleRegCourse = (id) => {
  return axios.get("/api/" + `registration/delete/${id}`);
};

const regCourse = (id) => {
  return axios.post("/api/" + `registration/register`, { courseId: id });
};

const courseModify = (data) => {
  return axios({
    url: "/api/courses/modify",
    method: "POST",
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const reportUpload = (sendForm) => {
  return axios({
    url: "/api/reports/upload",
    method: "POST",
    data: sendForm,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getReports = () => {
  axios
    .get("/api/" + "/reports/")
    .then((response) => console.log("레포트확인"))
    .catch((error) => console.log("레포트확인 에러 ", error));
};

export default {
  courseInfo,
  courseRegister,
  courseDelete,
  registrationInfo,
  cancleRegCourse,
  regCourse,
  reportUpload,
  getReports,
  courseModify,
};
