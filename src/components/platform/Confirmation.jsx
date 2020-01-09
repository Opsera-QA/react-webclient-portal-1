import React from "react"
import {Card, Button, Form} from "react-bootstrap"

import {NewAppContext} from "./context"

class Confirmation extends React.PureComponent {
  static contextType = NewAppContext

  componentDidMount() {
    const { setAppIdState } = this.context;
    if(this.props.data._id){
      setAppIdState(this.props.data._id)
    }
  }
  
  render() {
    const {data, confirm, setState} = this.context
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
                          label="Ansible"
                          checked={Boolean(data.Ansible) !== false}
                          onChange={() =>
                            setState(ps => ({data: {...ps.data, Ansible: undefined}}))
                          } />
            </Form.Group>

          <Form.Group controlId="formCheckboxZookeeper">
            <Form.Check type="checkbox" label="Zookeeper" disabled />
          </Form.Group>

          <Form.Group controlId="formCheckboxJenkins">
            <Form.Check type="checkbox" label="Jenkins"
                        checked={Boolean(data.Jenkins) !== false}
                        onChange={() =>
                          setState(
                            ps => ({data: {...ps.data, Jenkins: undefined}}),
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
            <Form.Check type="checkbox"  label="Nagios"
                        checked={Boolean(data.Nagios) !== false}
                        onChange={() =>
                          setState(ps => ({data: {...ps.data, Nagios: undefined}}))
                        } />
          </Form.Group>

          <Form.Group controlId="formCheckboxElasticSearch">
            <Form.Check type="checkbox" label="ElasticSearch"
                        checked={Boolean(data.ElasticSearch) !== false}
                        onChange={() =>
                          setState(ps => ({
                            data: {...ps.data, ElasticSearch: undefined},
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
              <Form.Check type="checkbox"  label="SonarQube"
                          checked={Boolean(data.SonarQube) !== false}
                          onChange={() =>
                            setState(ps => ({
                              data: {...ps.data, SonarQube: undefined},
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
