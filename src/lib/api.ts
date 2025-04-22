import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all trends
export const fetchTrends = async () => {
  const res = await api.get("/trends");
  return res.data;
};

// Fetch single trend by topic
export const fetchTrend = async (topic: string) => {
  const res = await api.get(`/trends/${topic}`);
  return res.data;
};

// Create a new trend
export const createTrend = async (form: {
  topic: string;
  title: string;
  summary: string;
  url: string;
}) => {
  const res = await api.post("/trends", form);
  return res.data;
};
