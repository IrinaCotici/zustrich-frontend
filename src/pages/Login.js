import DefaultWrapper from "../components/wrappers/DefaultWrapper"
import { TextField, Button } from "@material-ui/core";

function Login() {
  return (
    <DefaultWrapper>
      <img className="logo" src="/logo.png"/>
      <span className="title login-title">Login</span>
      <TextField id="outlined-basic" label="Email" variant="outlined" />
      <TextField id="outlined-basic" label="Password" variant="outlined" />
      <Button variant="contained" color="primary">SIGN IN</Button>
      <Button startIcon={<img className="small-icon" src="/google_logo.png" />} variant="contained" color="secondary">SIGN IN WITH GOOGLE</Button>
    </DefaultWrapper>
  );
}

export default Login;