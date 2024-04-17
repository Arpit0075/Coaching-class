import React, { useState, useEffect } from "react";
import { Typography, Container } from "@mui/material";
import { useGetAnswerSheets } from "../hooks/useGetAnswerSheets";
import { useGetClassDetails } from "../hooks/useGetClassDetails.jsx";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import LinearProgress from "@mui/material/LinearProgress";
import Marksheets from "./subcomponents/Marksheets";

function Reports() {
  let { papersList, loading, filterMarksheets } = useGetAnswerSheets();
  let { classInformation } = useGetClassDetails();
  const [currentSubject, setCurrentSubject] = useState("All");
  const [subjectSelected, setSubjectSelected] = useState(false);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [marksheetsPerPage] = useState(5); //displaying five marksheets per page

  // pagination ot get current marksheets
  const indexOfLast = currentPage * marksheetsPerPage;
  const indexOfFirst = indexOfLast - marksheetsPerPage;
  let displayMarkSheetsArr =
    papersList && papersList.slice(indexOfFirst, indexOfLast);
  let totalPages = Math.ceil(
    papersList && papersList.length / marksheetsPerPage
  );

  return (
    <Container
      maxWidth="1200px"
      sx={{ textAlign: "center", marginTop: "5rem", paddingBottom: "1rem" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.1rem",
        }}
      >
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
            displayMarkSheetsArr={displayMarkSheetsArr}
            subjectSelected={subjectSelected}
            currentSubject={currentSubject}
          />
        </>
      )}
      <div style={{ display: "flex", alignItems: "center", margin: "2rem" }}>
        <Typography sx={{ color: "white" }}>Page: {currentPage}</Typography>
        <Pagination
          sx={{ color: "black", background: "white", borderRadius: "0.4rem" }}
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => {
            setCurrentPage(value);
          }}
        />
      </div>
    </Container>
  );
}

export default Reports;
