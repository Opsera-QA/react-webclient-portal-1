import React from "react";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";
import PropTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { axiosApiService } from "./api/apiService";
import { AuthContext } from "./contexts/AuthContext";

class LoginForm extends React.Component {
  static contextType = AuthContext;
  constructor(props, context) {
    super(props, context);
    this.state = {
      sessionToken: null,
      error: null,
      username: "",
      password: "",
      email: "",
      loading: false,
      resetPassword: false,
      message: null
    };

    this.oktaAuth = new OktaAuth({ url: process.env.REACT_APP_OKTA_BASEURL });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleResetPasswordSubmit = this.handleResetPasswordSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    this.oktaAuth
      .signIn({
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        this.context.setRootLoading(true);
        this.setState({
          sessionToken: res.sessionToken
        });        
      })
      .catch(err => {
        this.setState({ error: err.message, loading: false });
        console.log(err.statusCode + " error", err);
      });
  }

  async handleResetPasswordSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    const apiUrl = "/users/forgot-password";   
    const params = { "email": this.state.email };
    await axiosApiService().post(apiUrl, params)
      .then(response => { 
        console.log("response: ", response);
        this.setState({ error: null, loading: false, resetPassword: false, message: response.data.message });
      })
      .catch(err => { 
        console.log(err.response);
        this.setState({ error: err.response.data.message, loading: false, message: null });
      });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleForgotPasswordClick(e) {
    this.setState({ error: null, message: null });
    this.setState({ resetPassword: e });
  }

  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }

    const errorMessage = this.state.error ? (
      <div className="text-danger mb-2">{this.state.error}</div>
    ) : null;

    const successMessage = this.state.message ? (
      <div className="text-success mb-2">{this.state.message}</div>
    ) : null;

    return (

      <div className="auth-wrapper">
        <div className="all-wrapper menu-side with-pattern">
          <div className="auth-box-w">
            <div className="logo-w">
              <a href="index.html"><img alt="" src="img/opsera_logo_120x118.png" /></a>
            </div>
            { this.state.resetPassword ? 
              <>
                <h4 className="auth-header">
                 Reset Password
                </h4>
                <form onSubmit={this.handleResetPasswordSubmit}>
                  {successMessage}
                  {errorMessage}
                  <div className="form-group">
                    <label htmlFor="">Email Address</label>
                    <input className="form-control" placeholder="Enter your email address" id="email"
                      type="text"
                      value={this.state.email}
                      onChange={this.handleEmailChange} />
                    <div className="pre-icon os-icon os-icon-user-male-circle"></div>
                  </div>

                  <div className="buttons-w">
                    <Button variant="success" className="w-100 mb-3" type="submit" disabled={!this.state.email}>
                      {this.state.loading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-1" size="sm" fixedWidth /> : null}
                      Reset Password</Button>

                    <Row>
                      <Col>
                        
                      </Col>
                      <Col className="text-right">
                        <Button variant="link" size="sm" 
                          onClick={() => { this.handleForgotPasswordClick(false); }}>Login Form</Button>
                      </Col>
                    </Row>
                  </div>
                </form>
              </> : <>  
                <h4 className="auth-header">
                 Login Form
                </h4>
                <form onSubmit={this.handleSubmit}>
                  {successMessage}
                  {errorMessage}
                  <div className="form-group">
                    <label htmlFor="">Username</label>
                    <input className="form-control" placeholder="Enter your username" id="username"
                      type="text"
                      value={this.state.username}
                      onChange={this.handleUsernameChange} />
                    <div className="pre-icon os-icon os-icon-user-male-circle"></div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input className="form-control" placeholder="Enter your password" id="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange} />
                    <div className="pre-icon os-icon os-icon-fingerprint"></div>
                  </div>
                  <div className="buttons-w">
                    <Button variant="success" className="w-100 mb-3" type="submit" disabled={!this.state.username || !this.state.password}>
                      {this.state.loading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-1" size="sm" fixedWidth /> : null}
                        Log In</Button>
                    <Row>
                      <Col className="pt-1">
                        <div className="form-check-inline" style={{ margin: 0 }}>
                          <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" />Remember Me</label>
                        </div>
                      </Col>
                      <Col className="text-right">
                        <Button variant="link" size="sm" 
                          onClick={() => { this.handleForgotPasswordClick(true); }}>Forgot Password</Button>
                      </Col>
                    </Row>
                  </div>
                </form>
              </>}

          </div>
        </div>
      </div>
    );
  }
}



LoginForm.propTypes = {
  auth: PropTypes.object
};

export default withAuth(LoginForm);