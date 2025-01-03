import React, { useContext, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { Alert, Avatar, Box, Button, CssBaseline, Grid, IconButton, InputAdornment, Paper, Snackbar, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import defaulttheme from "../Template/theme.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { resetPwd } from "../api.js"; // Updated function name to match usage
import TTImage from '../assets/TT.jpg';
import DataContext from "../context/DataContext.js";

function ResetSide() {
  const navigate = useNavigate();
  const {
    showAlert,
    userName,
    alertMessage,
    alertSeverity,
    setShowAlert,
    setAlertMessage,
    setAlertSeverity,}=useContext(DataContext);
  // const [errorMessage, setErrorMessage] = useState("")
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true); // State for confirming password
  const [confirmPassword, setConfirmPassword] = useState(""); // State variable for confirm password

  console.log("Before update=", userName);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    if (password !== confirmPassword) {
        setAlertMessage("Password and confirm password should be same");
        setAlertSeverity("error");
        setShowAlert(true);
      
      return;
    }

    let Obj = {
      email: data.get('email'),
      password: password,
    }

    try {
      let response = await resetPwd(Obj);
      // console.log(response.user)
      if (response.data.status === "PasswordResetSuccess") {
        setAlertMessage("Password Reset Success");
        setAlertSeverity("success");
        setShowAlert(true);
        navigate("/");
      } else if (response.data.status === "notexists") {
        setAlertMessage("User Not Exists");
        setAlertSeverity("error");
        setShowAlert(true);
      } 
    } catch (error) {
      //console.log("loginerror",error);
      setAlertMessage(`${error?.response?.data.status}`);
      setAlertSeverity("error");
      setShowAlert(true);
    }
  };

  function handleToggleVisibility() {
    setHidePassword((prevVal) => !prevVal);
  }

  function handleToggleConfirmVisibility() {
    setHideConfirmPassword((prevVal) => !prevVal);
  }

  return (
    <ThemeProvider theme={defaulttheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${TTImage})`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '20%',
            transform: 'translate(-50%, -50%)',
            color: 'white', // Adjust text color as needed
            padding: '10px',
            display: { xs: 'none', sm: 'none', lg: 'block' }, // Hide on small screens
            borderRadius: '5px'
          }}
        >
          <Typography variant="h4">Core Learning, Endless Possibilities</Typography>
          <Typography variant="body1">We help you to remember things you have learnt</Typography>
          <Typography variant="body1">Create flash cards with us ⚡️!!</Typography>
        </Box>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type={hidePassword ? 'password' : 'text'}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleVisibility} edge="end">
                        {hidePassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={hideConfirmPassword ? 'password' : 'text'}
                id="confirmPassword"
                autoComplete="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleConfirmVisibility} edge="end">
                        {hideConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
                <Snackbar
        open={showAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setShowAlert(false)}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
              <Button
                type="submit"
                fullWidth
                color="secondary"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
              {/* {errorMessage && (
                <Typography variant="body2" color="error">
                  {errorMessage}
                </Typography>
              )} */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default ResetSide;
