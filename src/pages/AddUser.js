import React, { useState, useContext, } from "react";
import DefaultWrapper from "../components/wrappers/DefaultWrapper"
import { TextField, Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { USER_ROLES } from "../utils/constants";
import Header from "../components/Header";
import { API_URL, } from "../utils/constants.js"
import { useFormik } from 'formik';
import * as yup from 'yup';


function AddUser() {

  const [ userType, updateUserType ] = useState(USER_ROLES[0]);

  const formik = useFormik({
    initialValues: {
        name: '',
        email: '',
        phone: '',
        password: '',
        role: -1,
        location: '',
    },
  });

  const _onSelect = option => {
    formik.values[option.target.name] = option.target.value
    console.log(formik)
  };


  const getRoles = (USER_ROLES) => {
    console.log('USER_ROLES', USER_ROLES)
    return USER_ROLES.map((role) => (
      <MenuItem
        key={ role.value }
        value={ role.value }
      >
        { role.label }
      </MenuItem>
    ))
  }

  const getLocations = () => {
    const locations = [{
      id: 23343,
      name: 'hopa'
    }]

    return locations.map((location) => (
      <MenuItem
        key={ location.id }
        value={ location.id }
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
        <TextField id="outlined-basic" label="Name" variant="outlined" />
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <TextField id="outlined-basic" label="Phone Number" variant="outlined" />
        <TextField id="outlined-basic" label="Password" variant="outlined" />
        <FormControl className="select-btn MuiFormControl-root">
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            label="Role"
            defaultValue=""
            name="role"
            options={USER_ROLES}
            onChange={ _onSelect }
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
            onChange={ _onSelect }
          > 
            { getLocations() }
          </Select>
        </FormControl>
        <Button variant="contained" color="primary">ADD USER</Button>
      </DefaultWrapper>
    </div>
  );
}

export default AddUser;