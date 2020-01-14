import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { NewAppContext } from "./context";

class Monitoring extends React.PureComponent {
  static contextType = NewAppContext
  render() {
    const { setState } = this.context;
    const { tools } = this.props;
    return (
      <Card style={{ minWidth: "16rem" }}>
        <Card.Body className="text-center">
          <Card.Title>Monitoring</Card.Title>
          
          <Card.Text>
            <div
              className={`newApp__service-logo ${tools.includes("Nagios") ? "newApp__service-logo--alredy-installed" : ""}`}
              onClick={() =>
                setState({
                  open: !tools.includes("Nagios"),
                  category: "Monitoring",
                  service: "Nagios",
                })
              }
            >
              <img src={require("./imgs/nagios.png")} />
              <span className="newApp__service-title">Nagios</span>
            </div>

            <div
              className="newApp__service-logo newApp__service-logo--disabled"
              onClick={() =>
                setState({
                  // open: true,
                  category: "Monitoring",
                  service: "ZooKeeper",
                })
              }
            >
              <img src={require("./imgs/zookeeper.png")} />
              <span className="newApp__service-title">ZooKeeper</span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

Monitoring.propTypes = {
  tools: PropTypes.object
};

export default Monitoring;
