import React, { useState, useEffect, useContext } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { axiosApiService } from "../../api/apiService";
import { useHistory } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/pro-solid-svg-icons";
import { AuthContext } from "../../contexts/AuthContext";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import { useOktaAuth } from "@okta/okta-react";
import {DialogToastContext} from "contexts/DialogToastContext";
import RegisterAccountButton from "components/login/RegisterAccountButton";
import PropTypes from "prop-types";
import userActions from "../user/user-actions";
import IconBase from "components/common/icons/IconBase";
import LoadingIcon from "components/common/icons/LoadingIcon";

const OktaSignIn = require("@okta/okta-signin-widget");

const LoginForm = ({ authClient }) => {
  const { generateJwtServiceTokenWithValue } = useContext(AuthContext);
  const { oktaAuth } = useOktaAuth();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmailAddress, setResetEmailAddress] = useState("");
  const [lookupAccountEmail, setLookupAccountEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState("domain"); //login, reset or domain
  const [loginType, setLoginType] = useState("standard"); //stardard: Opsera Okta Login, federated: Opsera Signing Widget
  const [federatedIdpEnabled, setFederatedIdpEnabled] = useState(false);
  const [oktaSignInWidget, setOktaSignInWidget] = useState(undefined);
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    if (viewType === "domain" && oktaSignInWidget) {
      oktaSignInWidget.remove();
    }

    if (viewType !== "login") {
      setUsername("");
    }
    setLookupAccountEmail("");
    setPassword("");
    setResetEmailAddress("");
    setLoginType("standard");
  }, [viewType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    authClient.signInWithCredentials({ username, password })
      .then(res => {
        toastContext.removeAllBanners();
        const sessionToken = res.sessionToken;

        const tokenOptions = {
          sessionToken: sessionToken,
          scopes: [
            "openid",
            "email",
            "profile",
          ],
          state: "8rFzn42MH5q",
          nonce: "51GePTb1wrm",
          idp: null,
        };

        authClient.token.getWithoutPrompt(tokenOptions)
          .then(function(res) {
            let tokens = res.tokens;
            authClient.tokenManager.setTokens(tokens);
            setLoading(false);
            //history.push("/");

            if (history.location.pathname === "/logout" || history.location.pathname === "/login") {
              history.push("/");
              history.go(0);
            }
          })
          .catch(function(err) {
            console.error("[authClient.token.getWithoutPrompt]", err);
            //handleFallbackGetLoginWithPrompt(tokenOptions);
            handleFallbackSignInReactHook(sessionToken);
            //setErrorMessage(err.message);
            setLoading(false);
          });
      })
      .catch(error => {
        toastContext.removeAllBanners();
        console.error("[authClient.signInWithCredentials]", error);
        let errorMessage = "An error has occurred with your Okta account authentication.  Please close your browser and start over or report the issue to Opsera.";
        if (error.errorCode && error.errorSummary) {
          errorMessage = `Okta Login Error: [${error.errorCode}] ${error.errorSummary}`;
        }

        toastContext.showErrorDialog(errorMessage);
        setLoading(false);
      });
  };

  //works for if password is expired or 2FA engaged.  Would prefer to use the next funciton though
  const handleFallbackSignInReactHook = (sessionToken) => {
    oktaAuth.signInWithRedirect({ sessionToken });
  };

  /*const handleFallbackGetLoginWithPrompt = (options) => {
    authClient.token.getWithoutPrompt(options)
      .then(function(res) {
        let tokens = res.tokens;
        authClient.tokenManager.setTokens(tokens);
        setLoading(false);
        history.push("/");
      })
      .catch(function(err) {
        console.log("Error [getWithoutPrompt]:", err);
        setErrorMessage(err.message);
        setLoading(false);
      });
  };*/


  //uses Okta Login widet for federated login.
  //https://github.com/okta/okta-signin-widget#idp-discovery
  const federatedOktaLogin = (ldapOrgName, federatedIdpIdentifier, lookupAccountEmail) => {
    setLoginType("federated");
    //console.log("Org Name: ", ldapOrgName);
    //console.log("IdP ID: ", federatedIdpIdentifier);

    let idpValues = [];
    if (federatedIdpIdentifier && federatedIdpIdentifier !== "0") {
      idpValues = [
        { text: ldapOrgName + " SSO", id: federatedIdpIdentifier },//IDP of LDAP object
        //{ text: "Opsera DEV DEMO", id: "0oa10wlxrgdHnKvOJ0h8" }, //IDP of our PROD Okta Federated for use via DEV/LOCALHOST for developerment
        //{ text: "Opsera Inc", id: "0oa44bjfqlK7gTwnz4x7" }, //IDP of our DEV Okta Federated for use via PROD for Smoke Testing
        //{ type: "GOOGLE", id: "0oa1njfc0lFlSp0mM4x7" }, //IDP of our GSuite as opposed to pure google
      ];
    }

    const signIn = new OktaSignIn({
      baseUrl: process.env.REACT_APP_OKTA_BASEURL,
      redirectUri: process.env.REACT_APP_OPSERA_OKTA_REDIRECTURI,
      authParams: {
        pkce: true,
        responseType: "code",
        scopes: ["openid", "email"],
      },
      clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
      idps: idpValues,
      idpDisplay: "PRIMARY",
      idpDiscovery: {
        requestContext: process.env.REACT_APP_OPSERA_CLIENT_ROOT_URL + "/loading.html" //"about:blank"
      },
      features: {
        idpDiscovery: true,
        rememberMe: false,
      },
      logoText: ldapOrgName + " Sign in",
      logo: '/img/logos/opsera_bird_infinity_171_126.png',
      language: 'en',
      username: lookupAccountEmail,
      i18n: {
        en: {
          'primaryauth.title': ldapOrgName + " Account Activation",
          'primaryauth.username.placeholder': "Email Address",
          'primaryauth.username.tooltip': "The login form below follows your organizations defined sign in flow once your account is activated."
        }
      },
    });
    setOktaSignInWidget(signIn); //store it in state so access outside of function scope
    signIn.remove(); //ensure any prior existing instances are removed frist (throws errors otherwise)

    signIn.showSignInToGetTokens({
      // Assumes there is an empty element on the page with an id of 'osw-container'
      el: "#osw-container",
    }).then(function(tokens) {
      // Store tokens
      authClient.tokenManager.setTokens(tokens);
      signIn.remove();

      history.push("/");
    }).catch(function(error) {
      toastContext.removeAllBanners();
      console.log("Found an error", error);
      toastContext.showErrorDialog(error);
    });
  };


  const handleUsernameChange = (e) => {
    setUsername(e.target.value.toLowerCase());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleResetEmailChange = (e) => {
    setResetEmailAddress(e.target.value.toLowerCase());
  };

  const handleLookupAccountEmailChange = (e) => {
    setLookupAccountEmail(e.target.value.toLowerCase());
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const apiUrl = "/users/forgot-password";
    const params = { "email": resetEmailAddress };
    axiosApiService().post(apiUrl, params)
      .then(response => {
        console.log("response: ", response);
        setLoading(false);
        toastContext.removeAllBanners();
        toastContext.showSystemInformationBanner(response?.data?.message);
        setViewType("login");
      })
      .catch(error => {
        toastContext.removeAllBanners();
        console.error(error);
        setLoading(false);
        toastContext.showErrorDialog(error?.response?.data?.message);
      });
  };


  const handleDomainLookupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFederatedIdpEnabled(false);
    toastContext.removeAllBanners();

    const apiUrl = "/users/active-account";
    const params = { "email": lookupAccountEmail, "hostname": window.location.hostname };
    try {
      const response = await axiosApiService().post(apiUrl, params); //this lookup is currently FF in Node
      toastContext.removeAllBanners();

      const {loginAllowed, validHost, accountType} = response.data;

      //valid account so allow it to continue login
      if (loginAllowed && validHost) {

        /*START NEW FEDERATION CODE*/
        if (accountType === "ldap-organization") {
          const token = await generateJwtServiceTokenWithValue({ id: "orgRegistrationForm" });

          if (token) {
            const accountResponse = await userActions.getAccountInformationWithEmailAddress(lookupAccountEmail, token);
            const { localAuth, accountName, idpIdentifier } = accountResponse.data;
            if (localAuth && localAuth === "FALSE") {
              setFederatedIdpEnabled(localAuth === "FALSE" && idpIdentifier !== "0");
              setUsername(lookupAccountEmail);
              setViewType("federated-login");
              federatedOktaLogin(accountName, idpIdentifier, lookupAccountEmail);
              return;
            }
          }
        }
        /* END FEDERATION CODE */

        //SET LOCAL AUTH
        setUsername(lookupAccountEmail);
        setViewType("login");
        return;
      }

      if (!validHost) {
        toastContext.showErrorDialog("Warning!  You are attempting to log into the wrong Opsera Portal tenant.  Please check with your account owner or contact Opsera to get the proper URL to access your platform.");
        return;
      }

      //loginAllowed === false: account isn't ready for login (check customer DB settings)
      toastContext.showSystemInformationBanner("Congratulations, your account set up is in progress and it should be available shortly. Please check back soon or contact us for assistance!");

    } catch (error) {
      toastContext.removeAllBanners();

      if (error?.response?.status === 404) {
        console.error(error);
        toastContext.showErrorDialog("Your email address is not found in our system, please contact your account owner or administrator for assistance.");
      } else {
        toastContext.showErrorDialog(error);
      }
    } finally {
      setLoading(false);
    }
  };


  if (viewType === "login") {
    return (
      <Row className="mt-4">
        <Col md={5} className="p-4"><WelcomeMessage /></Col>
        <Col>
          <div className="d-flex align-items-center justify-content-center">
            <div className="auth-box-w">
              <div className="logo-w">
                <img alt="Opsera"
                     src="/img/logos/opsera_bird_infinity_171_126.png"
                     width="171"
                     height="126"
                />
              </div>

              <div id="osw-container">
                  <div className="h4 auth-header">
                    Sign in
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="username">Email Address</label>
                      <input className="form-control"
                             id="username" type="text"
                             value={username}
                             disabled={true}
                             onChange={handleUsernameChange} />
                      <div className="pre-icon os-icon os-icon-user-male-circle"></div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input className="form-control"
                             id="password" type="password"
                             value={password}
                             onChange={handlePasswordChange} />
                      <div className="pre-icon os-icon os-icon-fingerprint"></div>
                    </div>
                    <div className="buttons-w text-center">

                      <Button variant="outline-secondary"
                              className="mb-3 mr-1" style={{ width: "46%" }}
                              type="button"
                              onClick={() => {
                                setViewType("domain");
                              }}>
                        <IconBase icon={faArrowLeft} className={"mr-1"} iconSize={"sm"} />
                        Back
                      </Button>

                      <Button variant="warning"
                              className="ml-1 mb-3"
                              style={{ width: "46%" }}
                              type="submit"
                              disabled={!username || !password}>
                        {loading && <LoadingIcon className={"mr-1"} iconSize={"sm"} />}
                        Sign in</Button>
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
          </div>
        </Col>
      </Row>

    );
  }

  if (viewType === "federated-login") {
    return (
      <Row className="mt-4">
        <Col md={5} className="p-4"><WelcomeMessage /></Col>
        <Col>
          <div className="d-flex align-items-center justify-content-center">
            <div className="auth-box-w">

              <div id="osw-container">

              </div>

              <div className="buttons-w text-center">
                <Button variant="outline-secondary"
                        className="mb-3 mr-1" style={{ width: "46%" }}
                        type="button"
                        onClick={() => {
                          setViewType("domain");
                        }}>
                  <IconBase icon={faArrowLeft} className={"mr-1"} iconSize={"sm"} />
                  Back
                </Button>
              </div>

            </div>
          </div>
        </Col>
      </Row>
    );
  }

  if (viewType === "reset") {
    return (
      <div className="mt-4 d-flex align-items-center justify-content-center" style={{ minHeight: "500px" }}>
        <div className="auth-box-w">
          <div className="logo-w">
            <img alt="Opsera"
                 src="/img/logos/opsera_bird_infinity_171_126.png"
                 width="171"
                 height="126"
            />
          </div>
          <h4 className="auth-header">
            Reset Password
          </h4>

          <form onSubmit={handleResetPasswordSubmit}>
            <div className="form-group">
              <label htmlFor="username">Email Address</label>
              <input className="form-control"
                     id="username" type="text"
                     value={resetEmailAddress}
                     onChange={handleResetEmailChange} />
              <div className="pre-icon os-icon os-icon-user-male-circle"></div>
            </div>

            <div className="buttons-w">
              <Button variant="success" className="w-100 mb-3" type="submit" disabled={!resetEmailAddress}>
                {loading && <LoadingIcon className={"mr-1"} iconSize={"sm"} />}
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
      <Row className="mt-4">
        <Col md={5} className="p-4"><WelcomeMessage /></Col>
        <Col>
          <div className="d-flex align-items-center justify-content-center">
            <div className="auth-box-w">
              <div className="logo-w">
                <img alt="Opsera"
                     src="/img/logos/opsera_bird_infinity_171_126.png"
                     width="171"
                     height="126"
                />
              </div>
              <h4 className="auth-header">
                Sign in
              </h4>

              <form onSubmit={handleDomainLookupSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Email Address</label>
                  <input className="form-control"
                         id="username" type="text"
                         value={lookupAccountEmail}
                         onChange={handleLookupAccountEmailChange} />
                  <div className="pre-icon os-icon os-icon-user-male-circle"></div>
                </div>

                <div className="buttons-w">
                  <Button variant="warning" className="w-100 mb-3" type="submit"
                          disabled={!lookupAccountEmail}>
                    {loading && <LoadingIcon className={"mr-1"} iconSize={"sm"} />}
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
        <RegisterAccountButton />
        {/*<div className="col-md px-2">
        <Button variant="outline-success" className="btn-lg w-100 mb-3" onClick={login}>Log In</Button>
      </div>*/}
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  authClient: PropTypes.any
};

export default LoginForm;