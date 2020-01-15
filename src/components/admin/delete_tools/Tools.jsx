import React, { Component } from "react";
//import { connect } from "react-redux";
import { Button, Modal, Table } from "react-bootstrap";
//import { getApps } from "../../../actions/thunk";

import { AuthContext } from "../../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../../api/apiService";
import ErrorDialog from "../../common/error";

class Tools extends Component {
    state = {}

    render() {
      const {application} = this.props;
      console.log({application});
  
      if (!application)
        return (
          <div className="app-info-container">
            <p>choose application from above</p>
          </div>
        );
  
      const tools = application.tools.filter(tool => tool.toolStatus === "ACTIVE");
  
      if (!tools || !tools.length) {
        return (
          <div className="app-info-container">
            <p>No active tools</p>
          </div>
        );
      }
  
      return (
        <div className="app-info-container">
          {tools.map((tool, key) => (
            <ToolTable tool={tool} key={key} />
          ))}
        </div>
      );
    }
}
  
class ToolTable extends React.PureComponent {
    static contextType = AuthContext; 
    constructor(props, context) {
      super(props, context);
      this.state = {
        confirm: false, 
        tool: this.props.tool,
        fetching: false,
        error: null,
        messages: null,
        application: null
      }; 
    }
    
    handleDeletePress = () => this.setState({confirm: true})
    handleCancel = () => this.setState({confirm: false})
  
    handleConfirm = () => {
      const {tool} = this.props;
      this.setState({confirm: false});
      this.deleteTool(tool);
    }
  
    deleteTool = async tool => {
      const { getAccessToken } = this.context;  //this.context is where all data from the above AuthContext component resides.  It's like the state props design wise
      const accessToken = await getAccessToken();
      this.delToolData(accessToken, tool);
      
    }

    delToolData(accessToken, tool) { 
      console.log(tool);
      // this.setState({loading: true, tool: null})
      const apiCall = new ApiService("/tools", {id: tool._id}, accessToken);
      let currentComponent = this;
      apiCall.delete()
        .then(function (response) {
          currentComponent.setState({
            data: response.data,
            error: null,
            fetching: false
          });
        })
        .catch(function (error) {
          currentComponent.setState({
            error: error,
            fetching: false
          });
        });

    }
  
    render() {
      const {tool} = this.state;
      // eslint-disable-next-line no-unused-vars
      const { data, error, fetching } = this.state;
      
      if (!tool) return null;
  
      const {name, port} = tool;
      return (
        <>
          {error ? <ErrorDialog error={error} /> : null}
       
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <tr>
                    {name}
                  </tr>
                </th>
                <th>
                  <tr>
                    <Button variant="danger" onClick={this.handleDeletePress}>Delete</Button>
                  </tr>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PORT</td>
                <td>{port}</td>
              </tr>
            </tbody>
          </Table>
    
          <Modal show={this.state.confirm} onHide={this.handleCancel}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Warning! Data cannot be recovered once Tool is deleted. Do you still want to proceed?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCancel}>
                Cancel
              </Button>
              <Button variant="danger" onClick={this.handleConfirm}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>

        </>
      );
    }
}
  
// const ToolTable = connect(
//   null,
//   {getApps},
// )(toolTable);
  
export default Tools;
  