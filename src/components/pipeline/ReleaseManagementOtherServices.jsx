import React from "react";
import { Form, Button, Card, CardColumns } from "react-bootstrap";
import { RMContext } from "./RMContext";
import PropTypes from "prop-types";

class ReleaseManagementOtherServices extends React.PureComponent {
  static contextType = RMContext
  render() {
    return (
      <>
        <h3 style={{ padding: '20px' }}>Additional Serivces</h3>
        <div className="ReleaseManagementOtherServices">
          <CardColumns>
            <ConfigurationManagement app={this.props.app} tools={this.props.tools} />
            <SASST app={this.props.app} tools={this.props.tools} />
            <ContinousIntegration app={this.props.app} tools={this.props.tools} />
            <LogManagement app={this.props.app} tools={this.props.tools} />
            <RepositoryManagement app={this.props.app} tools={this.props.tools} />
            <Monitoring app={this.props.app} tools={this.props.tools} />
          </CardColumns>
        </div>
      </>
    );
  }
}

class ConfigurationManagement extends React.PureComponent {
  static contextType = RMContext
  render() {
    const { serviceClick } = this.context;
    const { tools } = this.props;

    return (
      <ServicesWrapper label="Configuration Management">
        <div
          className={`newApp__service-logo ${tools.includes("Ansible") ? "newApp__service-logo--alredy-installed" : ""}`}
          onClick={() => {
            !tools.includes("Ansible") &&
              serviceClick({
                service: "Ansible",
                category: "Configuration Management",
              })
          }

          }
        >
          <img src={require("../platform/imgs/ansible.png")} />
          <span className="newApp__service-title">Ansible</span>
        </div>

        <div
          className="newApp__service-logo newApp__service-logo--disabled"
          onClick={() => { }}
        >
          <img src={require("../platform/imgs/chef.png")} />
          <span className="newApp__service-title">Chef</span>
        </div>

        <div
          className="newApp__service-logo newApp__service-logo--disabled"
          onClick={() => { }}
        >
          <img src={require("../platform/imgs/puppet.png")} />
          <span className="newApp__service-title">Puppet</span>
        </div>
      </ServicesWrapper>
    );
  }
}

class ContinousIntegration extends React.PureComponent {
  static contextType = RMContext
  render() {
    const { serviceClick } = this.context;
    const { tools } = this.props;
    return (
      <ServicesWrapper label="Continous Integration">
        <div
          className={`newApp__service-logo ${tools.includes("Jenkins") ? "newApp__service-logo--alredy-installed" : ""}`}
          onClick={() => {
            !tools.includes("Jenkins") &&
              serviceClick({
                service: "Jenkins",
                category: "Continous Integration",
              })
          }
          }
        >
          <img src={require("../platform/imgs/jenkins.png")} />
          <span className="newApp__service-title">Jenkins</span>
        </div>

        <div
          className="newApp__service-logo newApp__service-logo--disabled"
          onClick={() => { }}
        >
          <img src={require("../platform/imgs/team-city.png")} />
          <span className="newApp__service-title">Team City</span>
        </div>
      </ServicesWrapper>
    );
  }
}

class LogManagement extends React.PureComponent {
  static contextType = RMContext
  render() {
    const { serviceClick } = this.context;
    const { tools } = this.props;
    return (
      <ServicesWrapper label="Log Management">
        <div
          className={`newApp__service-logo ${tools.includes("ElasticSearch") ? "newApp__service-logo--alredy-installed" : ""}`}
          onClick={() => {
            !tools.includes("ElasticSearch") &&
              serviceClick({
                category: "Log Management",
                service: "ElasticSearch",
              })
          }
          }
        >
          <img src={require("../platform/imgs/elastic-search.png")} />
          <span className="newApp__service-title">ElasticSearch</span>
        </div>

        <div className="newApp__service-logo newApp__service-logo--disabled">
          <img src={require("../platform/imgs/log-stash.png")} />
          <span className="newApp__service-title">LogStash</span>
        </div>
      </ServicesWrapper >

    );
  }
}
class RepositoryManagement extends React.PureComponent {
  static contextType = RMContext
  render() {
    return (
      <ServicesWrapper label="Repository Management">
        <div className="newApp__service-logo newApp__service-logo--disabled">
          <img src={require("../platform/imgs/artifactory.png")} />
          <span className="newApp__service-title">Artifactory</span>
        </div>

        <div className="newApp__service-logo newApp__service-logo--disabled">
          <img src={require("../platform/imgs/nexus.png")} />
          <span className="newApp__service-title">Nexus</span>
        </div>
      </ServicesWrapper>
    );
  }
}


//functional component w/ propTypes
ServicesWrapper.propTypes = {
  label: PropTypes.string,
  children: PropTypes.string
};

function ServicesWrapper({ label, children }) {
  return (
    <Card style={{ minWidth: "16rem" }}>
      <Card.Body className="text-center">
        <Card.Title>{label}</Card.Title>
        {children}
      </Card.Body>
    </Card>
  );
}


