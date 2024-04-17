import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

export const useGetAnswerSheet = () => {
  const [papersList, setPapersList] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAnswerSheet = async ({ studentId }) => {
    setLoading(true);
    try {
      let url = BASE_URL + `records/marksheets/${studentId}`;
      const res = await axios.get(url, {
        headers: { token: localStorage.getItem("token") },
      });
      if (res.data) {
        setPapersList(res.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const getStudentDetail = async ({ studentId }) => {
    try {
      let url = BASE_URL + `users/${studentId}`;
      const res = await axios.get(url, {
        headers: { token: localStorage.getItem("token") },
      });
      if (res.data) {
        setStudent(res.data);
      }
    } catch (err) {}
  };

  return { getAnswerSheet, papersList, loading, student, getStudentDetail };
};
