import React, { PureComponent } from 'react'
import { withAuth } from '@okta/okta-react'
import { connect } from "react-redux"
import { Alert, Button, Col, Row, Container } from 'react-bootstrap';
import LoadingDialog from "../common/loading"
import {api2} from "../../api"

export default class Update extends PureComponent {
    state = {
        apps: [],
        fetching: true,
        disabledIds: [],
      }
      async componentDidMount() {
        const {data} = await api2({
          method: "GET",
          endpoint: "/tools/upgradable",
        })
    
        this.setState({
          apps: data.apps,
          fetching: false,
        })
      }
    
      handleButtonClick = async ({applicationId, toolId}) => {
        this.setState(ps => ({
          disabledIds: [...ps.disabledIds, `${applicationId}${toolId}`],
        }))
    
        await api2({
          method: "POST",
          endpoint: "tools/upgrade",
          body: {applicationId, toolId},
        })

        (<Alert variant="secondary">
                Tool Submitted for upgrade, you will be notified completness.
        </Alert>)
      }
    
      loader = () => {
        const {fetching} = this.state
        return fetching ? (
          <Button loading style={{backgroundColor: "transparent"}} />
        ) : null
      }
    
      messages = () => {
        const {fetching, apps} = this.state
        return !fetching && apps.length === 0 ? <p>No Tools To Upgrade</p> : <LoadingDialog/>
      }
    
      toolList = () => {
        const {apps, disabledIds} = this.state
        return (
          <Row>
            {apps.map(app => {
              return app.tools.map((tool, i) => (
                <ToolView
                  handleButtonClick={this.handleButtonClick}
                  disabledIds={disabledIds}
                  app={app}
                  tool={tool}
                  key={i}
                  i={i}
                />
              ))
            })}
          </Row>
        )
      }
    
      render() {
        // const {tools, fetching} = this.state
        return (
          <Container>
            <h2>Upgrades</h2>
            <div className="upgrades__app-list" style={{}}>
              {this.loader()}
              {this.messages()}
              {this.toolList()}
            </div>
          </Container>
        )
      }
    }
    
    function ToolView({
      handleButtonClick = () => {},
      disabledIds = [],
      app: {_id: applicationId, name: appname},
      tool: {_id: toolId, name: toolName, versionNumber},
    }) {
      return (
        <Row>
          <Col>
            <h2 style={{margin: 0}}>{appname}</h2>
            <h3 style={{margin: 0}}>{toolName}</h3>
          </Col>
          <Col>
            <div>version number: {versionNumber || "unknown"}</div>
            {toolName === "Jenkins" && (
              <div style={{fontWeight: "bold", color: "green"}}>
                New version available for upgrade: 2.152
              </div>
            )}
            {toolName === "Artifactory" && (
              <div style={{fontWeight: "bold", color: "green"}}>
                New version available for upgrade: 6.5
              </div>
            )}
          </Col>
          <Col>
            <Button
              primary
              disabled={disabledIds.includes(`${applicationId}${toolId}`)}
              onClick={() => handleButtonClick({applicationId, toolId})}
            >
              Update
            </Button>
          </Col>
        </Row>
      )
    }
    