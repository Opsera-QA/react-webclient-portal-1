import React, { Component } from "react";
import { Button, Form, Col, Card, Alert } from "react-bootstrap";
import axios from "axios";
import {apiConnectorURL} from "../../../config";

class Jira extends Component {
    state = {
      url: "",
      port: "",
      username: "",
      password: "",
      jenkinsUrl: "",
      jenkinsPort: "",
      jenkinsUsername: "",
      jenkinsPassword: "",
      projectName: "",
      modal: false,
    }

      handleChange = ({target: {name, value}}) => {
        this.setState({
          [name]: value,
        });
      }
    
      //TODO: THESE NEED TO BE UPDATED TO USE THE API SERVICE
    handleSave = async (e) => {
      e.preventDefault();
      await axios.post(apiConnectorURL.toString()+"jira/trigger", { data: this.state })
        .then((res) =>{
          console.log(res);
          this.showSuccessAlert(); 
        })
        .catch(e => {
          //  console.log(e)   
          this.showErrorAlert(); 
        });
    }

      showSuccessAlert = () => {
        this.setState({
          modal: true,
          type: "success",
          title:"Success!",
          message: "API Connector Created Successfully!"
        }, ()=>{this.resetForm();});
      }

      showErrorAlert = () => {
        this.setState({
          modal: true,
          type: "danger",
          title:"Error!",
          message:"Error in creating API Connector. Please check the credentials or contact Administrator for more details."
        });
      }

      resetForm = () => {
        this.setState({
          url: "",
          port: "",
          username: "",
          password: "",
          jenkinsUrl: "",
          jenkinsPort: "",
          jenkinsUsername: "",
          jenkinsPassword: "",
          projectName: "",
        });
      }
      
      canBeSubmitted() {
        const {
          url,
          port,
          username,
          password,
          jenkinsUrl,
          jenkinsPort,
          jenkinsUsername,
          jenkinsPassword,
          projectName,
        } = this.state;
        return (
          url.length > 0 &&
            port.length > 0 &&
            username.length > 0 &&
            password.length > 0 &&
            jenkinsUrl.length > 0 &&
            jenkinsPort.length>0 &&
            jenkinsUsername.length > 0 &&
            jenkinsPassword.length > 0 &&
            projectName.length > 0
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
          { this.state.modal &&  
            <Alert variant={this.state.type} onClose={() => this.setState({modal:false, type:"", title:"", message: ""})} dismissible>
              <Alert.Heading>{this.state.title}</Alert.Heading>
              {this.state.message}
            </Alert> 
          }
          <Card style={{ marginTop: 25 }}>
            <Card.Header as="h5">Jira Credentials</Card.Header>
            <Card.Body>

              <Form onSubmit={this.handleSave}>
                    
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridJiraURL">
                    <Form.Label>Jira URL</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="" 
                      name="url"
                      value={this.state.url}
                      onChange={this.handleChange}
                      // isInvalid={this.state.url.error}
                    />
                    {/* <Form.Control.Feedback type="invalid">{this.state.url.error}</Form.Control.Feedback> */}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridJiraPort">
                    <Form.Label>Jira Port</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="" 
                      name="port"
                      value={this.state.port}
                      onChange={this.handleChange} 
                      // isInvalid={this.state.port.error}
                    />
                    {/* <Form.Control.Feedback type="invalid">{this.state.port.error}</Form.Control.Feedback> */}
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridJiraUsername">
                    <Form.Label>Jira Username</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="" 
                      name="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      // isInvalid={this.state.username.error} 
                    />
                    {/* <Form.Control.Feedback type="invalid">{this.state.username.error}</Form.Control.Feedback> */}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridJiraPassword">
                    <Form.Label>Jira Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="" 
                      name="password"
                      value={this.state.password.value}
                      onChange={this.handleChange}
                      // isInvalid={this.state.password.error} 
                    />
                    {/* <Form.Control.Feedback type="invalid">{this.state.password.error}</Form.Control.Feedback> */}
                  </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridJiraProjectName">
                  <Form.Label>Jira Project Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder=""  
                    name="projectName"
                    value={this.state.projectName}
                    onChange={this.handleChange}
                    // isInvalid={this.state.projectName.error}
                  />
                  {/* <Form.Control.Feedback type="invalid">{this.state.projectName.error}</Form.Control.Feedback> */}
                </Form.Group>
                                
                <Form.Row className="pt-4">
                  <Form.Group as={Col} controlId="formGridJenkinsURL">
                    <Form.Label>Jenkins Container URL</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="" 
                      name="jenkinsUrl"
                      value={this.state.jenkinsUrl}
                      onChange={this.handleChange}
                      // isInvalid={this.state.jenkinsUrl.error}
                    />
                    <small id="passwordHelpBlock" className="form-text text-muted">
                                Jenkins container notes here.
                    </small>
                    {/* <Form.Control.Feedback type="invalid">{this.state.jenkinsUrl.error}</Form.Control.Feedback> */}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridJenkinsPort">
                    <Form.Label>Jenkins Port</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="" 
                      name="jenkinsPort"
                      value={this.state.jenkinsPort}
                      onChange={this.handleChange} 
                      // isInvalid={this.state.jenkinsPort.error}
                    />
                    {/* <Form.Control.Feedback type="invalid">{this.state.jenkinsPort.error}</Form.Control.Feedback> */}
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridJenkinsUsername">
                    <Form.Label>Jenkins Username</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="" 
                      name="jenkinsUsername"
                      value={this.state.jenkinsUsername}
                      onChange={this.handleChange}
                      // isInvalid={this.state.jenkinsUsername.error} 
                    />
                    {/* <Form.Control.Feedback type="invalid">{this.state.jenkinsUsername.error}</Form.Control.Feedback> */}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridJenkinsPassword">
                    <Form.Label>Jenkins Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="" 
                      name="jenkinsPassword"
                      value={this.state.jenkinsPassword}
                      onChange={this.handleChange}
                      // isInvalid={this.state.jenkinsPassword.error} 
                    />
                    {/* <Form.Control.Feedback type="invalid">{this.state.jenkinsPassword.error}</Form.Control.Feedback> */}
                  </Form.Group>
                </Form.Row>

                <Button id="save-button" disabled={!isEnabled} variant="primary" className="mr-2" type="submit">Save</Button>
                <Button id="cancel-button" variant="outline-secondary" className="mr-2" type="button" onClick={this.cancel}>Cancel</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      );
    }
} 

export default Jira;
