import React from "react";
import ReleaseManagementServices from "./ReleaseManagementServices";
import { RMContext, RMProvider } from "./RMContext";
import { Container, Form, Button } from "react-bootstrap";
import RMModal from "./RMModal";
import ErrorDialog from "../common/error";
import SuccessDialog from "../common/success";
import { isAlphaNumeric, handleError } from "../../helpers";
import { ApiService } from "../../api/apiService";
import "./styles.css";

class Pipeline extends React.PureComponent {
  static contextType = RMContext
  state = {
    appname: "",
    appnameError: null,
    fetching: true,
    data: {},
    tools: [],
    error: null,
    messages: null,
    editTools: false
  }

  handleAppNameChange = ({ target: { name, value } }) => {
    let error = null;
    if (value.length > 10) error = "App Name has to be 10 chars or less";
    if (value.length > 1 && !isAlphaNumeric(value))
      error = "App Name has to be alphanumeric";

    this.setState({
      [name]: value,
      appnameError: error,
    });
  }

  createClick = async (e) => {
    e.preventDefault();

    this.setState({
      checkingAppName: true,
    });
    //TODO: Fix the user issue, it's defined in context but not used
    // eslint-disable-next-line no-unused-vars
    const { token, user, appname, setAppDetails } = this.context;

    console.log("clicked2")
    let postBody = { userid: user.sub, name: appname };
    console.log(postBody);
    let currentComponent = this;
    new ApiService(
      "/applications/create",
      null,
      token,
      postBody).post()
      .then(function (response) {
        setAppDetails(response.data);
        currentComponent.setState({
          resData: response.data,
          appNameValid: true,
          checkingAppName: false,
          error: null,
          messages: "Application is successfully created!",
          status: "success"
        });
      })
      .catch(function (error) {
        let message = handleError(error);
        currentComponent.setState({
          appNameValid: false,
          checkingAppName: false,
          error: error,
          messages: message ? message : "Error reported accessing API.",
          status: "failed"
        });
      });
  }

  renderInput = () => {
    const { appname, appnameError, handleChange } = this.context;
    return (
      <Form.Row>
        <Form.Group controlId="formGridName">
          <Form.Label>Application Name</Form.Label>
          <Form.Control
            type="text"
            name="appname" placeholder="Application Name"
            value={appname}
            onChange={handleChange}
            isInvalid={appnameError}
          />
          <Form.Control.Feedback type="invalid">{appnameError}</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
    );
  }
  render() {
    const { checkingAppName, appnameError, appname, handleCreateClick } = this.context;
    const { error, messages, status, fetching } = this.state;

    return (
      <Container className="NewApplication">
        <h2>CI/CD Pipeline</h2>
        {error ? <ErrorDialog error={error} /> : null}
        {status === "success" ? <SuccessDialog successMessage={messages} /> : (
          <>
            <Form loading={checkingAppName}>
              {this.renderInput()}
              <Button
                variant="primary"
                type="submit"
                onClick={this.createClick}
                disabled={!!appnameError || !appname || !appname.length}
              >
                Create
              </Button>
            </Form>
          </>
        )}


        {this.state.status === "success" && <ReleaseManagementServices />}
        <RMModal />
      </Container>
    );
  }
}

export default Pipeline;