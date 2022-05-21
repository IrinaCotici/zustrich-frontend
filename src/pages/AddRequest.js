import React, { useState, useContext, useEffect } from "react";
import DefaultWrapper from "../components/wrappers/DefaultWrapper"
import { TextField, Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import Header from "../components/Header";
import { API_URL, } from "../utils/constants.js"
import axios from "axios";
import { useNavigate, } from "react-router-dom";

function AddRequest() {
  const navigate = useNavigate();
  const [locations, updateLocations] = useState([]);

  const [form, updateForm] = useState({
    productQuantity: -1,
    productName: -1,
    location: '',
  });

  const _handleInput = (fieldName) => (option) => {
    console.log()
    const value = fieldName === 'location' ? option.target.value._id : option.target.value
    updateForm({
      ...form,
      [fieldName]: value,
    })

    console.log(form)
  };

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

  const _onSubmit = () => {
    const body = {
      location: form.location,
      productName: form.productName,
      productQuantity: form.productQuantity,
    };

    axios.post(API_URL + "/request",
        body,
        {
            headers: {
                token: localStorage.getItem("token")
            }
        },
    )
    .then(res => {
        navigate("/requests");
    })
  }

  return (
    <div className="main-container wrapper">
      <Header></Header>
      <DefaultWrapper>
        <span className="title request-title">CREATE REQUEST</span>
        <TextField onChange={ _handleInput('productName') } id="outlined-basic" label="Product Name" variant="outlined" />
        <div className="flex-container">
          <FormControl className="select-btn MuiFormControl-root">
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              label="Locations"
              defaultValue=""
              options={ locations }
              onChange={ _handleInput('location') }
            > 
              { getLocations() }
            </Select>
          </FormControl>

          <TextField onChange={ _handleInput('productQuantity') } className="MuiInputBase-root qty-input" id="outlined-basic" label="Quantity" variant="outlined" />
        </div>
        <Button onClick={ _onSubmit } variant="contained" color="primary">ADD REQUEST</Button>
      </DefaultWrapper>
    </div>
  );
}

export default AddRequest;