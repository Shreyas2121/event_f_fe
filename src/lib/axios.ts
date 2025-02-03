import axios from "axios";
import { BACKEND_URL } from "./constants";

export const API = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
});
