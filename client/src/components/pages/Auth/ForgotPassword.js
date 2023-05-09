import React, { useState } from 'react'
import Layout from '../../Layout/Layout'
import axios from "axios";
import '../../pagesCss/Register.css'
import { Button, Form } from 'react-bootstrap'
import toast from "react-hot-toast";
import {useNavigate } from 'react-router-dom';



const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState();

  const navigate = useNavigate();
  

   // form function
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("/api/v1/auth/forgot-password", {
            email,
            newPassword,
            answer,
        });
        if (res && res.data.success) {
            toast.success(res.data && res.data.message);
          navigate("/login");
        } else {
            toast.error(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    }
};
    return (
        <Layout title={"ForgotPassword--Ecommerce app"}>
            <div className='register'>
                <h1>RESET PASSWORD</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder=" Your favorite Sport Name" 
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="password" placeholder="Enter Your Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        RESET
                    </Button>
                </Form>
            </div>
        </Layout>
    )
}

export default ForgotPassword