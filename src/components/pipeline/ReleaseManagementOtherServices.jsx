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
            <ConfigurationManagement />
            <SASST />
            <ContinousIntegration />
            <LogManagement />
            <RepositoryManagement />
            <Monitoring />
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
    return (
      <ServicesWrapper label="Configuration Management">
        <div
          className="newApp__service-logo"
          onClick={() =>
            serviceClick({
              service: "Ansible",
              category: "Configuration Management",
            })
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
    return (
      <ServicesWrapper label="Continous Integration">
        <div
          className="newApp__service-logo"
          onClick={() =>
            serviceClick({
              service: "Jenkins",
              category: "Continous Integration",
            })
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
    return (
      <ServicesWrapper label="Log Management">
        <div
          className="newApp__service-logo"
          onClick={() =>
            serviceClick({
              category: "Log Management",
              service: "ElasticSearch",
            })
          }
        >
          <img src={require("../platform/imgs/elastic-search.png")} />
          <span className="newApp__service-title">ElasticSearch</span>
        </div>

        <div className="newApp__service-logo newApp__service-logo--disabled">
          <img src={require("../platform/imgs/log-stash.png")} />
          <span className="newApp__service-title">LogStash</span>
        </div>
      </ServicesWrapper>

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
    return (
      <ServicesWrapper label="SASST">
        <div
          className="newApp__service-logo"
          onClick={() =>
            serviceClick({
              category: "SASST",
              service: "SonarQube",
            })
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
    return (
      <ServicesWrapper label="Monitoring">
        <div
          className="newApp__service-logo"
          onClick={() =>
            serviceClick({
              category: "Monitoring",
              service: "Nagios",
            })
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
    return (
      <div className="newApp__card" style={{ width: "100%" }}>
        <h3 style={{ textAlign: "center" }}>
          Confirmation
        </h3>
        <div className="newApp__checkbox-group">
          <div>

            <Form.Group controlId="formCheckboxGitlabCI">
              <Form.Check type="checkbox" label="GitlabCI"
                checked={!!services["GitlabCI"]}
                onChange={e => checkBoxChange(e, "GitlabCI")} />
            </Form.Group>


            <Form.Group controlId="formCheckboxJenkinsPipeline">
              <Form.Check type="checkbox" label="Jenkins Pipeline"
                checked={!!services["Jenkins Pipeline"]}
                onChange={e => checkBoxChange(e, "Jenkins Pipeline")} />
            </Form.Group>

            <Form.Group controlId="formCheckboxChef">
              <Form.Check type="checkbox" label="Chef" disabled />
            </Form.Group>
          </div>
          <div>

            <Form.Group controlId="formCheckboxAnsible">
              <Form.Check type="checkbox" label="Ansible"
                checked={!!services["Ansible"]}
                onChange={e => checkBoxChange(e, "Ansible")} />
            </Form.Group>
            <Form.Group controlId="formCheckboxZookeeper">
              <Form.Check type="checkbox" label="Zookeeper" disabled />
            </Form.Group>

            <Form.Group controlId="formCheckboxJenkins">
              <Form.Check type="checkbox" label="Jenkins"
                checked={!!services["Jenkins"]}
                onChange={e => checkBoxChange(e, "Jenkins")} />
            </Form.Group>
            <Form.Group controlId="formCheckboxTeamcity">
              <Form.Check type="checkbox" label="Teamcity" disabled />
            </Form.Group>

          </div>
          <div>

            <Form.Group controlId="formCheckboxNagios">
              <Form.Check type="checkbox" label="Nagios"
                checked={!!services["Nagios"]}
                onChange={e => checkBoxChange(e, "Nagios")} />
            </Form.Group>

            <Form.Group controlId="formCheckboxElasticSearch">
              <Form.Check type="checkbox" label="ElasticSearch"
                checked={!!services["ElasticSearch"]}
                onChange={e => checkBoxChange(e, "ElasticSearch")} />
            </Form.Group>

            <Form.Group controlId="formCheckboxLogstash">
              <Form.Check type="checkbox" label="Logstash" disabled />
            </Form.Group>
            <Form.Group controlId="formCheckboxArtifactory">
              <Form.Check type="checkbox" label="Artifactory" disabled />
            </Form.Group>
          </div>
          <div>

            <Form.Group controlId="formCheckboxSonarQube">
              <Form.Check type="checkbox" label="SonarQube"
                checked={!!services["SonarQube"]}
                onChange={e => checkBoxChange(e, "SonarQube")} />
            </Form.Group>
            <Form.Group controlId="formCheckboxNexus">
              <Form.Check type="checkbox" label="Nexus" disabled />
            </Form.Group>
            <Form.Group controlId="formCheckboxPuppet">
              <Form.Check type="checkbox" label="Puppet" disabled />
            </Form.Group>
          </div>
        </div>
        <div className="newApp__confirm">
          <Button variant="primary" onClick={this.context.confirm}>
            Confirm
          </Button>
        </div>
      </div>
    );
  }
}

export default ReleaseManagementOtherServices;
