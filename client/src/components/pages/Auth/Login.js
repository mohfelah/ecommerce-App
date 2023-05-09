import React, { useState } from 'react'
import Layout from '../../Layout/Layout'
import axios from "axios";
import '../../pagesCss/Register.css'
import { Button, Form } from 'react-bootstrap'
import toast from "react-hot-toast";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


      // form function
      const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password, phone, address);
        // toast.success("register success");
        try {
            const res = await axios.post("/api/v1/auth/login", {
                email,
                password,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                  });
                  localStorage.setItem("auth", JSON.stringify(res.data));
                  navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
  return (
    <Layout>
         <div className='register'>
                <h1>Login</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="button" className='ms-1'
                     onClick={() => {
                        navigate("/forgotPassword");}}>
                        Forgot Password
                    </Button>
                    <Button variant="primary" type="submit" className='ms-1'>
                        Login
                    </Button>
                </Form>
            </div>
    </Layout>
  )
}

export default Login