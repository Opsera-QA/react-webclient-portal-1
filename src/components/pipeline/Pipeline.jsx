import React, { PureComponent } from 'react';
import ReleaseManagementServices from "./ReleaseManagementServices"
import {RMContext, RMProvider} from "./RMContext"
import { Container, Form, Button } from 'react-bootstrap';
import RMModal from "./RMModal"
import "./styles.css"

// class Pipeline extends Component {

//   render () {
//     return (
//       <div>
//         <h3>Pipeline: Coming Soon</h3>
//         <div>Leverage the full benefits of OpsERA by building DevOps pipelines with security and quality gates in just 10-15 minutes. 
//           Supports multi-stack, multi-language, multi-branch, RBAC, Jenkins pipelines and Hybrid Cloud solutions with support for 
//           Container deployments, Kubernetes clusters and/or with Helm.</div>
//       </div>
//     )
//   }
// }

class Pipeline extends React.PureComponent {
  static contextType = RMContext
  state = {}

  renderInput = () => {
    const {appname, appnameError, handleChange} = this.context
    return (
      // <Input
      //   label="Application Name"
      //   placeholder="Application Name"
      //   autoComplete="off"
      //   name="appname"
      //   onChange={handleChange}
      //   value={appname}
      //   style={{maxWidth: "350px"}}
      //   error={appnameError}
      // />
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
    )
  }
  render() {
    const {checkingAppName, appnameError, appname} = this.context
    return (
      <Container className="NewApplication">
        <h2>CI/CD Pipeline</h2>
        <Form loading={checkingAppName}>
          {this.renderInput()}
          <Button
            primary
            type="submit"
            onClick={this.context.handleCreateClick}
            disabled={!!appnameError || !appname || !appname.length}
          >
            Create
          </Button>
        </Form>
        {this.context.appNameValid === true && <ReleaseManagementServices />}
        <RMModal />
      </Container>
    )
  }
}

export default () => (
  <RMProvider>
    <Pipeline />
  </RMProvider>
)
