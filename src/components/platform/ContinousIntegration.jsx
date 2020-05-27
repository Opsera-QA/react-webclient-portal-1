import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { NewAppContext } from "./context";

function ContinousIntegration(props) {

  const { setState } = useContext(NewAppContext);
  const { tools } = props;

  return (
    <>
      <Card style={{ minWidth: "16rem" }}>
        <Card.Body className="text-center">
          <Card.Title>Continuous Integration</Card.Title>
          <Card.Text>
            <div
              className={`newApp__service-logo ${tools.includes("Jenkins") ? "newApp__service-logo--alredy-installed" : ""}`}
              onClick={() =>
                setState({
                  open: !tools.includes("Jenkins"),
                  category: "Continous Integration And Deployment",
                  service: "Jenkins",
                })
              }
            >
              <img src={require("./imgs/jenkins.png")} alt="Jenkins" />
              <span className="newApp__service-title">Jenkins</span>
            </div>

            <div
              className="newApp__service-logo newApp__service-logo--disabled"
              onClick={() =>
                setState({
                  // open: true,
                  category: "Continous Integration And Deployment",
                  service: "Team City",
                })
              }
            >
              <img src={require("./imgs/team-city.png")} alt="Team City"/>
              <span className="newApp__service-title">Team City</span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
} 

ContinousIntegration.propTypes = {
  tools: PropTypes.array
};

export default ContinousIntegration;
