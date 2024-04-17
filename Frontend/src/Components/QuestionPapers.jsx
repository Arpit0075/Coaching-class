// list of question papers uploaded by admin
import { useGetQuestionPapers } from "./hooks/useGetQuestionPapers.jsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { LinearProgress } from "@mui/material";

function QuestionPapers() {
  let { questionPapers, loading } = useGetQuestionPapers();

  return (
    <Container
      maxWidth="1200px"
      sx={{ textAlign: "center", marginTop: "5rem" }}
    >
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
                  Subject
                </TableCell>
                <TableCell align="center" sx={{ color: "whitesmoke" }}>
                  Term
                </TableCell>
                <TableCell align="center" sx={{ color: "whitesmoke" }}>
                  Duration
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questionPapers &&
                questionPapers.map((row) => (
                  <TableRow
                    key={`${row.term}-${row.subject}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
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
                      {row.duration}
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

export default QuestionPapers;
