import axios from "./axios";

export const getUserDataRequest = (id) => axios.get(`/user`);

export const createUserDataRequest = (data) => axios.post('/user', data);

export const updateUserDataRequest = (id, data) => axios.put(`/user/${id}`, data);

export const deletePhotoRequest = (id,data) => axios.put(`user/delete_photo/${id}`, data);
