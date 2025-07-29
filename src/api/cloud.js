import axios from "axios";
import axioos from "./axios";

export const saveFileRequest = (data) => axios.post("https://api.cloudinary.com/v1_1/dotk67bus/image/upload", data);

export const deleteFileRequest = (data) => axios.post("https://api.cloudinary.com/v1_1/dotk67bus/image/destroy", data);

export const signatureRequest = (data) => axioos.post("/generate-signature", data);