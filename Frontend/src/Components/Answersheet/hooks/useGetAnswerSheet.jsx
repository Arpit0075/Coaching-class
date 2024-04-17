import React, { useState } from "react";
import { BASE_URL } from "../../../utils/url";
import axios from "axios";

export const useGetAnswerPaper = () => {
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPaper = async ({ answerSheetId }) => {
    setLoading(true);
    try {
      let url = BASE_URL + `records/evaluateDPapersList/${answerSheetId}`;
      const res = await axios.get(url, {
        headers: { token: localStorage.getItem("token") },
      });
      if (res.data) {
        setPaper(res.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return { paper, loading, getPaper };
};
