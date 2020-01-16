import React, { PureComponent } from "react";
import { Form, Tooltip, OverlayTrigger, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ErrorDialog from "../common/error";

import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
import { ApiService } from "../../api/apiService";

const TOOL_NAME = "ELK-Kibana";

export default class Reports extends PureComponent {
  static contextType = AuthContext;  //Import AuthContext values into Component
    
  state = {tool: null, loading: null, showIframe: false}

  async componentDidMount() {
    const { getAccessToken } = this.context;
    const accessToken = await getAccessToken();
    await this.getToolsList(accessToken);
  }

  async getToolsList(accessToken) {
    const apiCall = new ApiService("/users/tools", {}, accessToken);
    let currentComponent = this;
    apiCall.get().then(function (response) {
      const tool = response.tools.find(tool => {    //api not working timeout error hope this works!
        return tool.name === TOOL_NAME;
      });
  
      if (tool) {
        this.setState({
          tool,
          loading: false,
        }); 
      }
    })
      .catch(function (error) {
        currentComponent.setState({
          error: error,
        });
        console.log(`Error Reported: ${error}`);
      })
      .finally(function () {
        currentComponent.setState({ fetching: false });
      });
  }

  onClickButton = () => {
    const {tool} = this.state;
    tool.toolURL && window.open(tool.toolURL, "_blank");
  }

  handleSubmit = e => {
    const {tool} = this.state;
    e.preventDefault();
    if (!tool || !tool.toolURL) return;
    this.setState({
      showIframe: true,
    });
  }

  getplaceHolderText = () => {
    const {loading, tool} = this.state;
    if (loading === null) return "...";
    if (loading) return "please wait...";
    if (!tool || !tool.toolURL)
      return "kibana tool Url unavailable, please check later..";
    return tool.toolURL;
  }

  render() {
    const {tool, showIframe, error} = this.state;

    return (
      <Container>  
        {this.state.error ? <ErrorDialog error={error} /> : <>
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
                    <Tooltip id={"tooltip-right"}>
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
              
            <Button variant="primary" style={{marginBottom: "30px"}} type="submit"> 
                  Submit
            </Button>
          </Form>
          {showIframe && tool && tool.toolURL && (
            <div>{<iframe src={tool.toolURL} height="600" width="1160" />}</div>
          )}
        </>
        }
      </Container>
    );
  }
}
