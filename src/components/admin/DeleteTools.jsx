import React, { Component } from 'react'
import { connect } from "react-redux"
import { Container, Form } from 'react-bootstrap';
import { getApps } from "../../actions/thunk"
import Tools from "./tools"
import LoadingDialog from "../common/loading"

class DeleteTools extends Component {
    
  state = {application: null}

  componentDidMount() {
    const {getApps} = this.props
    getApps()
  }

  handleChangeValue = (e) => {
    const {applications} = this.props
    const application = applications.find(app => app.name === e.target.value)
    this.setState({
      application,
    })
  }

  getOptionsForApp = a => ({
    value: a.name,
    text: a.name,
    key: a._id,
  })

  render() {
    const {applications} = this.props
    const loading = applications == null
    if (!applications) return null

    return (
      <Container className="DefaultDashboardPage">
        <h2>Delete Tools</h2>
      
        <Form>
            <Form.Group>
              <Form.Control as="select"
                inputRef={el => this.inputEl = el}
                hidden={(!loading && applications.length > 0) ? false : true}
                onChange={this.handleChangeValue}
                style={{ marginTop: 25 }}>
                <option value="" selected disabled>{loading ? "loading..." : "Select application"}</option>
                {!loading && (
                  <>
                    {applications.map(application => (
                      <option key={application.name} value={application.name}>{application.name}</option>
                    ))}
                  </>
                )}
              </Form.Control>
            </Form.Group>
          </Form>
        
        <Tools application={this.state.application} />
      </Container>
    )
  }
}

const mapStateToProps = ({applications}) => ({
  applications,
})

export default connect(
  mapStateToProps,
  {getApps},
)(DeleteTools)
