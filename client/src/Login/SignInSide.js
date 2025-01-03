import React, { useContext, useState } from "react";
//import { createTheme, ThemeProvider } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { Alert, Avatar, Box, Button, CssBaseline, Grid, IconButton, InputAdornment, Link, Paper, Snackbar, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import defaulttheme from "../Template/theme.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import { signIn } from "../api.js";
import TTImage from '../assets/TT.jpg';
import DataContext from "../context/DataContext.js";
import axios from "axios";

function SignInSide() {
  const navigate = useNavigate();
  const {
    setUserName,
    setUserEmail,
    setUserId,
    userEmail,
    userName,
    cardNo,
    setCardNo,
    deckNo,
    setDeckNo,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    password,
    setPassword,
    alertMessage,
    alertSeverity,
    showAlert,
    setShowAlert,
    setAlertMessage,
    setAlertSeverity
  } = useContext(DataContext);
  const [hidePassword, setHidePassword] = useState(true);
  //const [errorMessage, setErrorMessage] = useState("")
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    if(userEmail==="")
    {
      setEmailError(true);
    }
    if(password==="")
    {
      setPasswordError(true);
    }
    if(userEmail!=="" && password!=="")
    {
    try {
      const credentials={
        email:userEmail,
        password
      }
      const response = await axios.post('http://localhost:3000/', credentials);
//console.log(response);
      if (response?.data?.status === "exists") {
        setUserName(response.data.user.uname);
        setUserEmail(response.data.user.email);
        setCardNo(response.data.user.cardNo);
        setDeckNo(response.data.user.deckNo);
        const userId = response.data.user._id;
        setUserId(userId);
  
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('userName', userName);
        sessionStorage.setItem('cardNo', cardNo);
        sessionStorage.setItem('deckNo', deckNo);
        setAlertMessage("Successfully logged In");
        setAlertSeverity("success");
        setShowAlert(true);
        setUserEmail("");
        setPassword("");
        setTimeout(()=>{
          navigate("/home");   
        },2000);
       
      } 
      else{
        setAlertMessage(`${response?.data?.status}`);
        setAlertSeverity("error");
        setShowAlert(true);
      }
    } catch (error) {
      console.log("loginerror",error);
      setAlertMessage(`${error?.response?.data?.status}`);
      setAlertSeverity("error");
      setShowAlert(true);
    }
  }
  };
  
  
  function handleToggleVisibility() {
    setHidePassword((preVal) => !preVal);
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
          <Typography variant="h4">Core Learning,Endless Possibilities</Typography>
          <Typography variant="body1">We help you to remember things you have learnt</Typography>
          <Typography variant="body1">Create flash cards with us ⚡️!!</Typography>
        </Box>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              Sign in
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
                error={emailError}
                value={userEmail}
                onChange={(e)=>setUserEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
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
                error={passwordError}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
             
              <Button
                type="submit"
                fullWidth
                color="secondary"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {/* {errorMessage && (
                <Typography variant="body2" color="error">
                  {errorMessage}
                </Typography>
              )} */}
              <Grid container>
                <Grid item xs>
                  <Link href="/reset" variant="body2" color="secondary">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2" color="secondary">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
             
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default SignInSide;


