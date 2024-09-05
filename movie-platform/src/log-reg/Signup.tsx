
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { authRegister } from './Authentication';
import { useNavigate } from 'react-router-dom';



export const Signup: React.FC=()=>{

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [c_password, setC_password] = useState<string>('');

  const navigate=useNavigate();

  const handleRegister = async () => {
    try {
      const response = await authRegister(name,email,password,c_password);
      console.log('success', response.data);
      
      
    } catch (error: unknown) {
      console.log('error failed', error);
    }
  };

  
    return (
        <>
      <div>
        <Box>
        <h1><b>Registration</b></h1>
        <br></br>

        <input type="name" name="name" placeholder='userName'  onChange={(e) => setName(e.target.value)}/><br></br>
        <input type="email" name="email" placeholder='Email'  onChange={(e) => setEmail(e.target.value)}/><br></br>
        <input type="password" name="password" placeholder='Password'  onChange={(e) => setPassword(e.target.value)}/><br></br>
        <input type="c_password" name="c_password" placeholder='comfirm Password'  onChange={(e) => setC_password(e.target.value)}/><br></br>

        <Button variant="contained" color="success" onClick={handleRegister}>
        Register
      </Button>
        

        <div>already have a account?.<span  style={{color:"green"}} onClick={()=>navigate("/login")}>Login</span></div>
        </Box>

    </div>

        </>

    )
}

export default Signup;