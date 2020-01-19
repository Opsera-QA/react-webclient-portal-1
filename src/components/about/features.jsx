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
        <Card className="mt-4">
          <Card.Header>Getting Started</Card.Header>
          <Card.Body>
            <Card.Title>OpsERA offers multiple ways to work with your DevOps solution.</Card.Title>
            <Card.Text>
              The OpsERA DevOps Product comes up with the best time to market solutions for all your technology
                      automation and workflow is seamless and optimized throughout your organization.  We deliver solutions
                      to automate build, deploy, security and testing with open source tools for your development team to
                      manage application upgrades effectively and in secured way. We also provide pragmatic solutions for
                      various cloud-based products using open source frameworks and we ensure that enterprise policies are met.
            </Card.Text>
            <Button variant="primary" onClick={() => this.gotoLink("inventory")}>My Inventory</Button>
            <Button variant="outline-primary" className="ml-2" onClick={() => this.gotoLink("platform")}>Platforms</Button>
            <Button variant="outline-primary" className="ml-2" onClick={() => this.gotoLink("pipeline")}>Pipelines</Button>
          </Card.Body>
        </Card>

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
              <Link to="/platform">Register an Application</Link>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Pipeline</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Empower Your Teams</Card.Subtitle>
              <Card.Text>
                Leverage the full benefits of OpsERA by building DevOps pipelines with security and quality gates in just 10-15 minutes. Supports multi-stack,
                multi-language, multi-branch, RBAC, Jenkins pipelines and Hybrid Cloud solutions with support for Container deployments, Kubernetes clusters and/or with Helm.
              </Card.Text>
              {/* <Button variant="primary" onClick={this.setPlaceholder}>Build a Pipeline</Button> */}
              <Link to="/pipeline">Build Your Pipeline</Link>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Analytics</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">End to End Visibility</Card.Subtitle>
              <Card.Text>
                Provides near real time Intelligent dashboards and metrics for all builds including Testing, security and deploy providing
                end to end visibility into your entire DevOps ecosystem.
              </Card.Text>
              {/* <Button variant="primary" onClick={this.setPlaceholder}>Get Started</Button> */}
              <Link to="/reports">Reports and Analytics</Link>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    );
  }
}

export default withRouter(featuresCards);