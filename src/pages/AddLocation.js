import React, { useState, useContext, useEffect } from "react";
import DefaultWrapper from "../components/wrappers/DefaultWrapper"
import { TextField, Button, TextareaAutosize } from "@material-ui/core";
import Header from "../components/Header";
import axios from "axios";
import { API_URL, } from "../utils/constants.js"
import { useNavigate, } from "react-router-dom";

function AddLocation() {
  const navigate = useNavigate();
  const [form, updateForm] = useState({
    name: '',
    address: '',
    description: '',
  });

  const _handleInput = (fieldName) => (option) => {
    updateForm({
      ...form,
      [fieldName]: option.target.value
    })
  };

  const _onSubmit = () => {
    console.log("ha")
    const body = {
      name: form.name,
      address: form.address,
      description: form.description
    }

    axios.post(API_URL + "/location",
        body,
        {
            headers: {
                token: localStorage.getItem("token")
            }
        },
    )
    .then(res => {
        navigate("/locations");
    })
  }

  return (
    <div className="main-container wrapper">
      <Header></Header>
      <DefaultWrapper>
        <span className="title">CREATE LOCATION</span>
        <TextField onChange={ _handleInput('name') } label="Name" variant="outlined" />
        <TextField onChange={ _handleInput('address') } label="Address" variant="outlined" />
        <TextareaAutosize
          minRows={3}
          style={{ height: 200 }}
          placeholder="Description"
          onChange={ _handleInput('description') }
        ></TextareaAutosize>
        <Button onClick={ _onSubmit }variant="contained" color="primary">ADD LOCATION</Button>
      </DefaultWrapper>
    </div>
  );
}

export default AddLocation;