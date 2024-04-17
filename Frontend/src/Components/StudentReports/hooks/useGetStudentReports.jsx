import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../utils/url";
import axios from "axios";
import { formatMarksheets } from "../../../utils/formatMarksheets";

export const useGetStudentsReports = () => {
  const [papersList, setPapersList] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unfilteredMarksheets, setUnfilteredMarksheets] = useState(null);

  const getAnswerSheet = async ({ studentId }) => {
    setLoading(true);
    try {
      let url = BASE_URL + `records/marksheets/${studentId}`;
      const res = await axios.get(url, {
        headers: { token: localStorage.getItem("token") },
      });
      if (res.data) {
        let arr1 = res.data;
        setUnfilteredMarksheets(res.data);
        let result = formatMarksheets(arr1);
        setPapersList(result);
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

  const filterMarksheets = (subject) => {
    if (subject === "All") {
      let result = formatMarksheets(unfilteredMarksheets);
      setPapersList(result);
    } else {
      let result = unfilteredMarksheets?.filter(
        (mark) => mark.subject === subject
      );
      result = formatMarksheets(result);
      setPapersList(result);
    }
  };

  return {
    getAnswerSheet,
    papersList,
    loading,
    student,
    getStudentDetail,
    filterMarksheets,
  };
};
