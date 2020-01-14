import React from "react"
import { Card, Button, Form } from "react-bootstrap"

import { NewAppContext } from "./context"

class Confirmation extends React.PureComponent {
  static contextType = NewAppContext

  render() {
    const { data, confirm, setState } = this.context
    const { tools } = this.props
    let isDisplayed = false
    if (Object.keys(data).length > 0) {
      isDisplayed = true;
    }
    return (
      <>
        {isDisplayed || tools.length > 0 ?
          <Card className="newApp__card">
            <h3>Confirmation</h3>
            <div className="newApp__checkbox-group">
              <div>
                <Form>

                  <div className="mb-4">

                    <Form.Check inline type="checkbox" label="Chef" disabled />

                    <Form.Check inline type="checkbox" label="Puppet" disabled />

                    <Form.Check type="checkbox"
                      inline
                      disabled={tools.includes("Ansible")}
                      label="Ansible"
                      checked={Boolean(data.Ansible) !== false || tools.includes("Ansible")}
                      onChange={() =>
                        setState(ps => ({ data: { ...ps.data, Ansible: undefined } }))
                      } />

                    <Form.Check inline type="checkbox" label="Zookeeper" disabled />

                  </div>

                  <div className="mb-4">

                    <Form.Check type="checkbox" label="Jenkins"
                      inline
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

                    <Form.Check inline type="checkbox" label="Teamcity" disabled />

                    <Form.Check type="checkbox" label="Nagios"
                      inline
                      disabled={tools.includes("Nagios")}
                      checked={Boolean(data.Nagios) !== false || tools.includes("Nagios")}
                      onChange={() =>
                        setState(ps => ({ data: { ...ps.data, Nagios: undefined } }))
                      } />

                    <Form.Check type="checkbox" label="ElasticSearch"
                      disabled={tools.includes("ElasticSearch")}
                      checked={Boolean(data.ElasticSearch) !== false || tools.includes("ElasticSearch")}
                      onChange={() =>
                        setState(ps => ({
                          data: { ...ps.data, ElasticSearch: undefined },
                        }))
                      } />

                  </div>

                  <div className="mb-4">

                    <Form.Check inline type="checkbox" label="Logstash" disabled />

                    <Form.Check inline type="checkbox" label="Artifactory" disabled />

                    <Form.Check type="checkbox" label="SonarQube"
                      inline
                      disabled={tools.includes("SonarQube")}
                      checked={Boolean(data.SonarQube) !== false || tools.includes("SonarQube")}
                      onChange={() =>
                        setState(ps => ({
                          data: { ...ps.data, SonarQube: undefined },
                        }))
                      } />

                    <Form.Check inline type="checkbox" label="Nexus" disabled />

                  </div>

                  <Button primary onClick={confirm}>
                    Confirm
                  </Button>
                </Form>
              </div>
            </div>
          </Card > : (
            <></>
          )
        }

      </>
    )
  }
}

export default Confirmation