class SASST extends React.PureComponent {
  static contextType = RMContext
  render() {
    const { serviceClick } = this.context;
    const { tools } = this.props;
    return (
      <ServicesWrapper label="Code Security">
        <div
          className={`newApp__service-logo ${tools.includes("SonarQube") ? "newApp__service-logo--alredy-installed" : ""}`}
          onClick={() => {
            !tools.includes("SonarQube") &&
              serviceClick({
                category: "SASST",
                service: "SonarQube",
              })
          }
          }
        >
          <img src={require("../platform/imgs/sonar.png")} />
          <span className="newApp__service-title">SonarQube</span>
        </div>
      </ServicesWrapper>
    );
  }
}

class Monitoring extends React.PureComponent {
  static contextType = RMContext
  render() {
    const { serviceClick } = this.context;
    const { tools } = this.props;
    return (
      <ServicesWrapper label="Monitoring">
        <div
          className={`newApp__service-logo ${tools.includes("Nagios") ? "newApp__service-logo--alredy-installed" : ""}`}
          onClick={() => {
            !tools.includes("Nagios") &&
              serviceClick({
                category: "Monitoring",
                service: "Nagios",
              })
          }
          }
        >
          <img src={require("../platform/imgs/nagios.png")} />
          <span className="newApp__service-title">Nagios</span>
        </div>

        <div className="newApp__service-logo newApp__service-logo--disabled">
          <img src={require("../platform/imgs/zookeeper.png")} />
          <span className="newApp__service-title">ZooKeeper</span>
        </div>
      </ServicesWrapper>
    );
  }
}

export class Confirmation extends React.PureComponent {
  static contextType = RMContext
  render() {
    const { services, checkBoxChange } = this.context;
    const { tools } = this.props;
    let isDisplayed = false;
    if (Object.keys(services).length > 0) {
      isDisplayed = true;
    }
    return (
      <>
        {isDisplayed || tools.length > 0 ?
          <ServicesWrapper label="Confirm Tools Selection">

            <Form.Check type="checkbox" label="GitlabCI" inline className="p-2"
              checked={!!services["GitlabCI"] || tools.includes("GitlabCI")}
              disabled={tools.includes("GitlabCI")}
              onChange={e => checkBoxChange(e, "GitlabCI")} />

            <Form.Check type="checkbox" label="Jenkins Pipeline" inline className="p-2"
              checked={!!services["Jenkins Pipeline"] || tools.includes("Jenkins Pipeline")}
              disabled={tools.includes("Jenkins Pipeline")}
              onChange={e => checkBoxChange(e, "Jenkins Pipeline")} />

            <Form.Check type="checkbox" label="Chef" inline className="p-2" disabled />

            <Form.Check type="checkbox" label="Ansible" inline className="p-2"
              checked={!!services["Ansible"] || tools.includes("Ansible")}
              disabled={tools.includes("Ansible")}
              onChange={e => checkBoxChange(e, "Ansible")} />

            <Form.Check type="checkbox" label="Zookeeper" inline className="p-2" disabled />

            <Form.Check type="checkbox" label="Jenkins" inline className="p-2"
              checked={!!services["Jenkins"] || tools.includes("Jenkins")}
              disabled={tools.includes("Jenkins")}
              onChange={e => checkBoxChange(e, "Jenkins")} />

            <Form.Check type="checkbox" label="Teamcity" inline className="p-2" disabled />

            <Form.Check type="checkbox" label="Nagios" inline className="p-2"
              checked={!!services["Nagios"] || tools.includes("Nagios")}
              disabled={tools.includes("Nagios")}
              onChange={e => checkBoxChange(e, "Nagios")} />

            <Form.Check type="checkbox" label="ElasticSearch" inline className="p-2"
              checked={!!services["ElasticSearch"] || tools.includes("ElasticSearch")}
              disabled={tools.includes("ElasticSearch")}
              onChange={e => checkBoxChange(e, "ElasticSearch")} />

            <Form.Check type="checkbox" label="Logstash" inline className="p-2" disabled />

            <Form.Check type="checkbox" label="Artifactory" inline className="p-2" disabled />

            <Form.Check type="checkbox" label="SonarQube" inline className="p-2"
              checked={!!services["SonarQube"] || tools.includes("SonarQube")}
              disabled={tools.includes("SonarQube")}
              onChange={e => checkBoxChange(e, "SonarQube")} />

            <Form.Check type="checkbox" label="Nexus" inline className="p-2" disabled />

            <Form.Check type="checkbox" label="Puppet" inline className="p-2" disabled />

            <div className="m-2 text-right">
              <Button variant="outline-primary" onClick={this.context.confirm}>
                Confirm
              </Button>
            </div>
          </ServicesWrapper> : (
            <></>
          )
        }
      </>
    );
  }
}

export default ReleaseManagementOtherServices;
