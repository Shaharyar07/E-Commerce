import axios from "axios";
const BASE_URL = "http://localhost:5000/api/";
const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwZDEzNTFiZDI2NWEyNGRjOWU0MDRlIn0sImlhdCI6MTY0NTI1OTQzOX0.nyF4PcuWkHHH0bRKxTIRaOD6-65Nnhx5D-2N4ESyUh0";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    authToken: Token
  },
});
