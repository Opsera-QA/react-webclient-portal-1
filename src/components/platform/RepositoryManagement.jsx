import React from "react";
import { Card } from "react-bootstrap";
import { NewAppContext } from "./context";

class RepositoryManagement extends React.PureComponent {
  static contextType = NewAppContext

  render() {
    return (
      <Card style={{ minWidth: "16rem" }}>
        <Card.Body className="text-center">
          <Card.Title>Repository Management</Card.Title>
          
          <Card.Text>
            <div className="newApp__service-logo newApp__service-logo--disabled">
              <img src={require("./imgs/artifactory.png")} alt="artifactory" />
              <span className="newApp__service-title">ArtiFactory</span>
            </div>

            <div className="newApp__service-logo newApp__service-logo--disabled">
              <img src={require("./imgs/nexus.png")} alt="nexus"/>
              <span className="newApp__service-title">Nexus</span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default RepositoryManagement;
