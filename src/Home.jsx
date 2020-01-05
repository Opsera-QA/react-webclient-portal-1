import React, { Component } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FeaturesCards from './components/about/features';
import LoadingDialog from "./components/common/loading"

class Home extends Component {
  static contextType = AuthContext;

  constructor(props, context) {
    super(props, context);
    this.login = this.login.bind(this);
  }

  async login() {
    const { loginUserContext } = this.context;
    loginUserContext();
  }

  gotoSignUp = () => {
    let path = `/signup`;
    this.props.history.push(path);
  }

  render() {
    const { authenticated, userInfo } = this.context;
    
    return (
      <div>
        { authenticated &&
          <div style={{ marginTop: 15 }}>
            <h2>Welcome back, {userInfo ? userInfo.name : 'Unknown User Name'}!</h2>
            <p>
              You have successfully logged in!  You now have an ID token and access token in local storage.
                  Visit the <Link to="/profile">My Profile</Link> page to take a look inside the ID token.
                </p>

            <FeaturesCards />
          </div>
        }
        
        {typeof(authenticated) === "object" && !authenticated && <LoadingDialog />}
        
        { typeof(authenticated) === "boolean" && authenticated === false && <div style={{ marginTop: 25 }}>
          <div className="row">
            <div className="col-md-12 col-lg-7 text-center text-md-left pr-md-5">
              <h1 className="mb-3 bd-text-purple-bright">OpsERA</h1>
              <p className="lead">
                Make DevOps a streamlined, managed experience, allowing developers to focus on what they enjoy doing most: writing code!
                </p>
              <p className="lead mb-4">
                OpsERA is an end to end DevOps Workflow Solution that can manage all of the tasks and resources for a team’s CI/CD Pipeline automatically, allowing for a single pane of glass view on the entire DevOps workflow including easy to use interfaces and advanced, consolidated error reporting and usage and optimization reporting.
                </p>
              <div className="row mx-n2">
                <div className="col-md px-2">
                  <Button variant="success" className="btn-lg w-100 mb-3" onClick={this.gotoSignUp}>Sign Up</Button>
                </div>
                <div className="col-md px-2">
                  <Button variant="outline-success" className="btn-lg w-100 mb-3" onClick={this.login}>Log In</Button>
                </div>
              </div>
            </div>

            <div className="d-none d-lg-inline col-5 mx-auto">
              <img src="/img/opsera_logo_large.png" width="375" alt="" />
            </div>
          </div>
        </div>
      }

      </div >
    );
  }
}

export default Home;
