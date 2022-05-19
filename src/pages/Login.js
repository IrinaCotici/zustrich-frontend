import DefaultWrapper from "../components/wrappers/DefaultWrapper"
import { TextField, Button } from "@material-ui/core";
// import googleLogo from "/google_logo.png";

function Login() {
  return (
    <DefaultWrapper>
      <img class="logo" src="/logo.png"/>
      <span class="title">Login</span>
      <TextField id="outlined-basic" label="Email" variant="outlined" />
      <TextField id="outlined-basic" label="Password" variant="outlined" />
      <Button variant="contained" color="primary">SIGN IN</Button>
      <Button startIcon={<img class="small-icon" src="/google_logo.png" />} variant="contained" color="secondary">SIGN IN WITH GOOGLE</Button>
    </DefaultWrapper>
  );
}

export default Login;