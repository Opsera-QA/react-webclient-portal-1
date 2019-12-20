import React from 'react';
import { withRouter} from 'react-router-dom';
import { CardGroup, Card, Button } from 'react-bootstrap';

class featuresCards extends React.Component {
  gotoLink = (id) => {
    let path = `/${id}`;
    this.props.history.push(path);
  }

  render() {
    return (
      <div>
        <Card className="mt-5">
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
            <Button variant="primary" onClick={() => this.gotoLink('inventory')}>View My Inventory</Button>
          </Card.Body>
        </Card>

        <CardGroup className="mt-5">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Platforms</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Leveraging your existing solutions</Card.Subtitle>
              <Card.Text>
                Enables DevOps teams to deploy their choice of existing tools in minutes. Native
                integration with various API connectors including Jira, ServiceNow, Github and Slack among many more.
                    </Card.Text>
              {/* <Button variant="primary" onClick={this.setPlaceholder}>Register Platform</Button> */}
              <Card.Link href="#">Register a Platform Now</Card.Link>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Pipeline</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Empower Your DevOps Team</Card.Subtitle>
              <Card.Text>
                Leverage the full benefits of OpsERA by building DevOps pipelines with security and quality gates in just 10-15 minutes. Supports multi-stack,
                multi-language and Hybrid Cloud solutions with support for Container deployments, Kubernetes clusters and Kubernetes with Helm.
                  </Card.Text>
              {/* <Button variant="primary" onClick={this.setPlaceholder}>Build a Pipeline</Button> */}
              <Card.Link href="#">Build Your Pipeline</Card.Link>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Analytics</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">End to end visibility</Card.Subtitle>
              <Card.Text>
                Provides near real time Intelligent dashboards and metrics for all builds including Testing, security and deploy providing
                end to end visibility into your entire DevOps ecosystem.
                    </Card.Text>
              {/* <Button variant="primary" onClick={this.setPlaceholder}>Get Started</Button> */}
              <Card.Link href="#">Learn More</Card.Link>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    );
  }
}

export default withRouter(featuresCards);