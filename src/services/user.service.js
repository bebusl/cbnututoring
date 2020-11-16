import axios from "axios";


const courseInfo = (year, semester) => {
  return axios
    .get("/api/" + `courses/${year}/${semester}`)
    .then((response) => console.log("코스정보 불러오기 ", response));
};

const courseRegister = (sendForm) => {
  axios({
    url: "/api/"+"courses/register",
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
  .catch((error) => console.log("등록한 코스 정보 확인 에러 ", error));;
};


const cancleRegCourse = (id)=> {
  return axios
  .get("/api/" + `registration/delete/${id}`)
  .then((response) => console.log("코스취소"))
  .catch((error) => console.log("코스취소 에러 ", error));
}

const regCourse = (id)=>{
  axios
  .post("/api/" + `registration/register`, { courseId:id})
  .then((response) => {console.log("코스 등록신청" ,response );window.alert("코스신청 완료");})
  .catch((error) => console.log("코스 등록신청 에러 ", error));

};

const reportUpload = (sendForm) => {
  axios({
    url: "/api/"+"reports/upload",
    method: "POST",
    data: sendForm,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then(function (response) {
      console.log("레포트등록 : ", response);
    })
    .catch((error) => console.log("레포트등록 에러 : ", error.response));
};

const getReports = () =>{
  axios
  .get("/api/"+"/reports/")
  .then((response) => console.log("레포트확인"))
  .catch((error) => console.log("레포트확인 에러 ", error));
}

export default {
  courseInfo,
  courseRegister,
  courseDelete,
  registrationInfo,
  cancleRegCourse,
  regCourse,
  reportUpload,
  getReports,
};
