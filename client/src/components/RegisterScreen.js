import { useContext } from "react";
import AuthContext from "../auth";
import Copyright from "./Copyright";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { GlobalStoreContext } from "../store";
import React, { useRef, Component } from "react";

export default function RegisterScreen() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [errFirst, setErrFirst] = React.useState(false);
  const [errLast, setErrLast] = React.useState(false);
  const [errEmail, setErrEmail] = React.useState(false);
  const [errUser, setErrUser] = React.useState(false);
  const [errPass, setErrPass] = React.useState(false);
  const [errVerify, setErrVerify] = React.useState(false);

  const [errFirstMessage, setErrFirstMessage] = React.useState(null);
  const [errLastMessage, setErrLastMessage] = React.useState(null);
  const [errEmailMessage, setErrEmailMessage] = React.useState(null);
  const [errUserMessage, setErrUserMessage] = React.useState(null);
  const [errPassMessage, setErrPassMessage] = React.useState(null);
  const [errVerifyMessage, setErrVerifyMessage] = React.useState(null);

  const clearErr = () => {
    setErrFirst(false);
    setErrLast(false);
    setErrUser(false);
    setErrEmail(false);
    setErrPass(false);
    setErrVerify(false);
    setErrFirstMessage(false);
    setErrLastMessage(false);
    setErrUserMessage(false);
    setErrEmailMessage(false);
    setErrPassMessage(false);
    setErrVerifyMessage(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let localCheck = false;
    if (formData.get("firstName") === "") {
      console.log("emptyfirstname");
      setErrFirst(true);
      setErrFirstMessage("Please enter a first name");
      localCheck = true;
    }
    if (formData.get("lastName") === "") {
      console.log("emptyLastName");
      setErrLastMessage("Please enter a last name");
      setErrLast(true);
      localCheck = true;
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        formData.get("email")
      )
    ) {
      console.log("invalid Email");
      setErrEmailMessage("Email is invalid");
      setErrEmail(true);
      localCheck = true;
    }

    if (formData.get("email") === "") {
      console.log("emptyEmail");
      setErrEmailMessage("Email is required");
      setErrEmail(true);
      localCheck = true;
    }

    if (formData.get("password").length < 8) {
      console.log("passInsufficientLength");
      setErrPassMessage("Password must be 8 characters or longer");
      setErrVerifyMessage("Password must be 8 characters or longer");
      localCheck = true;
      setErrPass(true);
      setErrVerify(true);
    }

    if (formData.get("password") !== formData.get("passwordVerify")) {
      console.log("passNotEqual");
      setErrVerifyMessage("Passwords must match");
      setErrPass(true);
      setErrVerify(true);
      localCheck = true;
    }
    if (localCheck === true) {
      return;
    }
    auth
      .registerUser(
        {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          password: formData.get("password"),
          passwordVerify: formData.get("passwordVerify"),
        },
        store
      )
      .catch((err) => {
        console.log(err.response?.data?.errorMessage);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={errFirst}
                onChange={clearErr}
                helperText={errFirstMessage}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                error={errLast}
                onChange={clearErr}
                helperText={errLastMessage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={errEmail}
                onChange={clearErr}
                helperText={errEmailMessage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={errPass}
                onChange={clearErr}
                helperText={errPassMessage}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordVerify"
                label="Verify Password"
                type="password"
                id="passwordVerify"
                autoComplete="new-password"
                error={errVerify}
                onChange={clearErr}
                helperText={errVerifyMessage}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
