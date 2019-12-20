import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Button, Form, Card, Alert } from 'react-bootstrap';
import axios from "axios"
import {apiConnectorURL} from "../../../config"

export default withRouter ( class slack extends Component {
    state = {
        endpoint: "",
        token: "",
        modal: false,
      }

      handleChange = ({target: {name, value}}) => {
        this.setState({
          [name]: value,
        })
      }
    
    handleSave = async (e) => {
        e.preventDefault();
        // TODO :: change endpoint
        await axios.post(apiConnectorURL.toString()+"", { data: this.state })
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
            endpoint: "",
            token: "",
        })
      }
      
    canBeSubmitted() {
        const {
            endpoint,
            token,
        } = this.state
        return (
            endpoint.length > 0 &&
            token.length > 0
        )
    }
    
  cancel = () => {
    let path = `/api_connector`;
    this.props.history.push(path);
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
                <Card.Header as="h5">Slack Credentials</Card.Header>
                <Card.Body>
                {/* <Card.Title>Special title treatment</Card.Title> */}
                <Card.Text>

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

                    

                    <Button id="save-button" disabled variant="primary" className="mr-2" type="submit">Save</Button>
                    <Button id="cancel-button" variant="outline-secondary" className="mr-2" type="button" onClick={this.cancel}>Cancel</Button>
                    </Form>
                </Card.Text>
                </Card.Body>
            </Card>
            </div>
        )
    }
} )