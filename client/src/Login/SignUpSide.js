import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  ThemeProvider,
  Snackbar,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import defaulttheme from '../Template/theme.js';
import { signUp } from '../api.js';
import TTImage from '../assets/TT.jpg';
import DataContext from '../context/DataContext.js';

function SignUpSide() {
  const {alertMessage,
    alertSeverity,
    showAlert,setShowAlert,
    setAlertMessage,
    setAlertSeverity,}=useContext(DataContext);
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uname, setUname] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postObj = {
      uname,
      email,
      password,
    };

    try {
      let response = await signUp(postObj);
      if (response.data.status === "added") {
        setAlertMessage("Successfully Signed Up");
        setAlertSeverity("success");
        setShowAlert(true);
        navigate("/");
      } else if (response.data.status === "exists") {

        setAlertMessage("User Exist");
        setAlertSeverity("error");
        setShowAlert(true);
      } else{
        setAlertMessage(`${response?.data.status}`);
        setAlertSeverity("error");
        setShowAlert(true);
      }
    } catch (error) {
      console.log("loginerror",error);
      setAlertMessage(`${error?.response?.data.status}`);
      setAlertSeverity("error");
      setShowAlert(true);
    }
  };

  function handleToggleVisibility() {
    setHidePassword((prevVal) => !prevVal);
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
            color: 'white',
           
            padding: '10px',
            display: { xs: 'none', sm: 'none', lg: 'block' },
            borderRadius: '5px',
          }}
        >
          <Typography variant="h4">Core Learning, Endless Possibilities</Typography>
          <Typography variant="body1">We help you to remember things you have learnt</Typography>
          <Typography variant="body1">Create flash cards with us ⚡️!!</Typography>
        </Box>
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
           
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="uname"
                label="User Name"
                name="uname"
                autoFocus
                value={uname}
                onChange={(e) => setUname(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                color="secondary"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              {/* {errorMessage && (
              <Typography variant="body2" color="error">
                {errorMessage}
              </Typography>
            )} */}
              <Grid container>
                <Grid item>
                  <Link href="/" variant="body2" color="secondary">
                    Already have an account? Sign In
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

export default SignUpSide;
