import React, { useEffect, useState } from "react";
import { useGetAnswerSheet } from "../hooks/useGetAnswerSheet";
import { useParams } from "react-router-dom";
import {
  Container,
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
} from "@mui/material";
import { getStudentGraphs } from "../../utils/getStudentGraphs";
import StudentTopicTable from "./subcomponent/StudentTopicTable";
import StudentSubBarChart from "./subcomponent/StudentSubBarChart";

const myStyles = {
  graphs: {
    padding: "1rem 0 3rem 0",
  },
  formControl: {
    minWidth: 100,
    marginRight: "1rem",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
};

function StudentAnalysis() {
  let { papersList, loading, getAnswerSheet, student, getStudentDetail } =
    useGetAnswerSheet();
  let { studentId } = useParams();

  const [currentSelection, setCurrentSelection] = useState("subjectWise");
  const [display, setDisplay] = useState({
    subjectWiseDisplay: true,
    topicWiseDisplay: false,
  });

  const [studentSubjectDataB, setStudentSubjectDataB] = useState(null);
  const [studentTopicTable, setStudentTopicTable] = useState(null);

  //   let studentSubjectDataB = null;
  //   let studentTopicTable = null;

  useEffect(() => {
    getAnswerSheet({ studentId });
    getStudentDetail({ studentId });
  }, []);

  useEffect(() => {
    if (papersList && papersList.length > 0) {
      let { studentSubjectData, studentTopicTables } =
        getStudentGraphs(papersList);
      setStudentSubjectDataB(studentSubjectData);
      setStudentTopicTable(studentTopicTables);
    }
  }, [papersList]);

  // Selection
  const handleSelectionChange = (e) => {
    setCurrentSelection(e.target.value);
    if (e.target.value === "subjectWise") {
      setDisplay({ subjectWiseDisplay: true, topicWiseDisplay: false });
    } else if (e.target.value === "topicWise") {
      setDisplay({ topicWiseDisplay: true, subjectWiseDisplay: false });
    }
  };

  return (
    <Container
      maxWidth="1200px"
      sx={{ textAlign: "center", marginTop: "5rem", paddingBottom: "1rem" }}
    >
      {student && (
        <h1
          style={{
            color: "whitesmoke",
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          {student.name}'s Analysis
        </h1>
      )}
      {/* selection option for student */}
      {studentSubjectDataB && studentTopicTable && (
        <FormControl style={{ borderBottom: "1px solid white" }}>
          <InputLabel htmlFor="age-native-simple" sx={{ color: "white" }}>
            Selection
          </InputLabel>
          <Select
            sx={{
              color: "white",
            }}
            value={currentSelection}
            onChange={handleSelectionChange}
          >
            <MenuItem value="subjectWise">Subject Wise</MenuItem>
            <MenuItem value="topicWise">Topic Wise</MenuItem>
          </Select>
        </FormControl>
      )}
      {loading && <LinearProgress />}
      {!studentSubjectDataB && !studentTopicTable && (
        <Typography variant="h5" style={{ marginTop: "1rem" }}>
          No term is uploaded for this class
        </Typography>
      )}
      {studentSubjectDataB && (
        <div style={myStyles.container}>
          {display.subjectWiseDisplay &&
            student &&
            studentSubjectDataB?.map((data, i) => {
              return (
                <StudentSubBarChart
                  data={data}
                  key={i}
                  i={i}
                  userName={student.name}
                />
              );
            })}
        </div>
      )}
      {studentTopicTable && display.topicWiseDisplay && student && (
        <div style={myStyles.container}>
          {studentTopicTable &&
            student &&
            studentTopicTable.map((data, i) => {
              return (
                <div style={{ maxWidth: "500px" }}>
                  <StudentTopicTable
                    data={data}
                    key={i}
                    i={i}
                    userName={student.name}
                  />
                </div>
              );
            })}
        </div>
      )}
    </Container>
  );
}

export default StudentAnalysis;
