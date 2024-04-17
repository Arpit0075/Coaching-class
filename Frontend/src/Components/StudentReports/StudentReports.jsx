import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { useGetStudentsReports } from "./hooks/useGetStudentReports.jsx";
import { useGetClassDetails } from "../hooks/useGetClassDetails.jsx";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LinearProgress from "@mui/material/LinearProgress";
import Marksheets from "./subcomponent/Marksheets.jsx";
import { useParams } from "react-router-dom";

function StudentReports() {
  let { studentId } = useParams();

  let {
    getAnswerSheet,
    papersList,
    loading,
    student,
    getStudentDetail,
    filterMarksheets,
  } = useGetStudentsReports();

  let { classInformation } = useGetClassDetails();
  const [currentSubject, setCurrentSubject] = useState("All");
  const [subjectSelected, setSubjectSelected] = useState(false);

  useEffect(() => {
    getStudentDetail({ studentId });
    getAnswerSheet({ studentId });
  }, []);

  return (
    <Container
      maxWidth="1200px"
      sx={{ textAlign: "center", marginTop: "5rem", paddingBottom: "1rem" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "0.2rem",
        }}
      >
        <h3>{`${student?.name}'s Report`} </h3>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          style={{ borderBottom: "1px solid white" }}
        >
          <InputLabel
            id="demo-simple-select-standard-label"
            sx={{ color: "white" }}
          >
            Subjects
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={currentSubject}
            onChange={(e) => {
              setCurrentSubject(e.target.value);
              setSubjectSelected(true);
              filterMarksheets(e.target.value);
            }}
            label="Subjects"
            sx={{
              color: "white",
            }}
          >
            <MenuItem value={"All"}>All</MenuItem>
            {classInformation?.[0].subjects?.map((subject) => {
              return (
                <MenuItem value={subject} key={subject}>
                  {subject}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      {loading && <LinearProgress />}
      {!loading && (
        <>
          <Marksheets
            displayMarkSheetsArr={papersList}
            subjectSelected={subjectSelected}
            currentSubject={currentSubject}
          />
        </>
      )}
    </Container>
  );
}

export default StudentReports;
