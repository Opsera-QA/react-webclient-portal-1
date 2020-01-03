import React from "react"
import {Card} from "react-bootstrap"
import {NewAppContext} from "./context"

class ContinousIntegration extends React.PureComponent {
  static contextType = NewAppContext
  render() {
    const {setState} = this.context
    return (
      <div>
        <Card className="newApp__card">
          <h3>Continous Integration</h3>
          <div>
            <div
              className="newApp__service-logo"
              onClick={() =>
                setState({
                  open: true,
                  category: "Continous Integration And Deployment",
                  service: "Jenkins",
                })
              }
            >
              <img src={require("./imgs/jenkins.png")} />
              <span className="newApp__service-title">Jenkins</span>
            </div>

            <div
              className="newApp__service-logo newApp__service-logo--disabled"
              onClick={() =>
                setState({
                  // open: true,
                  category: "Continous Integration And Deployment",
                  service: "Team City",
                })
              }
            >
              <img src={require("./imgs/team-city.png")} />
              <span className="newApp__service-title">Team City</span>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default ContinousIntegration
