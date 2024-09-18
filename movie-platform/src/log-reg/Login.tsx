import { useState } from "react";
import { authLogin } from "./Authentication";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography ,Snackbar,Alert } from "@mui/material";
import Grid from '@mui/material/Grid2';





export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [open,setOpen] = useState<boolean>(false);
  const [openError,setErrorOpen] = useState<boolean>(false);

  const [emailedit,setEmailedit] =useState<string>('');
  const [passwordedit,setPasswordedit] =useState<string>('');

  const navigate = useNavigate();





  const validateEmail=(email:string)=>{
    if(!email){
      setEmailedit('email is required');
    }else if (!/\S+@\S+\.\S+/.test(email)){
      setEmailedit('Write Correct Email formate');
    }else{
      setEmailedit('');
    }
  };


  const validatePassword=(password :string)=>{
    if(!password){
      setPasswordedit('email is required');
    }
    else if (password.length <6) {
      setPasswordedit("Password must be at least 6 characters");
    }else{
      setPasswordedit('');
    
    }   

  }


  const handleLogin = async () => {

      validateEmail(email);
      validatePassword(password);
    
      if(!emailedit && !passwordedit)
    try {
      const response = await authLogin(email, password);
      // console.log("success", response.data);
      localStorage.setItem("Token", response.data.tokenNmae);
      // console.log("login local");
      
      setOpen(true);
      setTimeout(()=>{
        navigate('/');
      },3000);
     
    } catch (error: unknown) {
      console.log("error failed", error);
      setErrorOpen(true);
    }
  };

  const handleHome = () => {
    navigate("/");
  };


  const handleCloseSnackbar=()=>{
    setOpen(false);
    setErrorOpen(false);
    
  }
  





  // const [errors, setErrors] = useState({
  //   email: false,
  //   password:false,
  // });

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
          backgroundColor: "#fff",
        }}
      >
        <Grid size={{xs:12}}   textAlign="center">
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            color="black"
          >
            Login
          </Typography>
        </Grid>

        <Grid size={{xs:12}} >
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => {setEmail(e.target.value);  validateEmail(e.target.value)}}
            required
            error={!!emailedit}
            helperText={emailedit}
          />
        </Grid>

        <Grid size={{xs:12}} >
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) =>{setPassword(e.target.value); validatePassword(e.target.value)}}
            required
            error={!!passwordedit}
            helperText={passwordedit}
          />
        </Grid>




        <Grid size={{xs:12}}  textAlign="center">
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={handleLogin}
            sx={{ mb: 2 }}
          >
            Login
          </Button>




          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleHome}
          >
            Home
          </Button>
        </Grid>

        <Grid size={{xs:12}}  textAlign="center">
          <Typography style={{ color: "black" }}>
            Not a Member?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Signup
            </span>
          </Typography>
        </Grid>
      </Grid>



      <Snackbar    open={open}  onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}  autoHideDuration={3000}  >
        <Alert onClose={handleCloseSnackbar}  severity="success"    >  Successfully sign in!</Alert>
      </Snackbar>
      <Snackbar open={openError}  onClose={handleCloseSnackbar}  anchorOrigin={{ vertical: "top", horizontal: "center"}} autoHideDuration={3000}>
        <Alert onClose={handleCloseSnackbar}  severity="error" >  oops something went wrong</Alert>
      </Snackbar>
    </Box>
  );
};
export default Login;
