import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

import { NewAppContext } from "./context";

class ConfigurationManagement extends React.PureComponent {
  static contextType = NewAppContext

  render() {
    const { setState } = this.context;
    const { tools } = this.props;
    return (
      <Card style={{ minWidth: "16rem" }}>
        <Card.Body className="text-center">
          <Card.Title>Configuration Management</Card.Title>
          
          <Card.Text>
            <div
              className={`newApp__service-logo ${tools.includes("Ansible") ? "newApp__service-logo--alredy-installed" : ""}`}
              onClick={() =>
                setState({
                  open: !tools.includes("Ansible"),
                  category: "Configuration Management",
                  service: "Ansible",
                })
              }
            >
              <img src={require("./imgs/ansible.png")} />
              <span className="newApp__service-title">Ansible</span>
            </div>

            <div
              className="newApp__service-logo newApp__service-logo--disabled"
              onClick={() =>
                setState({
                // open: true,
                  category: "Configuration Management",
                  service: "Chef",
                })
              }
            >
              <img src={require("./imgs/chef.png")} />
              <span className="newApp__service-title">Chef</span>
            </div>

            <div
              className="newApp__service-logo newApp__service-logo--disabled"
              onClick={() =>
                setState({
                // open: true,
                  category: "Configuration Management",
                  service: "Puppet",
                })
              }
            >
              <img src={require("./imgs/puppet.png")} />
              <span className="newApp__service-title">Puppet</span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

ConfigurationManagement.propTypes = {
  tools: PropTypes.object
};

export default ConfigurationManagement;
