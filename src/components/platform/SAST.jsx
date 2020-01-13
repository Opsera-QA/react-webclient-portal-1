import React from "react"
import { Card } from "react-bootstrap"
import { NewAppContext } from "./context"

class SAST extends React.PureComponent {
  static contextType = NewAppContext
  handleLogoClick = () => {
    const { setState } = this.context
    const { tools } = this.props
    setState({
      open: !tools.includes("SonarQube"),
      category: "SASST",
      service: "SonarQube",
    })
  }
  render() {
    const { tools } = this.props
    return (
      <div>
        <Card fluid className="newApp__card">
          <h3>SASST</h3>
          <div>
            <div
              className={`newApp__service-logo ${tools.includes("SonarQube") ? "newApp__service-logo--alredy-installed" : ""}`}
              onClick={this.handleLogoClick}
            >
              <img src={require("./imgs/sonar.png")} />
              <span className="newApp__service-title">SonarQube</span>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default SAST
