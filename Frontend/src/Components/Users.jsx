import React, { useContext } from "react";
import { Token } from "../Context/AuthContext.jsx";
import { useGetUsers } from "./hooks/useGetUsers.jsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

function Users() {
  const { auth, setAuth } = useContext(Token);
  let { users } = useGetUsers();

  if (auth?.user?.user?.type === "ADMIN") {
    return (
      <Container
        maxWidth="1200px"
        sx={{ textAlign: "center", marginTop: "5rem" }}
      >
        <TableContainer
          component={Paper}
          sx={{ background: "#343434", maxWidth: "600px", margin: "auto" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ color: "whitesmoke" }}>
                  Name
                </TableCell>
                <TableCell align="center" sx={{ color: "whitesmoke" }}>
                  Email
                </TableCell>
                <TableCell align="center" sx={{ color: "whitesmoke" }}>
                  Marksheets
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users?.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ color: "whitesmoke" }}
                    >
                      {row.name}
                    </TableCell>

                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ color: "whitesmoke" }}
                    >
                      {row.email}
                    </TableCell>
                    {row.type !== "ADMIN" && (
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ color: "whitesmoke" }}
                      >
                        <Link to={`/reports/${row._id}`}>AnswerSheet</Link>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
}

export default Users;
