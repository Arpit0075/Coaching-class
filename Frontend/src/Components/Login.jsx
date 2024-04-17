import React, { useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Token } from "../Context/AuthContext.jsx";
import { BASE_URL } from "../utils/url.js";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function Login() {
  let navigate = useNavigate();
  const [login, setLogin] = useState({ email: "", password: "" });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  //login global state
  // eslint-disable-next-line
  const { auth, setAuth } = useContext(Token);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (auth?.status && auth?.user?.user?.type === "ADMIN" && token) {
      navigate("/users");
    }
    if (auth?.status && auth?.user?.user?.type === "STUDENT" && token) {
      navigate(`/reports/${auth.user.user._id}`);
    }
  }, [auth]);

  //login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = BASE_URL + "auth/login/";
      const res = await axios.post(url, {
        email: login.email,
        password: login.password,
      });

      if (res.data.message) {
        setMessage(res.data.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
        setLogin({ ...login, email: "", password: "" });
      }
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        let decoded = jwt_decode(res.data.token);
        setAuth({ status: true, user: decoded });
        if (decoded.user.type === "ADMIN") {
          navigate("/users");
        } else {
          navigate(`/reports/${decoded.user._id}`);
        }
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
      <h2>Login</h2>
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
          label="enter your email"
          variant="outlined"
          type="email"
          name="email"
          sx={{
            input: { color: "whitesmoke" },
            label: { color: "whitesmoke" },
            fieldset: { borderColor: "whitesmoke" },
          }}
          value={login.email}
          onChange={handleChange}
          autoComplete="off"
        />

        <TextField
          variant="outlined"
          label="enter your password"
          type="password"
          name="password"
          value={login.password}
          onChange={handleChange}
          sx={{
            input: { color: "whitesmoke" },
            label: { color: "whitesmoke" },
            fieldset: { borderColor: "whitesmoke" },
          }}
          autoComplete="off"
        />
        <Button variant="outlined" type="submit" onClick={handleSubmit}>
          Login
        </Button>
        <Link to="/register">Register Page</Link>
      </Box>

      {message}
    </Container>
  );
}

export default Login;
