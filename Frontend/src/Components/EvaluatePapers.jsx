import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import { useEvaluatePapersList } from "./hooks/useEvaluatePapersList.jsx";
import { useGetClassDetails } from "./hooks/useGetClassDetails.jsx";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";

function EvaluatePapers() {
  let { papersList, loading } = useEvaluatePapersList();
  let { classInformation } = useGetClassDetails();

  const [currentSubject, setCurrentSubject] = useState("");
  const [currentTerm, setCurrentTerm] = useState("");
  const [papaersListComp, setPapersListComp] = useState(null);

  useEffect(() => {
    if (papersList && papersList.length > 0) {
      setPapersListComp(papersList);
    }
  }, [papersList]);

  const Styles = {
    link: {
      border: "1px solid wheat",
      background: "#03925e",
      padding: "0.2rem",
      borderRadius: "0.4rem",
      textDecoration: "none",
      color: "whitesmoke",
    },
  };

  return (
    <Container
      maxWidth="1200px"
      sx={{ textAlign: "center", marginTop: "5rem" }}
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
              let list = papersList.filter(
                (p) => p.term === currentTerm && p.subject === e.target.value
              );
              setPapersListComp(list);
            }}
            label="Subjects"
            sx={{
              color: "white",
            }}
          >
            {classInformation?.[0].subjects?.map((subject) => {
              return (
                <MenuItem value={subject} key={subject}>
                  {subject}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          style={{ borderBottom: "1px solid white" }}
        >
          <InputLabel
            id="demo-simple-select-standard-label"
            sx={{ color: "white" }}
          >
            Terms
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={currentTerm}
            onChange={(e) => {
              setCurrentTerm(e.target.value);
              let list = papersList.filter(
                (p) => p.term === e.target.value && p.subject === currentSubject
              );
              setPapersListComp(list);
            }}
            label="Terms"
            sx={{
              color: "white",
            }}
          >
            {classInformation?.[0].terms?.map((term) => {
              return (
                <MenuItem value={term} key={term}>
                  {term}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      {loading && <LinearProgress />}
      {!loading && (
        <TableContainer
          component={Paper}
          sx={{ background: "#343434", maxWidth: "600px", margin: "auto" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ color: "whitesmoke" }}>
                  Student Name
                </TableCell>
                <TableCell align="center" sx={{ color: "whitesmoke" }}>
                  Subject
                </TableCell>
                <TableCell align="center" sx={{ color: "whitesmoke" }}>
                  Term
                </TableCell>
                <TableCell align="center" sx={{ color: "whitesmoke" }}>
                  Evaluate Paper Link
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {papaersListComp &&
                papaersListComp.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ color: "whitesmoke" }}
                    >
                      {row.studentName}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ color: "whitesmoke" }}
                    >
                      {row.subject}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ color: "whitesmoke" }}
                    >
                      {row.term}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ color: "whitesmoke" }}
                    >
                      {row.checkedBy ? (
                        "Answer Sheet Evaluated"
                      ) : (
                        <Link
                          to={`/evaluatePapers/${row._id}`}
                          style={Styles.link}
                        >
                          Evaluate Papers
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default EvaluatePapers;
