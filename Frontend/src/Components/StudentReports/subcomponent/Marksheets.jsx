import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FaceIcon from "@mui/icons-material/Face";
import Tooltip from "@mui/material/Tooltip";
import { IconButton, Typography } from "@mui/material";

const classes = {
  icon: { color: "whitesmoke", marginBottom: "0.2rem", marginRight: "0.2rem" },
  textColor: { color: "#000" },
  green: { color: "#00c02c" },
  red: { color: "#FD8A8A" },
  blue: { color: "#115975" },
  btn: {
    cursor: " pointer",
    borderRadius: "0.4rem",
    padding: "0.4rem",
  },
  link: {
    color: "#115975",
    fontSize: "1rem",
  },
};

function Row(props) {
  const { row } = props;
  const subjectSelected = props.subjectSelected;
  let currentSubject = props.currentSubject;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow key={`${row.studentId}`}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            sx={{ color: "whitesmoke" }}
            onClick={() => setOpen(!open)}
          >
            {subjectSelected &&
              currentSubject !== "All" &&
              (open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />)}
          </IconButton>
        </TableCell>
        <TableCell>
          <Link style={classes.link} to={`/analysis/${row.studentId}`}>
            <Tooltip title="See Analysis">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  maxWidth: "100px",
                }}
              >
                <FaceIcon style={classes.icon} />
                <span style={{ color: "whitesmoke" }}>{row.studentName}</span>
              </div>
            </Tooltip>
          </Link>
        </TableCell>
        <TableCell
          align="left"
          style={classes.textColor}
          sx={{ color: "white" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {row?.terms?.map((t, i) => {
              return (
                <span key={i} style={{ color: "whitesmoke" }}>
                  {t.termType}{" "}
                </span>
              );
            })}
          </div>
        </TableCell>
        <TableCell align="left" sx={{ color: "white" }}>
          {row?.terms?.map((t, j) => {
            return (
              <div style={{ display: "flex", gap: "0.5rem" }} key={`term-${j}`}>
                {t.subjects.map((s, i) => {
                  let totalMarks = s.totalMarks;
                  let marksObtained = s.totalMarksObtained;
                  let textColor = "white";
                  let percentage = (marksObtained / totalMarks) * 100;

                  if (percentage > 80) {
                    textColor = "green";
                  } else if (percentage > 65) {
                    textColor = "blue";
                  } else {
                    textColor = "red";
                  }
                  return (
                    <div key={`subject-${i}`}>
                      <span>
                        {s.subject}
                        {"-"}
                      </span>
                      <span style={{ color: textColor }}>
                        {s.totalMarksObtained}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </TableCell>
        <TableCell align="left" sx={{ color: "white" }}>
          {row?.terms?.map((t, j) => {
            return (
              <div style={{ display: "flex", gap: "0.5rem" }} key={`term-${j}`}>
                {t.subjects.map((s, i) => {
                  return (
                    <div key={`subject-${i}`}>
                      <Link
                        style={classes.link}
                        to={`/marksheets/${s.marksheetId}`}
                      >
                        <Tooltip title="View Marksheet">
                          <span style={{ color: "whitesmoke" }}>
                            {s.subject}
                          </span>
                        </Tooltip>
                      </Link>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </TableCell>
      </TableRow>
      {subjectSelected && (
        <TableRow
          style={classes.background}
          key={`subject-row-${row.studentId}`}
        >
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={6}
            sx={{ color: "white" }}
          >
            {/* creating tables based on the number of terms */}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {row.terms.map((t, i) => {
                return (
                  <Collapse
                    in={open}
                    timeout="auto"
                    unmountOnExit
                    key={`coll-${i}`}
                  >
                    <Box
                      margin={1}
                      style={{
                        border: "1px transparent white",
                        padding: "0.5rem",
                        borderRadius: "0.4rem",
                      }}
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        component="div"
                        style={{ marginLeft: "0.8rem", color: "white" }}
                      >
                        {t.termType}
                      </Typography>
                      <Table size="small" aria-label="purchases">
                        <TableHead>
                          <TableRow key="sub-topics-tableHead">
                            <TableCell align="left" sx={{ color: "white" }}>
                              Branch
                            </TableCell>
                            <TableCell align="right" sx={{ color: "white" }}>
                              Marks Obtained
                            </TableCell>
                            <TableCell align="right" sx={{ color: "white" }}>
                              Total Marks
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {t?.subjects
                            ?.filter((sub) => sub.subject === currentSubject)[0]
                            ?.subjectMarks?.map((s, i) => {
                              let marksObtained = s.marksObtained;
                              let totals = s.totalMarks;

                              let percentage = (marksObtained / totals) * 100;
                              // coloring based on marks obtained
                              let textColorTail = "white";
                              if (percentage > 80) {
                                textColorTail = "green";
                              } else if (percentage > 65) {
                                textColorTail = "blue";
                              } else {
                                textColorTail = "red";
                              }

                              return (
                                <TableRow key={i}>
                                  <TableCell
                                    align="left"
                                    style={{ color: textColorTail }}
                                  >
                                    {s.branch}
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    style={{ color: textColorTail }}
                                  >
                                    {s.marksObtained}
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    style={{ color: "whitesmoke" }}
                                  >
                                    {s.totalMarks}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                );
              })}
            </div>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}

function Marksheets({ displayMarkSheetsArr, subjectSelected, currentSubject }) {
  const rows = displayMarkSheetsArr;

  return (
    <div>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow key="row-header">
            <TableCell />
            <TableCell sx={{ color: "white" }}>Student Name</TableCell>
            <TableCell align="left" sx={{ color: "white" }}>
              Term
            </TableCell>
            <TableCell align="left" sx={{ color: "white" }}>
              Subject-Marks
            </TableCell>
            <TableCell align="left" sx={{ color: "white" }}>
              Marksheet Link
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row, i) => {
              return (
                <Row
                  key={i}
                  row={row}
                  subjectSelected={subjectSelected}
                  currentSubject={currentSubject}
                />
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}

export default Marksheets;
