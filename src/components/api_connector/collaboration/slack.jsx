import React, { Component } from "react";
import { Button, Form, Card, Alert } from "react-bootstrap";
import { AuthContext } from "../../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../../api/apiService";
import { apiConnectorURL } from "../../../config";

class Slack extends Component {
  static contextType = AuthContext;  //Registers the User Authentication context data in the component

  state = {
    endpoint: "",
    token: "",
    modal: false,
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }


  handleSave = async (e) => {
    e.preventDefault();
    // TODO :: change endpoint

    const { getAccessToken, getUserInfo } = this.context;
    const accessToken = await getAccessToken();
    const userInfo = await getUserInfo();
    const urlParams = { data: this.state, userid: userInfo.sub };
    new ApiService(
      apiConnectorURL + "",
      null,
      accessToken,
      urlParams).post()
      .then(response => {
        console.log(response);
        this.showSuccessAlert();
      })
      .catch(e => {
        this.showErrorAlert();
      });

  }

  showSuccessAlert = () => {
    this.setState({
      modal: true,
      type: "success",
      title: "Success!",
      message: "API Connector Created Successfully!"
    }, () => { this.resetForm(); });
  }

  showErrorAlert = () => {
    this.setState({
      modal: true,
      type: "danger",
      title: "Error!",
      message: "Error in creating API Connector. Please check the credentials or contact Administrator for more details."
    });
  }

  resetForm = () => {
    this.setState({
      endpoint: "",
      token: "",
    });
  }

  canBeSubmitted() {
    const {
      endpoint,
      token,
    } = this.state;
    return (
      endpoint.length > 0 &&
      token.length > 0
    );
  }

  cancel = () => {
    let path = "/api_connector";
    this.props.history.push(path);
  }

  render() {
    const isEnabled = this.canBeSubmitted();
    return (
      <div>
        {this.state.modal &&
          <Alert variant={this.state.type} onClose={() => this.setState({ modal: false, type: "", title: "", message: "" })} dismissible>
            <Alert.Heading>{this.state.title}</Alert.Heading>
            {this.state.message}
          </Alert>
        }
        <Card style={{ marginTop: 25 }}>
          <Card.Header as="h5">Slack Credentials</Card.Header>
          <Card.Body>

            <Form onSubmit={this.handleSave}>

              <Form.Group controlId="formGridEndpoint">
                <Form.Label>Endpoint</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="endpoint"
                  value={this.state.endpoint}
                  onChange={this.handleChange}
                // isInvalid={this.state.url.error}
                />
                {/* <Form.Control.Feedback type="invalid">{this.state.url.error}</Form.Control.Feedback> */}
              </Form.Group>

              <Form.Group controlId="formGridToken">
                <Form.Label>Auth Token</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  name="token"
                  value={this.state.token}
                  onChange={this.handleChange}
                // isInvalid={this.state.port.error}
                />
                {/* <Form.Control.Feedback type="invalid">{this.state.port.error}</Form.Control.Feedback> */}
              </Form.Group>



              <Button id="save-button" disabled variant="primary" className="mr-2" type="submit">Connect</Button>
              <Button id="cancel-button" variant="outline-secondary" className="mr-2" type="button" onClick={this.cancel}>Cancel</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Slack;