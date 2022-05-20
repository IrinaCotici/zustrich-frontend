import DefaultWrapper from "../components/wrappers/DefaultWrapper"
import { TextField, Button, TextareaAutosize } from "@material-ui/core";

function AddLocation() {
  return (
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
  );
}

export default AddLocation;