import React, { useEffect, useState } from 'react'
import UserMenu from '../../Layout/UserMenu'
import Layout from '../../Layout/Layout'
import { useAuth } from '../../context/auth';
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Form } from 'react-bootstrap';

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Profile"}>
      <div className='row'>
        <div className='col-md-3'>
          <UserMenu />
        </div>
        <div className='col-md-9'>
          <div className="form-container" style={{ marginTop: "40px" }}>
            <Form onSubmit={handleSubmit}>
            <h4 className="title">USER PROFILE</h4>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Enter your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Enter your Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Enter your Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                 
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </div>
        </div>
      </div>

    </Layout >
  )
}

export default Profile