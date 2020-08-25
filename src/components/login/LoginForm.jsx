import React, { useState, useEffect } from "react";
import OktaAuth from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import { Button, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { axiosApiService } from "../../api/apiService";
import { useHistory } from "react-router-dom";


const LoginForm = () => {
  const { authService } = useOktaAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmailAddress, setResetEmailAddress] = useState("");
  const [lookupAccountEmail, setLookupAccountEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState(false);
  const [viewType, setViewType] = useState("domain"); //login, reset or domain


  useEffect(() => {
    if (viewType !== "login") {
      setUsername("");
    }
    setLookupAccountEmail("");
    setPassword("");
    setResetEmailAddress("");
  }, [viewType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const authClient = new OktaAuth({
      issuer: process.env.REACT_APP_OKTA_ISSUER,
      clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
      redirectUri: process.env.REACT_APP_OPSERA_OKTA_REDIRECTURI,
    });

    //const oktaAuth = new OktaAuth({ issuer: issuer });
    authClient.signIn({ username, password })
      .then(res => {
        setLoading(false);
        setErrorMessage(false);
        setMessage(false);
        const sessionToken = res.sessionToken;
        // sessionToken is a one-use token, so make sure this is only called once
        authService.redirect({ sessionToken });
      })
      .catch(err => {
        console.log("Found an error", err);
        setErrorMessage(err.message);
        setLoading(false);
      });

  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleResetEmailChange = (e) => {
    setResetEmailAddress(e.target.value);
  };

  const handleLookupAccountEmailChange = (e) => {
    setLookupAccountEmail(e.target.value);
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const apiUrl = "/users/forgot-password";
    const params = { "email": resetEmailAddress };
    await axiosApiService().post(apiUrl, params)
      .then(response => {
        console.log("response: ", response);
        setLoading(false);
        setErrorMessage(false);
        setMessage(response.data.message);
        setViewType("login");
      })
      .catch(err => {
        console.log(err.response);
        setLoading(false);
        setErrorMessage(err.response.data.message);
        setMessage(false);
      });
  };

  const handleDomainLookupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const apiUrl = "/users/account-by-domain";
    const params = { "email": lookupAccountEmail };
    /* await axiosApiService().post(apiUrl, params)
      .then(response => { 
        console.log("response: ", response);
        setLoading(false);
        setErrorMessage(false);
        setMessage(response.data.message);
        setViewType("login");     
      })
      .catch(err => { 
        console.log(err.response);
        setLoading(false);
        setErrorMessage(err.response.data.message);
        setMessage(false);                
      }); */

    //todo: call lookup API with email address:  
    // if successful, update Okta values to match, swap out logo (future) and switch to login form
    setUsername(lookupAccountEmail);
    setViewType("login");
    setLoading(false);
  };


  if (viewType === "login") {
    return (
      <Row>
        <Col md={5} className="p-4"><WelcomeMessage/></Col>
        <Col>
          <div className="d-flex align-items-center justify-content-center">
            <div className="auth-box-w">
              <div className="logo-w">
                <a href="index.html"><img alt="" src="img/opsera_logo_120x118.png"/></a>
              </div>
              <h4 className="auth-header">
                Sign in
              </h4>
              {errorMessage && <div className="mx-2 error-text">{errorMessage}</div>}
              {message && <div className="mx-2 info-text">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Email Address</label>
                  <input className="form-control"
                         id="username" type="text"
                         value={username}
                         onChange={handleUsernameChange}/>
                  <div className="pre-icon os-icon os-icon-user-male-circle"></div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input className="form-control"
                         id="password" type="password"
                         value={password}
                         onChange={handlePasswordChange}/>
                  <div className="pre-icon os-icon os-icon-fingerprint"></div>
                </div>
                <div className="buttons-w">
                  <Button variant="success" className="w-100 mb-3" type="submit" disabled={!username || !password}>
                    {loading && <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-1" size="sm" fixedWidth/>}
                    Log In</Button>
                </div>
                <div className="text-center">
                  <Button variant="link" size="sm"
                          onClick={() => {
                            setViewType("reset");
                          }}>Forgot Password</Button>
                </div>
              </form>
            </div>
          </div>
        </Col>
      </Row>

    );
  }

  if (viewType === "reset") {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "500px" }}>
        <div className="auth-box-w">
          <div className="logo-w">
            <a href="index.html"><img alt="" src="img/opsera_logo_120x118.png"/></a>
          </div>
          <h4 className="auth-header">
            Reset Password
          </h4>

          {errorMessage && <div className="mx-2 error-text">{errorMessage}</div>}
          {message && <div className="mx-2 info-text">{message}</div>}

          <form onSubmit={handleResetPasswordSubmit}>
            <div className="form-group">
              <label htmlFor="username">Email Address</label>
              <input className="form-control"
                     id="username" type="text"
                     value={resetEmailAddress}
                     onChange={handleResetEmailChange}/>
              <div className="pre-icon os-icon os-icon-user-male-circle"></div>
            </div>

            <div className="buttons-w">
              <Button variant="success" className="w-100 mb-3" type="submit" disabled={!resetEmailAddress}>
                {loading && <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-1" size="sm" fixedWidth/>}
                Reset Password</Button>
            </div>
            <div className="text-center">
              <Button variant="link" size="sm"
                      onClick={() => {
                        setViewType("login");
                      }}>Login Form</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (viewType === "domain") {
    return (
      <Row>
        <Col md={5} className="p-4"><WelcomeMessage/></Col>
        <Col>
          <div className="d-flex align-items-center justify-content-center" >
            <div className="auth-box-w">
              <div className="logo-w">
                <a href="index.html"><img alt="" src="img/opsera_logo_120x118.png"/></a>
              </div>
              <h4 className="auth-header">
                Sign in
              </h4>

              {errorMessage && <div className="mx-2 error-text">{errorMessage}</div>}
              {message && <div className="mx-2 info-text">{message}</div>}

              <form onSubmit={handleDomainLookupSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Email Address</label>
                  <input className="form-control"
                         id="username" type="text"
                         value={lookupAccountEmail}
                         onChange={handleLookupAccountEmailChange}/>
                  <div className="pre-icon os-icon os-icon-user-male-circle"></div>
                </div>

                <div className="buttons-w">
                  <Button variant="success" className="w-100 mb-3" type="submit" disabled={!lookupAccountEmail}>
                    {loading && <FontAwesomeIcon icon={faSpinner} className="fa-spin mr-1" size="sm" fixedWidth/>}
                    Next</Button>
                </div>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
};


const WelcomeMessage = () => {
  const history = useHistory();
  const gotoSignUp = () => {
    history.push("/signup");
  };

  return (
    <div className="ml-4">
    <h2 className="mb-3 bd-text-purple-bright">Welcome to Opsera!</h2>
    <div style={{ fontSize: "1.1rem" }}>
      Opsera’s vision is to enable and empower the developers, operations and release teams by giving the
      flexibility in selecting the various DevOps
      functional tools, build the pipeline with quality and security gates.
    </div>
    <div style={{ fontSize: "1.1rem" }} className="mt-3">Opsera provides out of the box monitoring dashboard,
      giving an end to end visibility of DevOps landscape metrics
      via an intelligent dashboard to improve the Agility, Operational excellence and help them to track
      security and compliance metrics.
    </div>

    <div className="row mx-n2 mt-4">
      <div className="col-md px-2">
        <Button variant="success" className="btn-lg w-100 mb-3" onClick={gotoSignUp}>Register an Account</Button>
      </div>
      {/*<div className="col-md px-2">
        <Button variant="outline-success" className="btn-lg w-100 mb-3" onClick={login}>Log In</Button>
      </div>*/}
    </div>
  </div>
  );
};

export default LoginForm;