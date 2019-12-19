import React, { Component } from 'react'
import { Button, Form, Card, Alert } from 'react-bootstrap';
import axios from "axios"
import {apiConnectorURL} from "../../../config"

export default class GitHub extends Component {
    state = {
        username: "",
        token: "",
        repo: "",
        jenkinUrl: "",
        jenkinUsername: "",
        jenkinPassword: "",
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
            jenkinUrl: "",
            jenkinUsername: "",
            jenkinPassword: "",
            job: "",
        })
      }
    
    canBeSubmitted() {
        const {
            username,
            token,
            repo,
            jenkinUrl,
            jenkinUsername,
            jenkinPassword,
            job,
        } = this.state
        return (
            username.length > 0 &&
            token.length > 0 &&
            repo.length > 0 &&
            jenkinUrl.length > 0 &&
            jenkinUsername.length > 0 &&
            jenkinPassword.length > 0 &&
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

                    <Form.Group>
                        <Card.Header as="h5">Jenkins Credentials</Card.Header>
                    </Form.Group>
                    
                    <Form.Group controlId="formGridjenkinUrl">
                        <Form.Label>Jenkins URL</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder=""  
                            name="jenkinUrl"
                            value={this.state.jenkinUrl}
                            onChange={this.handleChange}
                            // isInvalid={this.state.jenkinUrl.error}
                        />
                        {/* <Form.Control.Feedback type="invalid">{this.state.jenkinUrl.error}</Form.Control.Feedback> */}
                    </Form.Group>

                    <Form.Group controlId="formGridjenkinUsername">
                        <Form.Label>Jenkins Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder=""  
                            name="jenkinUsername"
                            value={this.state.jenkinUsername}
                            onChange={this.handleChange}
                            // isInvalid={this.state.jenkinUsername.error}
                        />
                        {/* <Form.Control.Feedback type="invalid">{this.state.jenkinUsername.error}</Form.Control.Feedback> */}
                    </Form.Group>

                    <Form.Group controlId="formGridjenkinPassword">
                        <Form.Label>Jenkins Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder=""  
                            name="jenkinPassword"
                            value={this.state.jenkinPassword}
                            onChange={this.handleChange}
                            // isInvalid={this.state.jenkinPassword.error}
                        />
                        {/* <Form.Control.Feedback type="invalid">{this.state.jenkinPassword.error}</Form.Control.Feedback> */}
                    </Form.Group>

                    <Form.Group controlId="formGridJob">
                        <Form.Label>Job Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder=""  
                            name="job"
                            value={this.state.job}
                            onChange={this.handleChange}
                            // isInvalid={this.state.job.error}
                        />
                        {/* <Form.Control.Feedback type="invalid">{this.state.job.error}</Form.Control.Feedback> */}
                    </Form.Group>
                    
                    <Button id="save-button" disabled={!isEnabled} variant="primary" className="mr-2" type="submit">Save</Button>
                    </Form>
                </Card.Text>
                </Card.Body>
            </Card>
            </div>
        )
    }
}
