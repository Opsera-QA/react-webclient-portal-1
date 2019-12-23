import React, { PureComponent } from 'react'
import { Container, Button } from 'react-bootstrap';

export default class HealthCheck extends PureComponent {
    onClickButton = () => {
        window.open("http://13.58.193.36:5601", "_blank")
      }
      render() {
        return (
          <Container>
            <div className="reporting__to-dashboard-container">
              <h2>Healthcheck</h2>
              <Button onClick={this.onClickButton}>
                click here to view the dashboard
              </Button>
            </div>
            <iframe
              src="http://13.58.193.36:5601/app/kibana#/dashboard/71e5cf50-151a-11e9-b82a-d71fd4bf8ab3?embed=true&_g=(refreshInterval%3A(pause%3A!f%2Cvalue%3A900000)%2Ctime%3A(from%3Anow-30m%2Cmode%3Aquick%2Cto%3Anow))"
              height="600"
              width="1155"
            />
          </Container>
        )
     }
}
