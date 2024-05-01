import React from 'react';
import { SignInButton } from 'react-auth2-gapi';

// The same options object in the signature of `gapi.signin2.render`
// https://developers.google.com/identity/sign-in/web/reference#gapisignin2renderid_options
const options = {
  width: 200,
  height: 50,
  theme: 'dark',
  onsuccess: () => console.log('Successfully logged in'),
  onfailure: () => console.error('Error logging in'),
};

const MySignInButton = () => (
  <SignInButton options={options} />
);

export default MySignInButton;