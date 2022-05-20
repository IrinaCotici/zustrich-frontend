import DefaultWrapper from "../components/wrappers/DefaultWrapper"
import { TextField, Button, TextareaAutosize } from "@material-ui/core";
import Header from "../components/Header";

function AddLocation() {
  return (
    <div className="main-container wrapper">
      <Header></Header>
      <DefaultWrapper>
        <span className="title">CREATE LOCATION</span>
        <TextField label="Name" variant="outlined" />
        <TextField label="Address" variant="outlined" />
        <TextareaAutosize
          minRows={3}
          style={{ height: 200 }}
          placeholder="Description"
        ></TextareaAutosize>
        <Button variant="contained" color="primary">ADD LOCATION</Button>
      </DefaultWrapper>
    </div>
  );
}

export default AddLocation;