import Box from "@mui/material/Box";
import { Button, Grid, TextField, Typography,Snackbar,Alert } from "@mui/material";
import { useState } from "react";
import { authRegister } from "./Authentication";
import { useNavigate } from "react-router-dom";

export const Signup: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [c_password, setC_password] = useState<string>("");

  const [open,setOpen] = useState<boolean>(false);


  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    c_password: false,
  });

  const handleRegister = async () => {

    const newErrors = {
      name: !name,
      email: !email,
      password: !password,
      c_password: !c_password,
    };

    setErrors(newErrors);

    try {
      const response = await authRegister(name, email, password, c_password);
      // console.log("success", response.data);
      localStorage.setItem("Token", response.data.tokenNmae);
      // console.log("signup local");
      setOpen(true);
      setTimeout(()=>{
        navigate('/');
      },1500);
    } catch (error: unknown) {
      console.log("error failed", error);
     
    }
  };

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
        <Grid item xs={12} textAlign="center">
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            color="black"
          >
            Sign Up
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            type="text"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            error={errors.name}
            helperText={errors.name ? "Name is required" : ""}
          />
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
            helperText={errors.email ? "Email is required ,it should be in (name@_mail.com)" : ""}
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

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={c_password}
            onChange={(e) => setC_password(e.target.value)}
            required
            error={errors.c_password}
            helperText={errors.c_password ? " Make please to write comfirm password" : ""}
          />
        </Grid>

        <Grid item xs={12} textAlign="center">
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

        <Grid item xs={12} textAlign="center">
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

      <Snackbar open={open}  onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar}  severity="success" >  Successfully logged in!</Alert>
      </Snackbar>
    </Box>
  );
};

export default Signup;
