import React from "react";
import bad from "./Img/bad.png";
import good from "./Img/good.png";
import mid from "./Img/mid.png";
import exemp from "./Img/exemp.png";

// mui imports
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

const myStyles = {
  StudAnalysisTopicBar: {
    maxWidth: "600px",
    position: "relative",
  },
  img: { objectFit: "contain", width: "100%" },
  studTableTopicTopicWidth: {
    // "@media (min-width: 976px) and (max-width:1168px)": {
    //   width: "25%",
    // },
    // "@media (max-width:610px)": {
    //   width: "20%",
    // },
    // "@media (max-width:540px)": {
    //   width: "25%",
    // },
    // "@media (max-width:440px)": {
    //   width: "30%",
    // },
  },
  studTableTopicMarksWidth: {
    width: "14%",
    // "@media (min-width: 976px) and (max-width:1168px)": {
    //   width: "20%",
    // },
    // "@media (max-width:610px)": {
    //   width: "20%",
    // },
    // "@media (max-width:540px)": {
    //   width: "20%",
    // },
    // "@media (max-width:440px)": {
    //   width: "27%",
    // },
  },
  studTableTopicRemarkWidth: {
    width: "64%",
    // "@media (min-width: 976px) and (max-width:1168px)": {
    //   width: "55%",
    // },
    // "@media (max-width:610px)": {
    //   width: "50%",
    // },
    // "@media (max-width:540px)": {
    //   width: "40%",
    // },
    // "@media (max-width:440px)": {
    //   width: "46%",
    // },
  },
};

function StudentTopicTable({ data, i, userName }) {
  // function to download topic table as image
  const downloadTable = () => {
    var node = document.querySelector(`.table-${i}`);
    node.style.backgroundColor = "white";
    domtoimage.toBlob(node).then(function (blob) {
      saveAs(blob, `${userName}-topicReport-class.png`);
    });
  };

  const displayTopicWiseData = (percentage) => {
    if (percentage >= 80) {
      return <img src={exemp} alt="Exemplary" style={myStyles.img} />;
    } else if (percentage >= 70) {
      return <img src={good} alt="good" style={myStyles.img} />;
    } else if (percentage >= 60) {
      return <img src={bad} alt="Needs Foucs" style={myStyles.img} />;
    } else {
      return <img src={mid} alt="Mid Range" style={myStyles.img} />;
    }
  };

  return (
    <div style={myStyles.StudAnalysisTopicBar} className={`table-${i}`}>
      <h3 style={{ color: "whitesmoke" }}>
        {data.termType} {data.subject}
      </h3>
      <DownloadIcon
        onClick={downloadTable}
        color="primary"
        style={{
          position: "absolute",
          right: "15px",
          top: "15px",
          cursor: "pointer",
        }}
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Topic</TableCell>
              <TableCell align="left">Marks</TableCell>
              <TableCell align="right">Remark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((row, i) => (
              <TableRow key={i}>
                <TableCell
                  component="th"
                  scope="row"
                  style={myStyles.studTableTopicTopicWidth}
                >
                  {row.topic}
                </TableCell>
                <TableCell
                  align="left"
                  style={myStyles.studTableTopicMarksWidth}
                >
                  {row.Marks}
                </TableCell>
                <TableCell
                  align="right"
                  style={myStyles.studTableTopicRemarkWidth}
                >
                  {displayTopicWiseData(row.percentage)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StudentTopicTable;
