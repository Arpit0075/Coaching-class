import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

export const useEvaluatePapersList = () => {
  const [papersList, setPapersList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getEvaluationList = async () => {
      setLoading(true);
      try {
        let url = BASE_URL + "records/evaluatePapersList";
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

    getEvaluationList();
  }, []);

  return { papersList, loading };
};
