import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

export const useGetQuestionPapers = () => {
  const [questionPapers, setQuestionPapers] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getQuestionPapers = async () => {
      try {
        let url = BASE_URL + "records/questionPapers";
        const res = await axios.get(url, {
          headers: { token: localStorage.getItem("token") },
        });
        if (res.data && res.data.length > 0) {
          setQuestionPapers(res.data);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    };

    getQuestionPapers();
  }, []);

  return { questionPapers, loading };
};
