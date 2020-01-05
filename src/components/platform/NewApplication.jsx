import React from "react"
import { Form, Container, Button } from 'react-bootstrap'
import ConfigurationManagement from "./ConfigurationManagement"
import ContinousIntegration from "./ContinousIntegration"
import LogManagement from "./LogManagement"
import RepositoryManagement from "./RepositoryManagement"
import SAST from "./SAST"
import Monitoring from "./Monitoring"
import Confirmation from "./Confirmation"
import { NewAppContext } from "./context"
import { isAlphaNumeric } from "../../helpers"
import { ApiService } from '../../api/apiService'
import ErrorDialog from "../common/error"
import { handleError } from "../../helpers"

class NewApplication extends React.PureComponent {
  static contextType = NewAppContext

  state = {
    appname: "",
    appnameError: null,
    fetching: true,
    error: null,
    messages: null
  }

  handleAppNameChange = ({ target: { name, value } }) => {
    let error = null
    if (value.length > 10) error = "App Name has to be 10 chars or less"
    if (value.length > 1 && !isAlphaNumeric(value))
      error = "App Name has to be alphanumeric"

    this.setState({
      [name]: value,
      appnameError: error,
    })
  }

  handleCreateClick = async (e) => {
    e.preventDefault()
    const { token, user } = this.context;
    console.log("handling it!")

    if (this.state.appname.trim().length < 1) {
      this.setState({ appnameError: true });
      return;
    }

    this.setState({
      checkingAppName: true,
    })

    let postBody = { userid: user.sub, name: this.state.appname };
    let currentComponent = this;
    new ApiService(
      '/applications/create',
      null,
      token,
      postBody).post()
      .then(function (response) {
        currentComponent.setState({
          data: response.data,
          error: false,
          messages: 'API call was successful!'
        });
      })
      .catch(function (error) {
        let message = handleError(error);
        currentComponent.setState({
          error: true,
          messages: message ? message : 'Error reported accessing API.'
        });
      })
      .finally(function () {
        currentComponent.setState({ fetching: false });
        currentComponent.setState({
          appnameError: false,
          checkingAppName: false,
        })
        currentComponent.context.setState(ps => ({
          ...ps,
          appname: currentComponent.state.appname,
        }))
      });
  }

  renderInput = () => {
    const { appname, appnameError } = this.state
    return (
      <Form.Row>
        <Form.Group controlId="formGridName">
          <Form.Label>Application Name</Form.Label>
          <Form.Control
            type="text"
            name="appname" placeholder=""
            value={appname}
            onChange={this.handleAppNameChange}
            isInvalid={appnameError}
          />
          <Form.Control.Feedback type="invalid">{appnameError}</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
    )
  }

  render() {
    const { checkingAppName, appnameError, appname, error, messages } = this.state
    const { saving } = this.context
    return (
      <Container className="NewApplication">
        <h3>Register New Application</h3>
        <p>Create a new Application to leverage your existing systems in any way that meets your business needs</p>
        {error ? <ErrorDialog errorMessage={messages} /> : null}
        <Form loading={checkingAppName || saving}>
          {this.renderInput()}
          <Button
            primary
            type="submit"
            onClick={this.handleCreateClick}
            loading={checkingAppName}
            disabled={!!appnameError || !appname || !appname.length}
          >
            Create
          </Button>
        </Form>
        {appnameError === "false" && (
          <div>
            <div className="newApp__cards-container">
              <ConfigurationManagement />
              <SAST />
              <ContinousIntegration />
              <LogManagement />
              <RepositoryManagement />
              <Monitoring />
              <Confirmation />
            </div>
          </div>
        )}
      </Container>
    )
  }
}

export default NewApplication
