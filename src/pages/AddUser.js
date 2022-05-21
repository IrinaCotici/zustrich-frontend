import React, { useState, useContext, useEffect } from "react";
import DefaultWrapper from "../components/wrappers/DefaultWrapper"
import { TextField, Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { USER_ROLES } from "../utils/constants";
import Header from "../components/Header";
import { API_URL, } from "../utils/constants.js"
import axios from "axios";
import { useNavigate, } from "react-router-dom";



function AddUser() {
  const navigate = useNavigate();
  const [locations, updateLocations] = useState([]);
  
  const [form, updateForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: -1,
    location: '',
  });

  const _onSelect = (fieldName) => (option) => {
    const value = fieldName === 'location' ? option.target.value._id : option.target.value
    updateForm({
      ...form,
      [fieldName]: value,
    })
  };

  const _onSubmit = () => {
    const body = {
      location: form.location,
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone,
      role: form.role,
    };

    axios.post(API_URL + "/user",
        body,
        {
            headers: {
                token: localStorage.getItem("token")
            }
        },
    )
    .then(res => {
        navigate("/users");
    })
  }

  const getRoles = (USER_ROLES) => {
    return USER_ROLES.map((role) => (
      <MenuItem
        key={ role.id }
        value={ role.value }
      >
        { role.label }
      </MenuItem>
    ))
  }

  useEffect(() => {
    axios.get(API_URL + "/location",
        {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log("succes", res)
            updateLocations(res.data)
        })
        .catch(err => {
            console.log(err)
        })
  }, []);

  const getLocations = () => {
    return locations.map((location) => (
      <MenuItem
        key={ location.id }
        value={location}
      >
        { location.name }
      </MenuItem>
    ))
  }
  return (
    <div className="main-container wrapper">
      <Header></Header>
      <DefaultWrapper>
        <span className="title">CREATE USER</span>
        <TextField onChange={ _onSelect('name') } id="outlined-basic" label="Name" variant="outlined" />
        <TextField onChange={ _onSelect('email') } id="outlined-basic" label="Email" variant="outlined" />
        <TextField onChange={ _onSelect('phone') } id="outlined-basic" label="Phone Number" variant="outlined" />
        <TextField onChange={ _onSelect('password') } id="outlined-basic" type="password" label="Password" variant="outlined" />
        <FormControl className="select-btn MuiFormControl-root">
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            label="Role"
            defaultValue=""
            name="role"
            options={USER_ROLES}
            onChange={ _onSelect('role') }
          > 
            { getRoles(USER_ROLES) }
          </Select>
        </FormControl>
        <FormControl className="select-btn MuiFormControl-root">
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            label="Location"
            defaultValue=""
            name="location"
            options={ locations }
            onChange={ _onSelect('location') }
          > 
            { getLocations() }
          </Select>
        </FormControl>
        <Button onClick={ _onSubmit } variant="contained" color="primary">ADD USER</Button>
      </DefaultWrapper>
    </div>
  );
}

export default AddUser;