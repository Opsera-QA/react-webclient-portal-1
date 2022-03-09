import React, { PureComponent } from "react";
import { Form, Tooltip, OverlayTrigger, Button, Container } from "react-bootstrap";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ErrorDialog from "../common/status_notifications/error";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; //New AuthContext State 
import { ApiService } from "../../api/apiService";
import IconBase from "components/common/icons/IconBase";

const TOOL_NAME = "ELK-Kibana";

export default class Reports_Old extends PureComponent {
  static contextType = AuthContext;  //Import AuthContext values into Component
    
  state = { tool: null, loading: null, showIframe: false }

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
    const { tool } = this.state;
    tool.toolURL && window.open(tool.toolURL, "_blank");
  }

  handleSubmit = e => {
    const { tool } = this.state;
    e.preventDefault();
    if (!tool || !tool.toolURL) return;
    this.setState({
      showIframe: true,
    });
  }

  getplaceHolderText = () => {
    const { loading, tool } = this.state;
    if (loading === null) return "...";
    if (loading) return "please wait...";
    if (!tool || !tool.toolURL)
      return "kibana tool Url unavailable, please check later..";
    return tool.toolURL;
  }

  render() {
    const { tool, showIframe, error } = this.state;

    return (
      <div> 
        {/* <h4>Administration Tools</h4> */}

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
            <li className="breadcrumb-item">
              <Link to="/admin">Admin</Link>
            </li>
            <li className="breadcrumb-item active">Reporting</li> 
          </ol>
        </nav>     

        <h5>Reporting</h5>    
        {this.state.error ? <ErrorDialog error={error} /> : <>

          <div className="mt-4 mb-4 text-right">
            <Button disabled={this.state.url === ""} onClick={this.onClickButton}>
                click here to view the dashboard
            </Button>
            <br />
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
                  <IconBase icon={faInfoCircle} />
                </OverlayTrigger>
              </Form.Label>
              <Form.Control 
                placeholder={this.getplaceHolderText()}
                name="iframe"
                ref={el => (this.input = el)}
              />
            </Form.Group>
              
            <Button variant="outline-primary" style={{ marginBottom: "30px" }} type="submit"> 
                  Submit
            </Button>
          </Form>
          {showIframe && tool && tool.toolURL && (
            <div>{<iframe src={tool.toolURL} height="600" width="1160" title="toolUrl" />}</div>
          )}
        </>
        }
      </div>
    );
  }
}
