import axios from "axios";
export const API_SERVER_HOST = "http://localhost:8088";

const host = `${API_SERVER_HOST}/api/products`;

export const postAdd = async (product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  try {
    const res = await axios.post(`${host}/`, product, header);
    return res.data;
  } catch (error) {
    console.error("Error posting product:", error);
    throw error;
  }
};

// 목록 가져오기
export const getList = async (pageParam) => {
  //pageParam은 page, size를 가지고 있음
  const { page, size } = pageParam;
  const res = await axios.get(`${host}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

// 상세보기
export const getOne = async (pno) => {
  const res = await axios.get(`${host}/${pno}`);

  return res.data;
};

// 수정
export const putOne = async (pno, product) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await axios.put(`${host}/${pno}`, product, header);

  return res.data;
};

// 삭제
export const deleteOne = async (pno) => {
  const res = await axios.delete(`${host}/${pno}`);

  return res.data;
};
