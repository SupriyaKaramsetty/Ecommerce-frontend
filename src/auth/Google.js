import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import {socialLogin} from '../core/apiCore';
import {googleauthenticate} from '../auth/index';
// import styles from '../user/Signin/Signin';
 
class SocialLogin extends Component {
  constructor() {
    super();
    this.state = {redirectToReferrer: false};
  }

  responseGoogle = response => {
    const {googleId, name, email, imageUrl} = response.profileObj;
    const user = {password: googleId, name, email, imageUrl};
    socialLogin(user)
      .then(data => {
        if (data.error) console.log('Error Login. Please try again..');
        else {
            googleauthenticate(data);
          this.setState({redirectToReferrer: true});
        }
      });
  };

  render() {
    const {redirectToReferrer} = this.state;
    if (redirectToReferrer) return <Redirect to='/' />;
    return (
      <GoogleLogin
        clientId='254638296199-pvfi29n1cgu33cbcl7qpp7bbt225aidd.apps.googleusercontent.com'
        buttonText='Login with Google'
        className="btn btn-danger btn-lg btn-block"
                onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    );
  };
};

export default SocialLogin;

