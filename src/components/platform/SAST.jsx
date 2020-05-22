import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { NewAppContext } from "./context";

function SAST(props) {

  const { setState } = useContext(NewAppContext);
  const { tools } = props;

  const  handleLogoClick = () => {
    setState({
      open: !tools.includes("SonarQube"),
      category: "SASST",
      service: "SonarQube",
    });
  };

  return (
    <Card style={{ minWidth: "16rem" }}>
      <Card.Body className="text-center">
        <Card.Title>Code Security</Card.Title>
          
        <Card.Text>
          <div
            className={`newApp__service-logo ${tools.includes("SonarQube") ? "newApp__service-logo--alredy-installed" : ""}`}
            onClick={handleLogoClick}
          >
            <img src={require("./imgs/sonar.png")} />
            <span className="newApp__service-title">SonarQube</span>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
} 

SAST.propTypes = {
  tools: PropTypes.array
};

export default SAST;