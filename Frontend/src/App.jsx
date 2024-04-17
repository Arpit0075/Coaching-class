import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Box, LinearProgress } from "@mui/material";

const Login = lazy(() => import("./Components/Login.jsx"));
const Register = lazy(() => import("./Components/Register.jsx"));
const Users = lazy(() => import("./Components/Users"));
const Reports = lazy(() => import("./Components/Reports/Reports.jsx"));
const Upload = lazy(() => import("./Components/Upload"));
const QuestionPapers = lazy(() => import("./Components/QuestionPapers"));
const Papers = lazy(() => import("./Components/Papers"));
const QuestionPaper = lazy(() =>
  import("./Components/QuestionPaper/QuestionPaper")
);
const EvaluatePapers = lazy(() => import("./Components/EvaluatePapers"));
const Evaluate = lazy(() => import("./Components/Evaluate/Evaluate"));
const StudentAnalysis = lazy(() =>
  import("./Components/StudentAnalysis/StudentAnalysis")
);
const StudentReports = lazy(() =>
  import("./Components/StudentReports/StudentReports")
);
const Answersheet = lazy(() => import("./Components/Answersheet/Answersheet"));
import PrivateRoute from "./utils/PrivateRoute.jsx";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Suspense
          fallback={
            <>
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            </>
          }
        >
          <Routes>
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <PrivateRoute>
                  <Reports />
                </PrivateRoute>
              }
            />
            <Route
              path="/reports/:studentId"
              element={
                <PrivateRoute>
                  <StudentReports />
                </PrivateRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <PrivateRoute>
                  <Upload />
                </PrivateRoute>
              }
            />
            <Route
              path="/questionPapers"
              element={
                <PrivateRoute>
                  <QuestionPapers />
                </PrivateRoute>
              }
            />
            <Route
              path="/papers"
              element={
                <PrivateRoute>
                  <Papers />
                </PrivateRoute>
              }
            />
            <Route
              path="/papers/:questionPaperId"
              element={
                <PrivateRoute>
                  <QuestionPaper />
                </PrivateRoute>
              }
            />
            <Route
              path="/evaluatePapers"
              element={
                <PrivateRoute>
                  <EvaluatePapers />
                </PrivateRoute>
              }
            />
            <Route
              path="/evaluatePapers/:answerSheetId"
              element={
                <PrivateRoute>
                  <Evaluate />
                </PrivateRoute>
              }
            />
            <Route
              path="/analysis/:studentId"
              element={
                <PrivateRoute>
                  <StudentAnalysis />
                </PrivateRoute>
              }
            />
            <Route
              path="/marksheets/:answerSheetId"
              element={
                <PrivateRoute>
                  <Answersheet />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
