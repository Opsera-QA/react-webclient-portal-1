import React from "react"
import { Card, Button, Form } from "react-bootstrap"

import { NewAppContext } from "./context"

class Confirmation extends React.PureComponent {
  static contextType = NewAppContext

  componentDidMount() {
    const { setAppIdState } = this.context;
    const { app, tools } = this.props
    if (app._id) {
      setAppIdState(app._id)
    }
  }

  render() {
    const { data, confirm, setState } = this.context
    const { tools } = this.props
    return (
      <Card className="newApp__card">
        <h3>Confirmation</h3>
        <div className="newApp__checkbox-group">
          <div>
            <Form>

              <Form.Group controlId="formCheckboxChef">
                <Form.Check type="checkbox" label="Chef" disabled />
              </Form.Group>

              <Form.Group controlId="formCheckboxPuppet">
                <Form.Check type="checkbox" label="Puppet" disabled />
              </Form.Group>

              <Form.Group controlId="formCheckboxAnsible">
                <Form.Check type="checkbox"
                  disabled={tools.includes("Ansible")}
                  label="Ansible"
                  checked={Boolean(data.Ansible) !== false || tools.includes("Ansible")}
                  onChange={() =>
                    setState(ps => ({ data: { ...ps.data, Ansible: undefined } }))
                  } />
              </Form.Group>

              <Form.Group controlId="formCheckboxZookeeper">
                <Form.Check type="checkbox" label="Zookeeper" disabled />
              </Form.Group>

              <Form.Group controlId="formCheckboxJenkins">
                <Form.Check type="checkbox" label="Jenkins"
                  disabled={tools.includes("Jenkins")}
                  checked={Boolean(data.Jenkins) !== false || tools.includes("Jenkins")}
                  onChange={() =>
                    setState(
                      ps => ({ data: { ...ps.data, Jenkins: undefined } }),
                      () => {
                        delete data.Jenkins
                      },
                    )
                  } />
              </Form.Group>

              <Form.Group controlId="formCheckboxTeamcity">
                <Form.Check type="checkbox" label="Teamcity" disabled />
              </Form.Group>

              <Form.Group controlId="formCheckboxNagios">
                <Form.Check type="checkbox" label="Nagios"
                  disabled={tools.includes("Nagios")}
                  checked={Boolean(data.Nagios) !== false || tools.includes("Nagios")}
                  onChange={() =>
                    setState(ps => ({ data: { ...ps.data, Nagios: undefined } }))
                  } />
              </Form.Group>

              <Form.Group controlId="formCheckboxElasticSearch">
                <Form.Check type="checkbox" label="ElasticSearch"
                  disabled={tools.includes("ElasticSearch")}
                  checked={Boolean(data.ElasticSearch) !== false || tools.includes("ElasticSearch")}
                  onChange={() =>
                    setState(ps => ({
                      data: { ...ps.data, ElasticSearch: undefined },
                    }))
                  } />
              </Form.Group>

              <Form.Group controlId="formCheckboxLogstash">
                <Form.Check type="checkbox" label="Logstash" disabled />
              </Form.Group>

              <Form.Group controlId="formCheckboxArtifactory">
                <Form.Check type="checkbox" label="Artifactory" disabled />
              </Form.Group>

              <Form.Group controlId="formCheckboxSonarQube">
                <Form.Check type="checkbox" label="SonarQube"
                  disabled={tools.includes("SonarQube")}
                  checked={Boolean(data.SonarQube) !== false || tools.includes("SonarQube")}
                  onChange={() =>
                    setState(ps => ({
                      data: { ...ps.data, SonarQube: undefined },
                    }))
                  } />
              </Form.Group>

              <Form.Group controlId="formCheckboxNexus">
                <Form.Check type="checkbox" label="Nexus" disabled />
              </Form.Group>

              <Button primary onClick={confirm}>
                Confirm
            </Button>
            </Form>
          </div>
        </div>
      </Card>
    )
  }
}

export default Confirmation
