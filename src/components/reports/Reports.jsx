import React, { PureComponent } from 'react'
import { withAuth } from '@okta/okta-react'
import { connect } from "react-redux"
import { Alert,Form,Tooltip,OverlayTrigger, Button, Col, Row, Container } from 'react-bootstrap';
import LoadingDialog from "../common/loading"
import {api2} from "../../api"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ErrorDialog from "../common/error";

const TOOL_NAME = "ELK-Kibana"

export default class Reports extends PureComponent {
    
  state = {tool: null, loading: null, showIframe: false}

  async componentDidMount() {
    this.setState({loading: true})
    let currentComponent = this;
    api2({
      method: "GET",
      endpoint: "/users/tools",
    }).then(({data: {tools: {tools}}}) => {
      const tool = tools.find(tool => {
        return tool.name === TOOL_NAME
      })

      if (tool) {
        this.setState({
          tool,
          loading: false,
        })
      } else {
        // tool not found
        console.log("something went wrong..")
      }
    })
    .catch(function (error) {
      currentComponent.setState({
        error: true,
        messages: 'Error reported accessing API.'
      });
      console.log(`Error Reported: ${error}`);
    })
    .finally(function () {
      currentComponent.setState({ fetching: false });
    });
  }

  onClickButton = () => {
    const {tool} = this.state
    tool.toolURL && window.open(tool.toolURL, "_blank")
  }

  handleSubmit = e => {
    const {tool} = this.state
    e.preventDefault()
    if (!tool || !tool.toolURL) return
    this.setState({
      showIframe: true,
    })
  }

  getplaceHolderText = () => {
    const {loading, tool} = this.state
    if (loading === null) return "..."
    if (loading) return "please wait..."
    if (!tool || !tool.toolURL)
      return "kibana tool Url unavailable, please check later.."
    return tool.toolURL
  }

    render() {
    const {tool, showIframe, messages} = this.state

        return (
            <Container>  
            {this.state.error ? <ErrorDialog errorMessage={messages} /> : <>
            <div className="reporting__to-dashboard-container">
              <h2>Reporting</h2>
              <Button disabled={this.state.url === ""} onClick={this.onClickButton}>
                click here to view the dashboard
              </Button>
            </div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formGridIframeURL">
                        <Form.Label>Iframe Url 
                        <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                            <Tooltip id={`tooltip-right`}>
                            Copy and Paste your IFrame URL from Kibanaa in the format: http://
                            </Tooltip>
                        }>
                        <FontAwesomeIcon icon={faInfoCircle} fixedWidth />
                        </OverlayTrigger>
                        </Form.Label>
                        <Form.Control 
                            placeholder={this.getplaceHolderText()}
                            name="iframe"
                            ref={el => (this.input = el)}
                        />
                </Form.Group>
              
                <Button primary style={{marginBottom: "30px"}} type="submit"> 
                  Submit
                </Button>
            </Form>
            {showIframe && tool && tool.toolURL && (
              <div>{<iframe src={tool.toolURL} height="600" width="1160" />}</div>
            )}
            </>
            }
          </Container>
        )
    }
}
