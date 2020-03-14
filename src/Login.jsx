import React from "react";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";
import PropTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
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
      loading: false
    };

    this.oktaAuth = new OktaAuth({ url: process.env.REACT_APP_OKTA_BASEURL });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidMount = async() => {
    const { getUserInfo } = this.context;
    try {
      const userInfo = await getUserInfo();
      if(userInfo != undefined) {
        this.props.history.goBack();
      }
    }
    catch (err) {
      console.log("Error occured getting user authentication status.", err);
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    this.oktaAuth
      .signIn({
        username: this.state.username,
        password: this.state.password
      })
      .then(res =>
        this.setState({
          sessionToken: res.sessionToken
        })
      )
      .catch(err => {
        this.setState({ error: err.message, loading: false });
        console.log(err.statusCode + " error", err);
      });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }

    const errorMessage = this.state.error ? (
      <div className="text-danger">{this.state.error}</div>
    ) : null;

    return (

      <div className="auth-wrapper">
        <div className="all-wrapper menu-side with-pattern">
          <div className="auth-box-w">
            <div className="logo-w">
              <a href="index.html"><img alt="" src="img/opsera_logo_125x125.png" /></a>
            </div>
            <h4 className="auth-header">
              Login Form
            </h4>
            <form onSubmit={this.handleSubmit}>
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
                <Button variant="success" className="w-100 mb-3" type="submit">
                  {this.state.loading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-1" size="sm" fixedWidth /> : null}
                  Log In</Button>

                <Row>
                  <Col>
                    <div className="form-check-inline" style={{ margin: 0 }}>
                      <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" />Remember Me</label>
                    </div>
                  </Col>
                  {/* <Col>
                  </Col> */}
                </Row>

              </div>
            </form>
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