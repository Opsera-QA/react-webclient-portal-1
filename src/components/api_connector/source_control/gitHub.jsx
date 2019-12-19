import React, { Component } from 'react'
import { Button, Form, Col, Card, Alert } from 'react-bootstrap';
import axios from "axios"
import {apiConnectorURL} from "../../../config"

export default class GitHub extends Component {
    state = {
        username: "",
        token: "",
        repo: "",
        jenkinsUrl: "",
        jenkinsPort: "",
        jenkinsUsername: "",
        jenkinsPassword: "",
        job: "",
        modal: false,
      }
    
      handleChange = ({target: {name, value}}) => {
        this.setState({
          [name]: value,
        })
      }
    
      handleSave = async (e) => {
        e.preventDefault();
        await axios.post(apiConnectorURL.toString()+"/github/createHook", { data: this.state })
         .then((res) =>{
            console.log(res)
            this.showSuccessAlert() 
         })
         .catch(e => {
            //  console.log(e)   
             this.showErrorAlert() 
         })
      }

      showSuccessAlert = () => {
        this.setState({
          modal: true,
          type: "success",
          title:"Success!",
          message: "API Connector Created Successfully!"
        }, ()=>{this.resetForm()})
      }

      showErrorAlert = () => {
        this.setState({
          modal: true,
          type: "danger",
          title:"Error!",
          message:"Error in creating API Connector. Please check the credentials or contact Administrator for more details."
        })
      }

      resetForm = () => {
        this.setState({
            username: "",
            token: "",
            repo: "",
            jenkinsUrl: "",
            jenkinsPort: "",
            jenkinsUsername: "",
            jenkinsPassword: "",
            job: "",
        })
      }
    
    canBeSubmitted() {
        const {
            username,
            token,
            repo,
            jenkinsUrl,
            jenkinsPort,
            jenkinsUsername,
            jenkinsPassword,
            job,
        } = this.state
        return (
            username.length > 0 &&
            token.length > 0 &&
            repo.length > 0 &&
            jenkinsUrl.length > 0 &&
            jenkinsPort.length>0 &&
            jenkinsUsername.length > 0 &&
            jenkinsPassword.length > 0 &&
            job.length > 0
        )
    }

    render() {
        const isEnabled = this.canBeSubmitted()
        return (
            <div>
            { this.state.modal &&  
              <Alert variant={this.state.type} onClose={() => this.setState({modal:false, type:"", title:"" ,message: ""})} dismissible>
                <Alert.Heading>{this.state.title}</Alert.Heading>
                <p>
                    {this.state.message}
                </p>
              </Alert> 
            }
            <Card style={{ marginTop: 25 }}>
                <Card.Header as="h5">Github Credentials</Card.Header>
                <Card.Body>
                {/* <Card.Title>Special title treatment</Card.Title> */}
                <Card.Text>

                    <Form onSubmit={this.handleSave}>

                    <Form.Group controlId="formGridUsername">
                        <Form.Label>Github Username</Form.Label>
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

                    <Form.Group controlId="formGridToken">
                        <Form.Label>Github Token</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder=""  
                            name="token"
                            value={this.state.token}
                            onChange={this.handleChange}
                            // isInvalid={this.state.token.error}
                        />
                        {/* <Form.Control.Feedback type="invalid">{this.state.token.error}</Form.Control.Feedback> */}
                    </Form.Group>

                    <Form.Group controlId="formGridRepo">
                        <Form.Label>Github Repo Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder=""  
                            name="repo"
                            value={this.state.repo}
                            onChange={this.handleChange}
                            // isInvalid={this.state.repo.error}
                        />
                        {/* <Form.Control.Feedback type="invalid">{this.state.repo.error}</Form.Control.Feedback> */}
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
                    <Button id="cancel-button" variant="outline-secondary" className="mr-2" type="button">Cancel</Button>
                    </Form>
                </Card.Text>
                </Card.Body>
            </Card>
            </div>
        )
    }
}
