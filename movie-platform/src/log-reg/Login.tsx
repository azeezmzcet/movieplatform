import { useState } from "react";
import { authLogin } from "./Authentication";
import { useNavigate } from "react-router-dom";
import { Box,Grid, Button, TextField, Typography ,Snackbar,Alert } from "@mui/material";




export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [open,setOpen] = useState<boolean>(false);
  const [openError,setErrorOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async () => {

    const newErrors = {
      email: !email,
      password: !password,
    };
    setErrors(newErrors);

    
    try {
      const response = await authLogin(email, password);
      // console.log("success", response.data);
      localStorage.setItem("Token", response.data.tokenNmae);
      // console.log("login local");
      
      setOpen(true);
      setTimeout(()=>{
        navigate('/');
      },1500);
     
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





  const [errors, setErrors] = useState({
    email: false,
    password:false,
  });

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
        <Grid item xs={12} textAlign="center">
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            color="black"
          >
            Login
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={errors.email}
            helperText={errors.email ? "EMAIL is required" : ""}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={errors.password}
            helperText={errors.password ? "password is required" : ""}
          />
        </Grid>




        <Grid item xs={12} textAlign="center">
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

        <Grid item xs={12} textAlign="center">
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



      <Snackbar open={open}  onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar}  severity="success" >  Successfully sign in!</Alert>
      </Snackbar>
      <Snackbar open={openError}  onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar}  severity="error" >  oops something went wrong</Alert>
      </Snackbar>
    </Box>
  );
};
export default Login;
