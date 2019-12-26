import React, { Component } from 'react'
import { connect } from "react-redux"
import { Alert, Button, Modal, Table } from 'react-bootstrap';
import { getApps } from "../../actions/thunk"
import { api2 } from "../../api"

class Tools extends Component {
    state = {}

    render() {
      const {application} = this.props
      console.log({application})
  
      if (!application)
        return (
          <div className="app-info-container">
            <p>choose application from above</p>
          </div>
        )
  
      const tools = application.tools.filter(tool => tool.toolStatus === "ACTIVE")
  
      if (!tools || !tools.length) {
        return (
          <div className="app-info-container">
            <p>No active tools</p>
          </div>
        )
      }
  
      return (
        <div className="app-info-container">
          {tools.map((tool, key) => (
            <ToolTable tool={tool} key={key} />
          ))}
        </div>
      )
    }
  }
  
  class toolTable extends React.PureComponent {
    state = {confirm: false, tool: this.props.tool}
    handleDeletePress = () => this.setState({confirm: true})
    handleCancel = () => this.setState({confirm: false})
  
    handleConfirm = () => {
      const {tool} = this.props
      this.setState({confirm: false})
      this.deleteTool(tool)
    }
  
    deleteTool = async tool => {
      const {getApps} = this.props
      this.setState({loading: true, tool: null})
  
      try {
        await api2({
          endpoint: "/tools",
          method: "DELETE",
          withToken: true,
          body: {id: tool._id},
        })
        await getApps()
      } catch (error) {
        console.log(error)
      }
      this.setState({loading: false})
    }
  
    render() {
      const {tool} = this.state
      if (!tool) return null
  
      const {name, port} = tool
      return (
        <>
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
      )
    }
  }
  
  const ToolTable = connect(
    null,
    {getApps},
  )(toolTable)
  
  export default Tools
  