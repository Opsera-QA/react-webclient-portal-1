import React from "react"
import {Card} from "react-bootstrap"
import {NewAppContext} from "./context"

class RepositoryManagement extends React.PureComponent {
  static contextType = NewAppContext

  render() {
    return (
      <div>
        <Card className="newApp__card">
          <h3>Repository Management</h3>
          <div>
            <div className="newApp__service-logo newApp__service-logo--disabled">
              <img src={require("./imgs/artifactory.png")} />
              <span className="newApp__service-title">ArtiFactory</span>
            </div>

            <div className="newApp__service-logo newApp__service-logo--disabled">
              <img src={require("./imgs/nexus.png")} />
              <span className="newApp__service-title">Nexus</span>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default RepositoryManagement
