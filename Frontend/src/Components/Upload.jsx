import React, { useState, useRef } from "react";
import { useGetClassDetails } from "./hooks/useGetClassDetails.jsx";
import { BASE_URL } from "../utils/url.js";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Upload() {
  let { classInformation } = useGetClassDetails();
  const [currentSubject, setCurrentSubject] = useState("");
  const [currentTerm, setCurrentTerm] = useState("");
  const [open, setOpen] = useState(false);
  const fileRef = useRef();
  const [uploading, setuploading] = useState(false);
  const [fileSelected, setFileSelected] = useState(null);
  const [sheetName, setSheetName] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  const getTerms = () => {
    let uploads = classInformation && classInformation[0]?.termsUploaded;

    let currentArr =
      uploads &&
      uploads.find(
        (el) => el.subject === currentSubject && el.uploaded === false
      );
    if (currentArr) return currentArr.term;
  };

  const onFileChange = (event) => {
    // capture file into state
    setFileSelected(event.target.files[0]);
  };

  const onFileUpload = async () => {
    setuploading(true);

    // sending file TO backend
    const data = new FormData();
    data.append("file", fileSelected);
    data.append("sheetName", sheetName);
    data.append("fileName", fileSelected.name);
    data.append("subject", currentSubject);
    data.append("term", currentTerm);

    let url = BASE_URL + "records/uploadQuestion/";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
      },
      body: data,
    });

    const response = await res.json();

    if (response.message) {
      setOpen(true);
      setUploadStatus(response.message);
      setTimeout(() => {
        setUploadStatus("");
      }, 1500);
    }

    // reset state/form
    setFileSelected(null);
    fileRef.current.value = "";
    setSheetName("");
    setuploading(false);
  };

  return (
    <Container
      maxWidth="1200px"
      sx={{ textAlign: "center", marginTop: "5rem" }}
    >
      <h1>Upload Question Papers</h1>
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
            onChange={(e) => setCurrentSubject(e.target.value)}
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
            onChange={(e) => setCurrentTerm(e.target.value)}
            label="Terms"
            sx={{
              color: "white",
            }}
          >
            {getTerms() && (
              <MenuItem value={getTerms()} key={getTerms()}>
                {getTerms()}
              </MenuItem>
            )}
          </Select>
        </FormControl>

        <input
          ref={fileRef}
          style={{ marginTop: "1.2rem" }}
          name="upload-file"
          type="file"
          accept=".xlsx"
          onChange={onFileChange}
        />
        <TextField
          id="standard-basic"
          label="Sheet Name"
          sx={{
            input: { color: "whitesmoke" },
            label: { color: "whitesmoke" },
            fieldset: { borderColor: "whitesmoke" },
          }}
          value={sheetName}
          name="sheetName"
          placeholder="Enter the Sheet Name"
          onChange={(e) => setSheetName(e.target.value)}
        />

        <Button
          style={{
            maxWidth: "150px",
            marginLeft: "0.6rem",
            background: "#03925e",
          }}
          className="myBtn"
          variant="contained"
          onClick={onFileUpload}
          disabled={currentSubject === "" || currentTerm === ""}
        >
          Upload!
        </Button>
        {uploading && <CircularProgress />}
        <Snackbar
          open={open}
          autoHideDuration={1500}
          onClose={() => setOpen(false)}
          message={uploadStatus}
        />
      </div>
    </Container>
  );
}

export default Upload;
