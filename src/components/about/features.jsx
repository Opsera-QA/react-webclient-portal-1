import React from "react";
import { Link, withRouter } from "react-router-dom";
import { CardGroup, Card, Button } from "react-bootstrap";

class featuresCards extends React.Component {
  gotoLink = (id) => {
    let path = `/${id}`;
    // eslint-disable-next-line react/prop-types
    this.props.history.push(path);
  }

  render() {
    return (
      <div>
        <CardGroup className="mt-4">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Platforms</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Your Choice of Tools!</Card.Subtitle>
              <Card.Text>
                Leverage your existing systems in any way that meets your business needs.  Lifecycle Management and native
                integration with various popular API connectors including Jira, ServiceNow, Github and Slack among many more.
              </Card.Text>
              {/* <Button variant="primary" onClick={this.setPlaceholder}>Register Platform</Button> */}
              <Link to="/platform">Configure Existing Platforms</Link>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Pipeline</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Empower Your Teams</Card.Subtitle>
              <Card.Text>
                Leverage the full benefits of OpsERA by building DevOps Pipeline Workflows in just 10-15 minutes.  
                Support for configuring various pipelines for various workflows: QA, Staging, Production, Security, Compliance, or custom templates.
                {/*  Support for multi-stack,
                multi-language, multi-branch, RBAC, Jenkins pipelines and Hybrid Cloud solutions 
                with support for Container deployments, Kubernetes clusters and/or with Helm. */}
              </Card.Text>
              {/* <Button variant="primary" onClick={this.setPlaceholder}>Build a Pipeline</Button> */}
              <Link to="/pipeline">Manage Your Pipelines</Link>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Analytics</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">End to End Visibility</Card.Subtitle>
              <Card.Text>
                Provides near real time intelligent dashboards and metrics for an organization`s DevOps teams.  Statistics on successful workflows, errors, security reviews, 
                scorecards and much more!
              </Card.Text>
              {/* <Button variant="primary" onClick={this.setPlaceholder}>Get Started</Button> */}
              <Link to="/analytics">Reports and Analytics</Link>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    );
  }
}

export default withRouter(featuresCards);