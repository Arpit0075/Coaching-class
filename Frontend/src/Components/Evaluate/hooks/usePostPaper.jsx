import { BASE_URL } from "../../../utils/url";

export const usePostPaper = () => {
  const postPaper = async ({
    checked,
    totalQuestions,
    answerSheetId,
    overAllComment,
  }) => {
    try {
      let url = BASE_URL + `records/evaluatePapersList/${answerSheetId}`;
      let res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ checked, totalQuestions, overAllComment }),
      });
    } catch (err) {}
  };

  return { postPaper };
};
