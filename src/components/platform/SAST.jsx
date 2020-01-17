import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { NewAppContext } from "./context";

class SAST extends React.PureComponent {
  static contextType = NewAppContext
  handleLogoClick = () => {
    const { setState } = this.context;
    const { tools } = this.props;
    setState({
      open: !tools.includes("SonarQube"),
      category: "SASST",
      service: "SonarQube",
    });
  }
  render() {
    const { tools } = this.props;
    return (
      <Card style={{ minWidth: "16rem" }}>
        <Card.Body className="text-center">
          <Card.Title>Code Security</Card.Title>
          
          <Card.Text>
            <div
              className={`newApp__service-logo ${tools.includes("SonarQube") ? "newApp__service-logo--alredy-installed" : ""}`}
              onClick={this.handleLogoClick}
            >
              <img src={require("./imgs/sonar.png")} />
              <span className="newApp__service-title">SonarQube</span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

SAST.propTypes = {
  tools: PropTypes.object
};

export default SAST;
