import DefaultWrapper from "../components/wrappers/DefaultWrapper"
import { TextField, Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { USER_ROLES } from "../utils/constants";
import Header from "../components/Header";


function AddUser() {
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
            id="demo-simple-select"
            label="Age"
            defaultValue=""
          > 
            { getRoles(USER_ROLES) }
          </Select>
        </FormControl>
        <Button variant="contained" color="primary">ADD USER</Button>
      </DefaultWrapper>
    </div>
  );
}

export default AddUser;