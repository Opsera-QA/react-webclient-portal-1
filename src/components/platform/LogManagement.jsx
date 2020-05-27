import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { NewAppContext } from "./context";

function LogManagement(props) {

  const { setState } = useContext(NewAppContext);
  const { tools } = props;

  return (
    <Card style={{ minWidth: "16rem" }}>
      <Card.Body className="text-center">
        <Card.Title>Log Management</Card.Title>
          
        <Card.Text>
          <div
            className={`newApp__service-logo ${tools.includes("ElasticSearch") ? "newApp__service-logo--alredy-installed" : ""}`}
            onClick={() =>
              setState({
                open: !tools.includes("ElasticSearch"),
                category: "Log Management",
                service: "ElasticSearch",
              })
            }
          >
            <img src={require("./imgs/elastic-search.png")} />
            <span className="newApp__service-title">ElasticSearch</span>
          </div>

          <div
            className="newApp__service-logo newApp__service-logo--disabled"
            onClick={() =>
              setState({
                // open: true,
                category: "Log Management",
                service: "LogStash",
              })
            }
          >
            <img src={require("./imgs/log-stash.png")} />
            <span className="newApp__service-title">LogStash</span>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
} 

LogManagement.propTypes = {
  tools: PropTypes.array
};

export default LogManagement;
