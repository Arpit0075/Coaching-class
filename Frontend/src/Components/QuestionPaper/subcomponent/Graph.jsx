import React from "react";
import Plot from "react-plotly.js";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const myStyles = {
  formControl: {
    minWidth: 100,
  },
  graphInputs: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    wrap: "wrap",
  },
  removeBtn: {
    fontSize: "0.7rem",
    width: "120px",
  },
  font: {
    fontSize: "1rem",
  },

  filterContainer: {},
};

const Graph = ({
  questionNumber,
  graphData,
  setGraphData,
  inputFields,
  setInputFields,
}) => {
  const handleAddInputField = () => {
    setInputFields([
      ...inputFields,
      {
        x: [],
        y: [],
        type: "line",
      },
    ]);
  };

  const handleRemoveInputField = (index) => {
    setInputFields(inputFields.filter((inputField, i) => i !== index));
    let copyInputFields = [...inputFields];
    copyInputFields = copyInputFields.filter((inputField, i) => i !== index);
    setGraphData([...copyInputFields]);
  };

  const handleGraphChange = (event, index, typeVal, inputField) => {
    if (event.target && event.target.value) {
      event.persist();
      switch (typeVal) {
        case "xVal":
          setInputFields((prev) => {
            const inputFieldsCopy = [...prev];
            inputFieldsCopy[index].x = event.target.value.split(",");
            return inputFieldsCopy;
          });
          break;
        case "yVal":
          setInputFields((prev) => {
            const inputFieldsCopy = [...prev];
            inputFieldsCopy[index].y = event.target.value.split(",");
            return inputFieldsCopy;
          });
          break;
        case "type":
          setInputFields((prev) => {
            const inputFieldsCopy = [...prev];
            inputFieldsCopy[index].type = event.target.value;
            return inputFieldsCopy;
          });
          break;
      }

      if (graphData[index]) {
        let arr = [...graphData];
        arr = graphData.filter((el, i) => {
          return i !== index;
        });
        setGraphData([...arr, inputField]);
      } else {
        setGraphData([...graphData, inputField]);
      }
    }
  };

  return (
    <div style={{ padding: "1rem", border: "1px solid white" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {inputFields &&
          inputFields.map((inputField, index) => (
            <div style={myStyles.graphInputs} key={index}>
              <TextField
                style={myStyles.font}
                sx={{
                  input: { color: "whitesmoke" },
                  label: { color: "whitesmoke" },
                  fieldset: { borderColor: "whitesmoke" },
                }}
                id="standard-basic"
                type="text"
                label="X Value"
                value={inputField.x}
                onChange={(event) =>
                  handleGraphChange(event, index, "xVal", inputField)
                }
              />
              <TextField
                sx={{
                  input: { color: "whitesmoke" },
                  label: { color: "whitesmoke" },
                  fieldset: { borderColor: "whitesmoke" },
                }}
                style={myStyles.font}
                id="standard-basic"
                type="text"
                label="Y Value"
                value={inputField.y}
                onChange={(event) =>
                  handleGraphChange(event, index, "yVal", inputField)
                }
              />
              <FormControl style={myStyles.formControl}>
                <InputLabel
                  style={myStyles.font}
                  htmlFor="Graph Type"
                  sx={{ color: "white" }}
                >
                  Graph Type
                </InputLabel>
                <Select
                  sx={{ color: "white" }}
                  onChange={(event) =>
                    handleGraphChange(event, index, "type", inputField)
                  }
                >
                  <MenuItem value="line" style={myStyles.font}>
                    Line
                  </MenuItem>
                  <MenuItem value="bar" style={myStyles.font}>
                    Bar
                  </MenuItem>
                  <MenuItem value="scatter" style={myStyles.font}>
                    Scatter
                  </MenuItem>
                </Select>
              </FormControl>
              <div style={{ marginTop: "1rem" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  style={myStyles.removeBtn}
                  startIcon={<CloseIcon />}
                  onClick={() => handleRemoveInputField(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        style={{ marginTop: "0.4rem" }}
        startIcon={<AddIcon />}
        onClick={handleAddInputField}
      >
        Add Data Field
      </Button>
      <div
        id={`graph-${questionNumber}`}
        style={{
          maxWidth: "400px",
          maxHeight: "600px",
        }}
      >
        <Plot
          data={graphData}
          style={{
            objectFit: "contain",
            minWidth: "200px",
            minHeight: "320px",
          }}
          useResizeHandler={true}
          autosize={true}
          layout={{
            title: "Graph",
          }}
        />
      </div>
    </div>
  );
};

export default Graph;
