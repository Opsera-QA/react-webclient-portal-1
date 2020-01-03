import React from "react"
import {Card} from "react-bootstrap"
import {NewAppContext} from "./context"

class LogManagement extends React.PureComponent {
  static contextType = NewAppContext
  render() {
    const {setState} = this.context
    return (
      <div>
        <Card className="newApp__card">
          <h3>Log Management</h3>
          <div>
            <div
              className="newApp__service-logo"
              onClick={() =>
                setState({
                  open: true,
                  category: "Log Management",
                  service: "ElasticSearch",
                })
              }
            >
              <img src={require("./imgs/elastic-search.png")} />
              <span className="newApp__service-title">ElasticSearch</span>
            </div>

            <div
              className="newApp__service-logo newApp__service-logo--disabled"
              onClick={() =>
                setState({
                  // open: true,
                  category: "Log Management",
                  service: "LogStash",
                })
              }
            >
              <img src={require("./imgs/log-stash.png")} />
              <span className="newApp__service-title">LogStash</span>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default LogManagement
