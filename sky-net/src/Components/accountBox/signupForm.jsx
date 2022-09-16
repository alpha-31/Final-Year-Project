import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import GoogleLogin from "react-google-login";


export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const handleFailure = (result) =>
  {
    console.log(result)
  };
  const handleLogin = (googleData) =>
  {
    console.log(googleData)
  };


  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Login With Google"
      onSuccess={handleLogin}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
      >
      </GoogleLogin>
      <SubmitButton type="submit">Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink>
        Already have an account?
        <BoldLink onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}