import React, { useState, useContext, } from "react";
import FacebookLogin from 'react-facebook-login';
import DefaultWrapper from "../components/wrappers/DefaultWrapper"
import { TextField, Button } from "@material-ui/core";
import { UserContext, } from '../App.js';
import { useFormik } from 'formik';
import { useNavigate, } from "react-router-dom";
import axios from "axios";
import { API_URL, } from "../utils/constants.js";
import FacebookIcon from '@mui/icons-material/Facebook';

function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
        email: '',
        password: '',
    }
  });

  const [reqError, updateReqError] = useState("");
  const { user, updateUser, } = useContext(UserContext);

  const _handleChange = (event) => {
    formik[event.target.name] = event.target.value;
  }

  const _onClick = () => {
        const body = {
            email: formik.email,
            password: formik.password,
        };

        axios.post(API_URL + "/auth/login", JSON.parse(JSON.stringify(body)))
        .then(res => {
            if (res?.data?.error) {
                updateReqError(res?.data?.error);
            } else {
                updateReqError("");
                localStorage.setItem("token", res.data.token);
                updateUser({
                    name: res.data.name,
                    email: res.data.email,
                    role: res.data.role,
                    phone: res.data.phone,
                    location: res.data.location,
                    blocked: res.data.blocked
                })

                navigate("/requests");
            }
        })
        .catch(err => {
            console.log(err);
        })
  }

  const responseFacebook = (responseBody) => {
    console.log(responseBody);
    axios.post(API_URL + "/auth/facebook-login", responseBody)
      .then(res => {
        console.log('res', res.data)
        localStorage.setItem("token", res.data.token);
        updateUser({
            name: res.data.name,
            email: res.data.email,
            role: res.data.role,
            phone: res.data.phone,
            location: res.data.location,
            blocked: res.data.blocked
        })

        navigate("/requests");
      })
      .catch(err => {
          console.log(err);
      })
  }

  return (
    <DefaultWrapper>
      <img className="logo" src="/logo.png"/>
      <span className="title login-title">Login</span>
      <TextField onChange={ _handleChange } name="email" label="Email" variant="outlined" />
      <TextField onChange={ _handleChange } type="password" name="password" label="Password" variant="outlined" />
      <Button onClick={ _onClick } variant="contained" color="primary">SIGN IN</Button>
      {/* <Button startIcon={<img className="small-icon" src="/google_logo.png" />} variant="contained" color="secondary">SIGN IN WITH GOOGLE</Button> */}
      <div className="fb-container">
        <FacebookIcon/>
        <FacebookLogin
          appId="1013159789570310"
          autoLoad={true}
          fields="name,email,picture"
          // icon="fa-facebook"
          cssClass="MuiButton-containedSecondary MuiButtonBase-root facebook-btn"
          // onClick={componentClicked}
          callback={responseFacebook}/>
      </div>
    </DefaultWrapper>
  );
}

export default Login;