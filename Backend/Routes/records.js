const router = require("express").Router();
const questionController = require("../Controllers/question");

router.post("/uploadQuestion", questionController.upload);
router.get("/questionPapers", questionController.getQuestionPapers);
router.get(
  "/questionPapers/:questionPaperId",
  questionController.getQuestionPaper
);
router.post("/answers/:questionPaperId", questionController.submitAnswerPaper);
router.get("/evaluatePapersList", questionController.getEvaluatePapersList);
router.get(
  "/evaluatePapersList/:answerSheetId",
  questionController.getEvaluatePaper
);
router.post(
  "/evaluatePapersList/:answerSheetId",
  questionController.postEvaluatePaper
);
router.get(
  "/evaluateDPapersList/:answerSheetId",
  questionController.getEvaluateDPaper
);
router.get("/marksheets", questionController.getMarksheets);
router.get("/marksheets/:studentId", questionController.getMarksheetsStudent);

module.exports = router;
