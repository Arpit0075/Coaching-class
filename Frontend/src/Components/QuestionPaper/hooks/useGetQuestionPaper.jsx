import { useState } from "react";
import { BASE_URL } from "../../../utils/url.js";
import axios from "axios";

export const useGetQuestionPaper = () => {
  const [questionPaper, setQuestionPaper] = useState(null);
  const [loading, setLoading] = useState(false);

  const getQuestionPaper = async (id) => {
    try {
      setLoading(true);
      let url = BASE_URL + `records/questionPapers/${id}`;
      const res = await axios.get(url, {
        headers: { token: localStorage.getItem("token") },
      });
      if (res.data) {
        setLoading(false);
        setQuestionPaper(res.data);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return { getQuestionPaper, questionPaper };
};
