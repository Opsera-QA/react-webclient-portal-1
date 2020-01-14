import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Form } from "react-bootstrap";

import { NewAppContext } from "./context";

class Confirmation extends React.PureComponent {
  static contextType = NewAppContext

  render() {
    const { data, confirm, setState } = this.context;
    const { tools } = this.props;
    let isDisplayed = false;
    if (Object.keys(data).length > 0) {
      isDisplayed = true;
    }
    return (
      <>
        {isDisplayed || tools.length > 0 ?
          <Card>
            <Card.Body>
              <Card.Title>Confirm Tools Selection</Card.Title>
            
              <Card.Text>
                <Form>
                  <Form.Check inline type="checkbox" label="Chef" className="p-2" disabled />

                  <Form.Check inline type="checkbox" label="Puppet" className="p-2" disabled />

                  <Form.Check type="checkbox"
                    inline className="p-2" 
                    disabled={tools.includes("Ansible")}
                    label="Ansible"
                    checked={Boolean(data.Ansible) !== false || tools.includes("Ansible")}
                    onChange={() =>
                      setState(ps => ({ data: { ...ps.data, Ansible: undefined } }))
                    } />

                  <Form.Check inline type="checkbox" label="Zookeeper" className="p-2" disabled />

                  <Form.Check type="checkbox" label="Jenkins"
                    inline className="p-2" 
                    disabled={tools.includes("Jenkins")}
                    checked={Boolean(data.Jenkins) !== false || tools.includes("Jenkins")}
                    onChange={() =>
                      setState(
                        ps => ({ data: { ...ps.data, Jenkins: undefined } }),
                        () => {
                          delete data.Jenkins;
                        },
                      )
                    } />

                  <Form.Check inline type="checkbox" label="Teamcity" className="p-2" disabled />

                  <Form.Check type="checkbox" label="Nagios" className="p-2" 
                    inline
                    disabled={tools.includes("Nagios")}
                    checked={Boolean(data.Nagios) !== false || tools.includes("Nagios")}
                    onChange={() =>
                      setState(ps => ({ data: { ...ps.data, Nagios: undefined } }))
                    } />

                  <Form.Check type="checkbox" label="ElasticSearch" inline className="p-2" 
                    disabled={tools.includes("ElasticSearch")}
                    checked={Boolean(data.ElasticSearch) !== false || tools.includes("ElasticSearch")}
                    onChange={() =>
                      setState(ps => ({
                        data: { ...ps.data, ElasticSearch: undefined },
                      }))
                    } />

                  <Form.Check inline type="checkbox" label="Logstash" className="p-2" disabled />

                  <Form.Check inline type="checkbox" label="Artifactory" className="p-2" disabled />

                  <Form.Check type="checkbox" label="SonarQube"
                    inline className="p-2" 
                    disabled={tools.includes("SonarQube")}
                    checked={Boolean(data.SonarQube) !== false || tools.includes("SonarQube")}
                    onChange={() =>
                      setState(ps => ({
                        data: { ...ps.data, SonarQube: undefined },
                      }))
                    } />

                  <Form.Check inline type="checkbox" label="Nexus" className="p-2" disabled />

                  <div className="m-2 text-right">
                    <Button variant="outline-primary" onClick={confirm}>
                      Confirm
                    </Button>
                  </div>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card> : (
            <></>
          )
        }

      </>
    );
  }
}

Confirmation.propTypes = {
  tools: PropTypes.object
};

export default Confirmation;
