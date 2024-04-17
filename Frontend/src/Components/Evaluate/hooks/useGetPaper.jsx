import React, { useState } from "react";
import { BASE_URL } from "../../../utils/url";
import axios from "axios";

export const useGetPaper = () => {
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPaper = async ({ answerSheetId }) => {
    setLoading(true);
    try {
      let url = BASE_URL + `records/evaluatePapersList/${answerSheetId}`;
      const res = await axios.get(url, {
        headers: { token: localStorage.getItem("token") },
      });
      if (res.data?.result) {
        setPaper(res.data.result);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return { paper, loading, getPaper };
};
