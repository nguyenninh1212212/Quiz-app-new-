import api from ".";

export const getFolder = async (page, size) => {
  const res = await api.get("/folder/all", { params: { page, size } });
  return res?.data?.data?.data;
};

export const createFolder = async (name) => {
  const res = await api.post("/folder/cre", null, {
    params: { name },
  });
  return res.data;
};

export const deleteFolder = async (id) => {
  const res = await api.delete(`/folder/${id}`);
  return res.data;
};

export const getFolderDetail = async (id) => {
  const res = await api.get(`/folder/${id}`);
  return res.data;
};

export const addToFolder = async (folderId, examId) => {
  const res = await api.post(`/folder/${folderId}/add`, null, {
    params: { examId },
  });
  return res.data;
};
