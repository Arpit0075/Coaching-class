import { BASE_URL } from "../../../utils/url.js";

export const useSubmitAnswerPaper = () => {
  const submitPaper = async ({ paperId, answers, timeTaken }) => {
    try {
      let url = BASE_URL + `records/answers/${paperId}`;
      let res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ answers, timeTaken }),
      });
    } catch (err) {}
  };

  return { submitPaper };
};
