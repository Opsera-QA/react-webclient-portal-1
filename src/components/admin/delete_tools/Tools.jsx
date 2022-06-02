/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import { AuthContext } from "../../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../../api/apiService";
import ErrorDialog from "../../common/status_notifications/error";
import Modal from "../../common/modal/modal";

// TODO: Rewrite or delete
class Tools extends Component {
  state = {};

  render() {
    const { application } = this.props;
    console.log({ application });

    if (!application)
      return (
        <div className="app-info-container">
          <p>choose application from above</p>
        </div>
      );

    const tools = application.tools; //.filter(tool => tool.toolStatus === "ACTIVE");

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

  handleDeletePress = () => this.setState({ confirm: true });
  handleCancel = () => this.setState({ confirm: false });

  handleConfirm = () => {
    const { tool } = this.props;
    this.setState({ confirm: false });
    this.deleteTool(tool);
  };

  deleteTool = async tool => {
    const { getAccessToken } = this.context;  //this.context is where all data from the above AuthContext component resides.  It's like the state props design wise
    const accessToken = await getAccessToken();
    this.delToolData(accessToken, tool);

  };

  delToolData(accessToken, tool) {
    console.log(tool);
    // this.setState({loading: true, tool: null})
    const apiCall = new ApiService("/tools", null, accessToken, { id: tool._id });
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

  isDisabled = (status) => {
    if (status === "TERMINATED")
      return true;
    else
      return false;
  };

  render() {
    const { tool } = this.state;
    // eslint-disable-next-line no-unused-vars
    const { data, error, fetching } = this.state;

    if (!tool) return null;
    console.log(tool);
    const { name, port, toolStatus, installationDate, _id, toolURL } = tool;
    return (
      <>
        {error ? <ErrorDialog error={error} /> : null}

        {this.state.confirm ? <Modal header="Confirm Delete"
          message="Warning! Data cannot be recovered once a tool is deleted. Do you still want to proceed?"
          button="Confirm"
          handleCancelModal={this.handleCancel}
          handleConfirmModal={this.handleConfirm} /> : null}

        <div className="p-2 mt-2">
          <div className="row mt-1">
            <div className="col-md col-header-text">{name}</div>
            <div className="col-md"><span className="text-muted">Installed On:</span> {format(new Date(installationDate), "yyyy-MM-dd', 'hh:mm a")}</div>
            <div className="col-md" style={{ textAlign: "right" }}><Button disabled={this.isDisabled(tool.toolStatus)} variant="danger" onClick={this.handleDeletePress}>Delete</Button></div>
          </div>
          <div className="row">
            <div className="col-md"><span className="text-muted">Status:</span> {toolStatus}</div>
            <div className="col-md"><span className="text-muted">ID:</span> {_id}</div>
            <div className="col-md"><span className="text-muted">Port:</span> {port}</div>
          </div>
          <div className="row">
            <div className="col-md"><span className="text-muted">URL:</span> {toolURL}</div>
          </div>
        </div>

        {/* <Modal show={this.state.confirm} onHide={this.handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Warning! Data cannot be recovered once a tool is deleted. Do you still want to proceed?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={this.handleConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal> */}

      </>
    );
  }
}

export default Tools;
