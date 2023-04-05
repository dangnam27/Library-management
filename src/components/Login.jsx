import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Login.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAction } from "./redux/actions";
const theme = createTheme();
const Login = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://637edb84cfdbfd9a63b87c1c.mockapi.io/users")
      .then((res) => {
        setUsers([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const checkLoginUser = users.filter(
      (e) =>
        e.username === data.get("username") &&
        e.password === data.get("password") &&
        (e.role === "admin" || e.role === "library")
    );

    if (checkLoginUser.length > 0) {
      dispatch(getAction("FECTH_LOGIN_SUCCESS", checkLoginUser));
      navigate("/home/dashboard");
    } else {
      document.getElementById("showErrorLogin").innerHTML =
        "Username or password is incorrect!";
    }
  };
  return (
    <div className="container-fluid row login m-0">
      <div className="d-none d-lg-block col-lg-3 leftShadow ">
        <div className="loginLeft">
          <h1>Hi, Welcome Back</h1>
          <img
            src="https://minimal-kit-react.vercel.app/assets/illustrations/illustration_login.png"
            alt=""
            className="w-100"
          />
        </div>
      </div>
      <div className="col-12 col-lg-9">
        <div className="loginRight">
          {/* Login form */}
          <ThemeProvider theme={theme}>
            <Container
              component="main"
              maxWidth="xs"
              className=" py-5 rounded shadow ">
              <CssBaseline />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <Avatar sx={{ m: 1, bgcolor: "#ffa733" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    type="text"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                  />
                  <p
                    id="showErrorLogin"
                    className="text-danger fw-bold m-0"></p>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: "#ffa733" }}>
                    Sign In
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default Login;
