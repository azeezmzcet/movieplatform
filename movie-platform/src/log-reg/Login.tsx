import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { authLogin } from './Authentication';
import {useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate=useNavigate();

  const handleLogin = async () => {
    try {
      const response = await authLogin(email,password);
      console.log('success', response.data);
    

    } catch (error: unknown) {
      console.log('error failed', error);
      
    }
  };

  return (
    <div>
      <Box>
        <h1><b>Login</b></h1>
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <Button variant="contained" color="success"onClick={handleLogin}>
          Login
        </Button>

        <div>
          Not a Member?{' '}
          <span style={{ color: 'blue', cursor: 'pointer' }}  onClick={()=>navigate('/register')}>
            Signup
          </span>
        </div>
      </Box>
    </div>
  );
};

export default Login;
