import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/url";
import axios from "axios";
import { formatMarksheets } from "../../utils/formatMarksheets.js";

export const useGetAnswerSheets = () => {
  const [papersList, setPapersList] = useState(null);
  const [unfilteredMarksheets, setUnfilteredMarksheets] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAnswerSheets = async () => {
      setLoading(true);
      try {
        let url = BASE_URL + "records/marksheets";
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

    getAnswerSheets();
  }, []);

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

  return { papersList, loading, filterMarksheets };
};
