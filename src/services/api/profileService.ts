import { api } from "../../api/axiosInstance";


export const getProfile = async () => {
  const res = await api.get("/admin/profile");
  return res;
};