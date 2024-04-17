import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/url.js";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function Register() {
  let navigate = useNavigate();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = BASE_URL + "auth/register";
      const res = await axios.post(url, {
        name: register.name,
        email: register.email,
        password: register.password,
      });
      if (res.data.message) {
        setMessage(res.data.message);
        setTimeout(() => {
          setMessage("");
          navigate("/");
        }, 3000);
        setRegister({ ...register, name: "", email: "", password: "" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      maxWidth="1200px"
      sx={{ textAlign: "center", marginTop: "5rem" }}
    >
      <form className="form">
        <h2>Register</h2>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="enter your Name"
            variant="outlined"
            type="text"
            name="name"
            sx={{
              input: { color: "whitesmoke" },
              label: { color: "whitesmoke" },
              fieldset: { borderColor: "whitesmoke" },
            }}
            value={register.name}
            onChange={handleChange}
            autoComplete="off"
          />
          <TextField
            id="outlined-basic"
            label="enter your email"
            variant="outlined"
            type="email"
            name="email"
            sx={{
              input: { color: "whitesmoke" },
              label: { color: "whitesmoke" },
              fieldset: { borderColor: "whitesmoke" },
            }}
            value={register.email}
            onChange={handleChange}
            autoComplete="off"
          />
          <TextField
            id="outlined-basic"
            label="enter your password"
            variant="outlined"
            type="password"
            name="password"
            sx={{
              input: { color: "whitesmoke" },
              label: { color: "whitesmoke" },
              fieldset: { borderColor: "whitesmoke" },
            }}
            value={register.password}
            onChange={handleChange}
            autoComplete="off"
          />
          <Button variant="outlined" type="submit" onClick={handleSubmit}>
            Register
          </Button>
          <Link to="/">Login Page</Link>
        </Box>
      </form>
      {<span style={{ color: "wheat", fontSize: "1.2rem" }}>{message}</span>}
    </Container>
  );
}

export default Register;
