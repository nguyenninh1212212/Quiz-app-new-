import api from "./index";

export const getHome = async () => {
  const res = await api.get("/exams/home");
  return res.data;
};
export const getAllExams = async (page, size) => {
  const res = await api.get("/exams", {
    params: { page, size },
  });
  return res.data.data.data;
};

export const getDetailExam = async (id) => {
  const res = await api.get(`/exams/${id}`);
  return res.data;
};
export const getEleExam = async () => {
  const res = await api.get(`/exams/ele`);
  return res.data;
};

export const createExam = async (formData) => {
  const res = await api.post("/exams/cre", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
