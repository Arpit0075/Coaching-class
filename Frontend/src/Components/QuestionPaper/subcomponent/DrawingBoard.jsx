import React, { useEffect, useState, useRef } from "react";
import { create } from "simple-drawing-board";
import { Button } from "@mui/material";

const myStyles = {
  drawingBoardBtn: {
    display: "flex",
    gap: "1rem",
  },
  questionBtn: {
    fontSize: "0.9rem",
  },
};

function DrawingBoard({ questionNumber, findAnswer }) {
  const canvaRef = useRef(null);
  const [drawingBoard, setDrawingBoard] = useState(null);

  useEffect(() => {
    if (findAnswer()) {
      let imgSrc = findAnswer();
      const context = canvaRef.current.getContext("2d");

      let canvas = document.getElementById(`drawing-${questionNumber}`);
      let width = canvas.width;
      let height = canvas.height;

      const image = new Image();
      image.src = imgSrc;
      image.onload = () => {
        context.drawImage(image, 0, 0, width, height);
      };
    }

    let drawingboard = create(canvaRef.current);
    drawingboard.setLineSize(1);
    drawingboard.setLineColor("whitesmoke");
    setDrawingBoard(drawingboard);
  }, []);

  return (
    <div
      style={{
        padding: "0.5rem",
        maxWidth: "650px",
        border: "1px solid white",
      }}
    >
      <canvas
        id={`drawing-${questionNumber}`}
        ref={canvaRef}
        style={{
          width: "100%",
          objectFit: "contain",
        }}
      />

      <div style={myStyles.drawingBoardBtn}>
        <Button
          style={myStyles.questionBtn}
          variant="contained"
          color="primary"
          onClick={() => drawingBoard.toggleMode()}
        >
          Toggle-Pen/Eraser
        </Button>
        <Button
          style={myStyles.questionBtn}
          variant="contained"
          color="primary"
          onClick={() => drawingBoard.clear()}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

export default DrawingBoard;
