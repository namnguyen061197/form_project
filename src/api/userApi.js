import axiosClient from "./axiosClient";
const url = "";

const UserAPI = {
  getAllUser: () => {
    return axiosClient.get(url);
  },
  postUser: (data) => {
    return axiosClient.post(url, data)
  },
  deleteUser: (id) => {
    return axiosClient.delete(`${url}/${id}`)
  }
};
export default UserAPI;
