import React from "react";
import ReleaseManagementServices from "./ReleaseManagementServices";
import { RMContext, RMProvider } from "./RMContext";
import { Container, Form, Button } from "react-bootstrap";
import RMModal from "./RMModal";
import "./styles.css";

class Pipeline extends React.PureComponent {
  static contextType = RMContext
  state = {}

  renderInput = () => {
    const { appname, appnameError, handleChange } = this.context;
    return (
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
    );
  }
  render() {
    const { checkingAppName, appnameError, appname, handleCreateClick } = this.context;
    return (
      <Container className="NewApplication">
        <h2>CI/CD Pipeline</h2>
        <Form loading={checkingAppName}>
          {this.renderInput()}
          <Button
            variant="primary"
            type="submit"
            onClick={handleCreateClick}
            disabled={!!appnameError || !appname || !appname.length}
          >
            Create
          </Button>
        </Form>
        {this.context.appNameValid === true && <ReleaseManagementServices />}
        <RMModal />
      </Container>
    );
  }
}

export default Pipeline;