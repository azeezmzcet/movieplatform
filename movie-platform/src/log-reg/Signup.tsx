import Box from "@mui/material/Box";
import { Button, TextField, Typography,Snackbar,Alert } from "@mui/material";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid2';
 import axios from "axios";

// import { useDispatch } from 'react-redux';
// import { signupRequest } from '../redux/authSlices';


export const Signup: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [c_password, setC_password] = useState<string>("");

  const [open,setOpen] = useState<boolean>(false);
  // const [openError, setErrorOpen] = useState<boolean>(false);


  const navigate = useNavigate();
  //const dispatch=useDispatch();



  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    c_password: false,
  });

  const handleName =(e: React.ChangeEvent<HTMLInputElement>)=>{
    setName(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
    name: !e.target.value,
  }));
  };
  const handleEmail =(e: React.ChangeEvent<HTMLInputElement>)=>{

    setEmail(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
    
    email: !/\S+@\S+\.\S+/.test(e.target.value),

  }));
  };
  const handlePassword =(e: React.ChangeEvent<HTMLInputElement>)=>{
   
    setPassword(e.target.value);

    setErrors((prevErrors) => ({
      ...prevErrors,
  
    password: !e.target.value || e.target.value.length < 6

  }));
  };
  const handleCpassword =(e: React.ChangeEvent<HTMLInputElement>)=>{
   
    setC_password(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
    
   
    c_password: password !== e.target.value,
  }));
  };




  const handleRegister = async () => {

    const newErrors = {
      name: !name,
      email: !email,
      password: !password,
      c_password: password !== c_password,
    };

    setErrors(newErrors);

     if(!newErrors.name && !newErrors.email && !newErrors.password && !newErrors.c_password)
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register',{name, email, password, c_password});
      //console.log("success", response.data);
      localStorage.setItem("Token",response.data.tokenNmae);
       console.log("signup local");
      setOpen(true);
      setTimeout(()=>{
        navigate('/');
      },1500);
    } catch (error: unknown) {
      console.log("error failed", error);
     
    }
  };

  
  // const handleRegister = () => {
  //   const newErrors = {
  //     name: !name,
  //     email: !email,
  //     password: !password,
  //     c_password: password !== c_password,
  //   };
  
  //   setErrors(newErrors);
  //   if (!newErrors.name && !newErrors.email && !newErrors.password && !newErrors.c_password) {
  //     dispatch(signupRequest({ name, email, password, c_password }));
  //     setOpen(true);
  //     setTimeout(()=>{
  //       navigate('/');
  //     },1500);
  //   }
  // };


  



  const handleCloseSnackbar=()=>{
    setOpen(false);
   
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          width: { xs: "90%", sm: "70%", md: "40%" },
          padding: { xs: "20px", md: "40px" },
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "white",
        }}
      >
        <Grid size={{xs:12}}  textAlign="center">
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            color="black"
          >
            Sign Up
          </Typography>
        </Grid>

        <Grid size={{xs:12}}>
          <TextField
            fullWidth
            label="Name"
            type="text"
            variant="outlined"
            value={name}
            onChange={ handleName }
            required
            error={errors.name}
            helperText={errors.name ? "Name is required" : ""}
          />
        </Grid>

        <Grid size={{xs:12}}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={ handleEmail }
            required
            error={errors.email}
            helperText={errors.email ? "Email is required ,it should be in (name@_mail.com)" : ""}
          />
        </Grid>

        <Grid size={{xs:12}}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={ handlePassword }
            required
            error={errors.password}
            helperText={errors.password ?"Password must be at least 6 characters long" : ""}
          />
        </Grid>

        <Grid size={{xs:12}}>
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={c_password}
            onChange={ handleCpassword }
            required
            error={errors.c_password}
            helperText={errors.c_password ?"Passwords do not match" : ""}
          />
        </Grid>

        <Grid size={{xs:12}} textAlign="center">
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={handleRegister}
            sx={{ mb: 2 }}
          >
            Signup
          </Button>
        </Grid>

        <Grid size={{xs:12}} textAlign="center">
          <Typography color="black">
            Already have an account?{" "}
            <span
              style={{ color: "green", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </Typography>
        </Grid>
      </Grid>

      <Snackbar open={open}  onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar}  severity="success" >  Successfully logged in!</Alert>
      </Snackbar>
    </Box>
  );
};

export default Signup;
